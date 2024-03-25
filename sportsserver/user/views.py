from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from user.serializers import UserSerializer
from django.contrib.auth.models import User
from user.models import User as api_User

# Create your views here.

class UserRegister(APIView):
    #Creates the user.
    """
    data format:
        {
            "email": "",
            "username": "",
            "password": ""
        }
    """
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)