from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from clubsports.serializers import ClubSportsTeamSerializer
from clubsports.models import ClubSportsTeam
from user.models import User
from django.contrib.auth.models import Group

# Create your views here.

class ClubSportsTeamsList(APIView):
    
    """
    List all club sports teams
    or clubsports/?teamId=_team id_
    """
    def get(self, request):
        teamId = request.GET.get("teamId","default_value")
        if teamId != "default_value": # Return a single team based on id
            team = ClubSportsTeam.objects.get(pk=teamId)
            serializer = ClubSportsTeamSerializer(team)
            return Response(serializer.data)
        else: # Return all teams
            teams = ClubSportsTeam.objects.all()
            serializer = ClubSportsTeamSerializer(teams, many=True)
            return Response({"ClubSportsTeams": serializer.data})
   
    """
    Create a club sports team
    data format:
    {
        "name": "",
        "description": "",
        "registration": "open",
        "token": ""
    }
    """
    # Requires permisssion can_create_club_team
    def post(self, request):
        token = request.data.get("token")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_create_club_team"):
                serializer = ClubSportsTeamSerializer(data=request.data)
                if serializer.is_valid(): 
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    """
    Deletes a club sports team
    data format:
    clubsports/?teamId=_team id_&token=_token_
    """
    # Requires permission can_delete_club_team
    def delete(self, request):
        teamId = request.GET.get("teamId","default_value")
        token = request.GET.get("token","default_value")
        if teamId != "default_value" and token != "default_value":
            try:
                user = Token.objects.get(key=token).user
                if user.has_perm("user.can_delete_club_team"):
                    team = ClubSportsTeam.objects.get(pk=teamId)
                    team.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            except Token.DoesNotExist:
                return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except ClubSportsTeam.DoesNotExist:
                return Response({"error": "Team with specified id does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Must specify both teamId and token"}, status=status.HTTP_400_BAD_REQUEST)
        

class UserTeamsList(APIView):

    """
    Lists a users teams
    data format (url):
    clubsports/userteams/?username=_username_
    """
    def get(self, request):
        username = request.GET.get("username","default_value")
        print(request.data)
        try:
            user = User.objects.get(username=username)
            teams = ClubSportsTeam.objects.filter(members=user.pk)
            serializer = ClubSportsTeamSerializer(teams, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    """
    Joins a user into a team
    required to pass their user token
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
            team = ClubSportsTeam.objects.get(id=team_id)
            user = Token.objects.get(key=token).user
            if team.registration == "open": # TODO: Make sure this is able to handle if a user has an invite
                team.members.add(user.pk)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Unable to join this team", "registration": team.registration}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except ClubSportsTeam.DoesNotExist:
            return Response({"error": "Club sports team does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
class PromoteCaptain(APIView):
    """
    Promote a user to captain of a club team
    data format:
    {
        "username": "",
        "teamId": #,
        "token": ""
    }
    """
    # Requires permisssion can_promote_captain
    # TODO: DEFO should make this so that permission is either an admin or is a current captain OF THIS TEAM and has permission can_promote_captain
    def post(self, request):
        token = request.data.get("token")
        team_id = request.data.get("teamId")
        username = request.data.get("username")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_promote_captain"): # TODO: Should also check if user is captain of this team
                # Add user to captain group
                promoted_user = User.objects.get(username=username)
                captain_group = Group.objects.get(name="captain")
                promoted_user.groups.add(captain_group)
                print("User:", promoted_user.username, "was added to captain group by", user.username)
                # Add user to team's captain list
                team = ClubSportsTeam.objects.get(id=team_id)
                team.captains.add(promoted_user.pk)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Group.DoesNotExist:
            return Response({"error": "Captain Group does not exist"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except ClubSportsTeam.DoesNotExist:
            return Response({"error": "Club sports team does not exist"}, status=status.HTTP_404_NOT_FOUND)