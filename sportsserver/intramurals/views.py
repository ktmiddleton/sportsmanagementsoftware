from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from intramurals.serializers import IntramuralSportSerializer
from intramurals.models import IntramuralSport

# Create your views here.

class IntramuralSportList(APIView):
    def get(self, request):
        teams = IntramuralSport.objects.all()
        serializer = IntramuralSportSerializer(teams, many=True)
        return Response({"IntramuralSports": serializer.data})
   
    def post(self, request):
        serializer = IntramuralSportSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)