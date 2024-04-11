from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from forms.models import Form, FormInfo
from user.models import User
from forms.serializers import FormSerializer, FormInfoSerializer, FormCreateUpdateSerializer

# Create your views here.

class Forms(APIView):
    
    """
    List all forms
    forms/?token=_token_
    List all form info templates
    forms/?token=_token_&info=1
    List forms of a specific user
    forms/?token=_token_&username=_username_
    MUST HAVE ADMIN TO USE ALL FORMS, SINGULAR FORM IS OKAY FOR USER
    """
    def get(self, request):
        token = request.GET.get("token","default_value")
        username = request.GET.get("username", "default_value")
        info = request.GET.get("info", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if username != "default_value" and (AuthUser.has_perm('user.can_read_forms') or AuthUser.username == username):
                userforms = Form.objects.filter(user__username=username)
                return Response({"forms": FormSerializer(userforms, many=True).data})
            elif info == "1" and AuthUser.has_perm('user.can_read_forms'):
                form_info_templates = FormInfo.objects.all()
                return Response({"forms": FormInfoSerializer(form_info_templates, many=True).data})
            elif AuthUser.has_perm('user.can_read_forms'):
                forms = Form.objects.all()
                return Response({"forms": FormSerializer(forms, many=True).data})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    """
    Create a form
    USE 1: forms/?token=_token_&info=1
    Create a form info template that spawns forms for users on some activation trigger
    data format:
    {
        "name": "",
        "body": "",
        "clubsport_join": bool, <-- Adds a form required to be filled upon joining a club sport
        "class_join": bool, <-- Adds a form required to be filled upon joining a class
        "intramural_team_join": bool <-- Adds a form required to be filled upon joining an intramural team
    }
    USE 2: forms/?token=_token_
    Create a form manually that is specific to some user and even other entities with info from the pertaining form info object
    data format:
    {
        "form_info": #,
        "user": #,
        "clubsport": #,
        "class": #,
        "intramural_team": #,
        "deadline": **MUST BE DATETIME** ""
    }
    MUST HAVE ADMIN TO USE
    """
    def post(self, request):
        token = request.GET.get("token", "default_value")
        info = request.GET.get("info", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if AuthUser.has_perm('user.can_create_forms'):
                if info == "1": # Create a form info
                    serializer = FormInfoSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else: # Create a form specific to a user
                    print("help me")
                    serializer = FormCreateUpdateSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    """
    Update a form
    USE: forms/?token=_token_&name=_formname_
    data format:
    {
        "name": "",
        "deadline": **MUST BE DATETIME** ""
    }
    MUST HAVE ADMIN TO USE
    """
    def patch(self, request):
        return Response()
    """
    DELETE a form
    USE: forms/?token=_token_&name=_formname_
    MUST HAVE ADMIN TO USE
    """
    def delete(self, request):
        return Response()