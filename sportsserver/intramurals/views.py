from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from intramurals.serializers import IntramuralTeamSerializer
from intramurals.models import IntramuralTeam

# Create your views here.

class IntramuralTeamList(APIView):
    def get(self, request):
        teams = IntramuralTeam.objects.all()
        serializer = IntramuralTeamSerializer(teams, many=True)
        return Response({"IntramuralTeams": serializer.data})
   
    def post(self, request):
        serializer = IntramuralTeamSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)