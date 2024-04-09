from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from intramurals.serializers import IntramuralSportSerializer, IntramuralSportTeamSerializer
from intramurals.models import IntramuralSport, IntramuralSportTeam
from user.models import User

# Create your views here.

class IntramuralSportList(APIView):
    """
    data format(url):
    /intramurals/
    or /intramurals/?sportId=_sport id_
    """
    def get(self, request):
        sportId = request.GET.get("sportId","default_value")
        try:
            if sportId != "default_value": # Return a single sport based on id
                team = IntramuralSport.objects.get(pk=sportId)
                serializer = IntramuralSportSerializer(team)
                return Response({"IntramuralSports": serializer.data})
            else:
                teams = IntramuralSport.objects.all()
                serializer = IntramuralSportSerializer(teams, many=True)
                return Response({"IntramuralSports": serializer.data})
        except IntramuralSport.DoesNotExist:
            return Response({"error": "Cannot find sport with specified id"}, status=status.HTTP_404_NOT_FOUND)
   
    """
    data format:
    {
        "name": "Soccer",
        "description": "A fun sport.",
        "registration_opens" : DateTime,
        "registration_deadline" : DateTime
    }
    """
    def post(self, request):
        serializer = IntramuralSportSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class IntramuralSportTeamList(APIView):
    """
    intramurals/teams/
    or intramurals/teams/?sport=_sport name_
    or intramurals/teams/?teamId=_team id_
    """
    def get(self, request):
        sport = request.GET.get("sport","default_value")
        teamId = request.GET.get("teamId","default_value")
        teams = None
        if teamId != "default_value": # Return a single team based on id
            team = IntramuralSportTeam.objects.get(pk=teamId)
            serializer = IntramuralSportTeamSerializer(team)
            return Response(serializer.data)
        elif sport != "default_value": # Filter teams based on sport
            casual_teams = IntramuralSportTeam.objects.filter(sport=sport, team_type="casual")
            casual_serializer = IntramuralSportTeamSerializer(casual_teams, many=True)
            competitive_teams = IntramuralSportTeam.objects.filter(sport=sport, team_type="competitive")
            competitive_serializer = IntramuralSportTeamSerializer(competitive_teams, many=True)
            return Response({"IntramuralSportsTeams": {
                            "casual_teams": casual_serializer.data,
                            "competitive_teams": competitive_serializer.data
                        }})
        else: # Return all teams
            teams = IntramuralSportTeam.objects.all()
            serializer = IntramuralSportTeamSerializer(teams, many=True)
            return Response({"IntramuralSportsTeams": serializer.data})
    
    """
    data format:
    {
        "name": "",
        "description": "A great _sport_ team.",
        "sport": #,
        "registration": "open",
        "team_type": "casual",
        "token": ""
    }
    """
    # Requires permisssion can_create_intramural_team
    def post(self, request):
        token = request.data.get("token")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_create_intramural_team"):
                serializer = IntramuralSportTeamSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist: " + token}, status=status.HTTP_404_NOT_FOUND)
    
class UserTeamsList(APIView):
    """
    Lists a users teams
    data format (url):
    intramurals/userteams/?username=_username_
    """
    def get(self, request):
        username = request.GET.get("username","default_value")
        try:
            user = User.objects.get(username=username)
            teams = IntramuralSportTeam.objects.filter(members=user.pk)
            serializer = IntramuralSportTeamSerializer(teams, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    """
    TODO: May want to prevent user from joining multiple teams or add that option when creating an intramural sport
    Joins a user into a team
    data format:
    {
        "token": "",
        "teamId": #
    }
    """
    def post(self, request):
        team_id = request.data.get("teamId")
        token = request.data.get("token")
        try:
            team = IntramuralSportTeam.objects.get(id=team_id)
            user = Token.objects.get(key=token).user
            if team.registration == "open": # TODO: Make sure this is able to handle if a user has an invite
                team.members.add(user.pk)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Unable to join this team", "registration": team.registration}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except IntramuralSportTeam.DoesNotExist:
            return Response({"error": "Intramural sports team does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    """
    Leaves a user from a team
    data format (url):
    intramurals/userteams/?teamId=_team id_&token=_token_
    """
    def delete(self, request):
        teamId = request.GET.get("teamId","default_value")
        token = request.GET.get("token","default_value")
        if teamId != "default_value" and token != "default_value":
            try:
                user = Token.objects.get(key=token).user
                team = IntramuralSportTeam.objects.get(pk=teamId)
                team.members.remove(user)
                return Response(status=status.HTTP_200_OK)
            except Token.DoesNotExist:
                return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except IntramuralSportTeam.DoesNotExist:
                return Response({"error": "Team with specified id does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Must specify both teamId and token"}, status=status.HTTP_400_BAD_REQUEST)