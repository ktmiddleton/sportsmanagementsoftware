from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from clubsports.serializers import ClubSportsTeamSerializer
from clubsports.models import ClubSportsTeam
from user.models import User

# Create your views here.

class ClubSportsTeamsList(APIView):
    
    """
    List all club sports teams
    """
    def get(self, request):
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
    }
    """
    def post(self, request):
        serializer = ClubSportsTeamSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class UserJoinTeam(APIView):

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
            team = ClubSportsTeam.objects.get(id=team_id)
            user = Token.objects.get(key=token).user
            if team.registration == "open": # TODO: Make sure this is able to handle if a user has an invite
                team.members.add(user.pk)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND) # TODO: Change to Json response with message
        except ClubSportsTeam.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND) # TODO: Change to Json response with message