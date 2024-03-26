from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from clubsports.serializers import ClubSportsTeamSerializer
from clubsports.models import ClubSportsTeam

# Create your views here.

class ClubSportsTeamsList(APIView):
    def get(self, request):
        teams = ClubSportsTeam.objects.all()
        serializer = ClubSportsTeamSerializer(teams, many=True)
        return Response({"ClubSportsTeams": serializer.data})
   
    def post(self, request):
        serializer = ClubSportsTeamSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)