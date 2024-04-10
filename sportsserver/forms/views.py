from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from forms.models import Form
from user.models import User
from forms.serializers import FormSerializer

# Create your views here.

class Forms(APIView):
    
    """
    List all forms
    or forms/?token=_token_&username=_username_
    MUST HAVE ADMIN TO USE ALL FORMS, SINGULAR FORM IS OKAY FOR USER
    """
    def get(self, request):
        token = request.GET.get("token","default_value")
        username = request.GET.get("username", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if username != "default_value" and (AuthUser.has_perm('user.can_read_forms') or AuthUser.username == username):
                userforms = Form.objects.filter(user__username=username)
                return Response({"Forms": FormSerializer(userforms, many=True).data})
            if AuthUser.has_perm('user.can_read_forms'):
                forms = Form.objects.all()
                return Response({"Forms": FormSerializer(forms, many=True).data})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    """
    Create a form
    USE: forms/?token=_token_
    data format:
    {
        "name": "",
        "deadline": **MUST BE DATETIME** ""
    }
    MUST HAVE ADMIN TO USE
    """
    def post(self, request):
        token = request.GET.get("token", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if AuthUser.has_perm('user.can_create_forms'):
                serializer = FormSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(status=status.HTTP_400_BAD_REQUEST)
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