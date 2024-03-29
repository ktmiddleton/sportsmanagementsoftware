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
    def get(self, request):
        teams = IntramuralSport.objects.all()
        serializer = IntramuralSportSerializer(teams, many=True)
        return Response({"IntramuralSports": serializer.data})
   
    """
    data format:
    {
        "name": "Team Awesome",
        "description": "A great team.",
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
    """
    def get(self, request):
        sport = request.GET.get("sport","default_value")
        teams = None
        if sport == "default_value":
            teams = IntramuralSportTeam.objects.all()
        else:
            teams = IntramuralSportTeam.objects.filter(sport=sport)
        serializer = IntramuralSportTeamSerializer(teams, many=True)
        return Response({"IntramuralSportsTeams": serializer.data})
    
    """
    data format:
    {
        "name": "",
        "description": "A great _sport_ team.",
        "sport": "Soccer"
    }
    """
    def post(self, request):
        serializer = IntramuralSportTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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