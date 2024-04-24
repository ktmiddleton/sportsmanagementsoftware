from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from classes.serializers import ClassSerializer
from classes.models import Class
from user.models import User
from rest_framework.authtoken.models import Token
from django.core.paginator import Paginator

# Number of items to return per query
PAGE_SIZE = 6

# Create your views here.

class ClassesList(APIView):

    """
    List all classes
    or classes/?classId=_class id_
    """
    def get(self, request):
        search = request.GET.get("search", "default_value")
        page_number = request.GET.get("page", 1)
        class_id = request.GET.get("classId","default_value")
        if search != "default_value":
            classes = Class.objects.filter(name__icontains=search).order_by("-class_time")
            pages = Paginator(classes, PAGE_SIZE)
            page = pages.get_page(page_number)
            return Response({"classes": ClassSerializer(page, many=True).data,
                            "pages": {"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count}})
        if class_id != "default_value": # Return a single class based on id
            team = Class.objects.get(pk=class_id)
            serializer = ClassSerializer(team)
            return Response(serializer.data)
        else: # Return all classes
            classes = Class.objects.all().order_by("-class_time")
            pages = Paginator(classes, PAGE_SIZE)
            page = pages.get_page(page_number)
            return Response({"classes":  ClassSerializer(page, many=True).data, "pages": {"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count}})
   
    """
    classes/?token=_token_
    data format:
    {
        "name": "",
        "description": "",
        "capacity": #,
        "class_time": "",
    }
    """
    # Requires user permission can_create_class
    def post(self, request):
        token = request.GET.get("token", "default_value")
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
        
    """
    Update a class
    USE 1: classes/?token=_token_&classId=_class id_
    data format:
    {
        "name": "",
        "description": "",
        "capacity": #,
        "class_time": "",
    }
    """
    def patch(self, request):
        token = request.GET.get("token", "default_value")
        class_id = request.GET.get("classId", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            class_ = Class.objects.get(pk=class_id)
            if AuthUser.has_perm('user.can_update_class'):
                if ("members" in request.data):
                    request.data.pop("members") # TODO: Quick fix don't need to pass members or instructors it messes up serialization
                if ("instructors" in request.data):
                    request.data.pop("instructors")
                serializer = ClassSerializer(class_, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Class.DoesNotExist:
            return Response({"error": "Class with specified id not found"}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "User with specified token not found"}, status=status.HTTP_404_NOT_FOUND)
        
    """
    Deletes a class
    data format:
    classes/?classId=_class id_&token=_token_
    """
    def delete(self, request):
        classId = request.GET.get("classId","default_value")
        token = request.GET.get("token","default_value")
        if classId != "default_value" and token != "default_value":
            try:
                user = Token.objects.get(key=token).user
                if user.has_perm("user.can_delete_class"): # TODO: need to check if user is also instructor of this class
                    class_ = Class.objects.get(pk=classId)
                    class_.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            except Token.DoesNotExist:
                return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Class.DoesNotExist:
                return Response({"error": "Class with specified id does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Must specify both classId and token"}, status=status.HTTP_400_BAD_REQUEST)
        
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
    classes/userclasses/?token=_token_
    data format:
    {
        "classId": "",
    }
    """
    def post(self, request):
        token = request.GET.get("token", "default_value")
        try:
            user = Token.objects.get(key=token).user
            if user.has_perm("user.can_join_class"):
                class_id = request.data.get("classId")
                class_ = Class.objects.get(pk=class_id) # added _ since class is a keyword
                if class_.registered_participants < class_.capacity:
                    class_.members.add(user.pk)
                    return Response(status=status.HTTP_200_OK)
                elif class_.waitlist_size < class_.waitlist_capacity:
                    class_.waitlist_members.add(user.pk)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Class and waitlist are full"}, status=status.HTTP_422_UNPROCESSABLE_CONTENT)
            else:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
            return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    """
    Removes a user's registration from a class
    data format:
    classes/userclasses/?classId=_class id_&token=_token_
    """
    def delete(self, request):
        classId = request.GET.get("classId","default_value")
        token = request.GET.get("token","default_value")
        if classId != "default_value" and token != "default_value":
            try:
                user = Token.objects.get(key=token).user
                class_ = Class.objects.get(pk=classId)
                if class_.members.filter(id=user.pk).exists():
                    class_.members.remove(user.pk)
                    return Response(status=status.HTTP_200_OK)
                elif class_.waitlist_members.filter(id=user.pk).exists():
                    class_.waitlist_members.remove(user.pk)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({"error": "User not in members or waitlist"}, status=status.HTTP_404_NOT_FOUND)
            except Token.DoesNotExist:
                return Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except User.DoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
            except Class.DoesNotExist:
                return Response({"error": "Class with specified id does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Must specify both classId and token"}, status=status.HTTP_400_BAD_REQUEST)