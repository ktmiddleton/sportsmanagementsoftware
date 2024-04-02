from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from classes.serializers import ClassSerializer
from classes.models import Class
from rest_framework.authtoken.models import Token

# Create your views here.

class ClassesList(APIView):
    def get(self, request):
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response({"Classes": serializer.data})
   
    """
    data format:
    {
        "name": "",
        "description": "",
        "capacity": #,
        "class_time": "",
        "token": ""
    }
    """
    # Requires user permission can_create_class
    def post(self, request):
        token = request.data.get("token")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_create_class"):
                serializer = ClassSerializer(data=request.data)
                if serializer.is_valid(): 
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
class ClassRegister(APIView):
    """
    data format:
    {
        "classId": "",
        "token": ""
    }
    """
    def post(self, request):
        token = request.data.get("token")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_join_class"):
                class_id = request.data.get("classId")
                class_ = Class.objects.get(pk=class_id) # added _ since class is a keyword
                class_.members.add(user.pk)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)