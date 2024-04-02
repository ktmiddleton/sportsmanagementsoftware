from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from classes.serializers import ClassSerializer
from classes.models import Class
from user.models import User
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
                    class_instance = serializer.save()
                    class_instance.instructors.add(user) # Add user who created class to instructors list
                    class_instance.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
class UserClassesList(APIView):
    """
    Lists a users classes
    data format (url):
    classes/userclasses/?username=_username_
    """
    def get(self, request):
        username = request.GET.get("username","default_value")
        print(request.data)
        try:
            user = User.objects.get(username=username)
            classes = Class.objects.filter(members=user.pk)
            serializer = ClassSerializer(classes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
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
                if class_.registered_participants < class_.capacity:
                    class_.members.add(user.pk)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Class is full"}, status=status.HTTP_422_UNPROCESSABLE_CONTENT)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)