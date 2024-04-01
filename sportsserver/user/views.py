from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from user.serializers import UserSerializer
# from django.contrib.auth.models import User
from user.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth import authenticate
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.contrib.auth.models import Group

# Create your views here.

class UserRegister(APIView):
    #Creates the user.
    """
    data format:
        {
            "email": "",
            "username": "",
            "first_name": "",
            "last_name": "",
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

        try:
            user = authenticate(request, username=email, password=password, backend='user.backends.EmailOrUsernameModelBackend')
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'email': user.email,
                'username': user.username
            })
        except User.DoesNotExist:
            return Response({'error': 'Authentication failed'}, status=401)
    
class UserGet(APIView):
    """
    Get a user's info by their username
    data format (url):
    user/getuser/?username=_username_
    or user/getuser/?token=_token_
    """
    def get(self, request):
        username = request.GET.get("username","default_value")
        token = request.GET.get("token","default_value")
        user = None
        try:
            if token != "default_value":
                user = Token.objects.get(key=token).user
            elif username != "default_value":
                user = User.objects.get(username=username)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class AllUsers(APIView):
    """
    Get ALL user's information.
    data format (url):
    user/allusers/?token=_token_
    MUST BE ADMIN TO USE.
    """

    def get(self, request):
        token = request.GET.get("token", "default_value")
        user= None
        try: 
            if token != "default_value":
                user = Token.objects.get(key=token).user
            if user.has_perm('can_create_users') and user.has_perm('can_view_users') and user.has_perm('can_update_users') and user.has_perm('can_delete_users'):
                users = User.objects.all()
                return {"userList": UserSerializer(users, many=True)}
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
# class UserGetGroups(APIView):
#     """
#     data format(url):
#     user/getusergroups/?token=_token_
#     """
#     def get(self, request):
#         token_str = request.GET.get("token","default_value")
#         try:
#             token = Token.objects.get(key=token_str)
#             user = token.user
            
#             # user_groups = user.groups.all()
#             user_groups = Group.objects.filter(user=user)
#             # for group in all_groups:
#             #     for user_group in user_groups:
#             #         if user_group.name == group.name:
#             print(user_groups)
#         # """
#         # {
#         #     "admin": true,
#         #     "referee": false,
#         #     "guest": false,
#         # }
#         # """
#             return Response({}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
#         except Token.DoesNotExist:
#             return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)