from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from user.serializers import UserSerializer
from django.contrib.auth.models import User
from user.models import User as api_User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth import authenticate

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
                json['email'] = user.email
                json['username'] = user.username
                return Response(json, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(ObtainAuthToken):#APIView
    """
    data format:
    {
        "email": "",
        "password": ""
    }
    """
    def post(self, request, format='json', *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password, backend='user.backends.EmailOrUsernameModelBackend')
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'email': user.email,
                'username': user.username
            })
        return Response({'error': 'Authentication failed'}, status=401)
    
class UserGetUsername(APIView):
    """
    Get a user's info by their username
    data format (url):
    user/getuserusername/?username=_username_
    """
    def get(self, request):
        username = request.GET.get("username","default_value")
        print(request.data)
        user = User.objects.get(username=username)
        if user is not None:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)