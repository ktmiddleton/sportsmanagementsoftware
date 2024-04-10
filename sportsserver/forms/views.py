from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group

# Create your views here.

class Forms(APIView):
    
    """
    List all forms
    or forms/?token=_token_
    MUST HAVE ADMIN TO USE
    """
    def get(self, request):
        token = request.GET.get("token","default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if AuthUser.has_perm('user.can_read_forms'):
                forms = Form.objects.all()
                return Response({"Forms": FormSerializer(forms, many=True).data})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        token = request.GET.get("token", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            if AuthUser.has_perm('user.can_read_forms'):
                forms = Form.objects.all()
                return Response({"Forms": FormSerializer(forms, many=True).data})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)