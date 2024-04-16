from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from forms.models import Form, FormInfo
from user.models import User
from forms.serializers import FormSerializer, FormInfoSerializer, FormCreateUpdateSerializer
from django.core.paginator import Paginator

# Create your views here.

# Number of items to return per query
PAGE_SIZE = 6

class Forms(APIView):
    
    """
    List all forms
    forms/?token=_token_

    List all form info templates
    forms/?token=_token_&info=1

    List forms of a specific user
    forms/?token=_token_&username=_username_

    Search the available info forms by name
    forms/?token=_token_&info=1&search=_search name_

    NOTE: Can add the &page=_page number_ parameter to any request to retrieve subsequent pages

    MUST HAVE ADMIN TO USE ALL FORMS, SINGULAR FORM IS OKAY FOR USER
    """
    def get(self, request):
        token = request.GET.get("token","default_value")
        username = request.GET.get("username", "default_value")
        info = request.GET.get("info", "default_value")
        search = request.GET.get("search", "default_value")
        page_number = request.GET.get("page", 1)
        try:
            AuthUser = Token.objects.get(key=token).user
            if username != "default_value" and (AuthUser.has_perm('user.can_read_forms') or AuthUser.username == username): # Get a users forms
                userforms = Form.objects.filter(user__username=username)
                return Response({"forms": FormSerializer(userforms, many=True).data})
            
            elif info == "1" and  AuthUser.has_perm('user.can_read_forms'): # Get Info form templates
                if search != "default_value": # Search for objects by icontains
                    form_info_templates = FormInfo.objects.filter(name__icontains=search).order_by("id")
                    pages = Paginator(form_info_templates, PAGE_SIZE)
                    page = pages.get_page(page_number)
                    return Response({"forms": FormInfoSerializer(page, many=True).data,
                                     "pages": {"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count}})
                else: # All form info objects
                    form_info_templates = FormInfo.objects.all().order_by("id")
                    pages = Paginator(form_info_templates, PAGE_SIZE)
                    page = pages.get_page(page_number)
                    print(page_number)
                    print({"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count})
                    return Response({"forms": FormInfoSerializer(page, many=True).data,
                                     "pages": {"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count}})
                
            elif AuthUser.has_perm('user.can_read_forms'): # Get all forms belonging to all users
                forms = Form.objects.all().order_by("id")
                pages = Paginator(forms, PAGE_SIZE)
                page = pages.get_page(page_number)
                return Response({"forms": FormSerializer(page, many=True).data,
                                "pages": {"start_index": page.start_index(), "end_index": page.end_index(), "count": page.paginator.count}})
            
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Token.DoesNotExist:
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
                    # TODO: Here really gotta make sure the rich text body doesn't pose any security threat ._.
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
        except Token.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    """
    Update a form info template
    USE 1: forms/?token=_token_&formId=_form id_&info=1
    data format:
    {
        "name": "",
        "body": "",
        "clubsport_join": bool,
        "class_join": bool,
        "intramural_team_join": bool
    }
    MUST HAVE ADMIN TO USE
    """
    def patch(self, request):
        token = request.GET.get("token", "default_value")
        form_id = request.GET.get("formId", "default_value")
        info = request.GET.get("info", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            form = FormInfo.objects.get(pk=form_id)
            if AuthUser.has_perm('user.can_update_forms'):
                if info == "1": # Update a form info
                    # TODO: Here really gotta make sure the rich text body doesn't pose any security threat ._.
                    serializer = FormInfoSerializer(form, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # else: # Create a form specific to a user
                #     serializer = FormCreateUpdateSerializer(data=request.data)
                #     if serializer.is_valid():
                #         serializer.save()
                #         return Response(serializer.data, status=status.HTTP_201_CREATED)
                #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except FormInfo.DoesNotExist:
            return Response({"error": "Forminfo with specified id not found"}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "User with specified token not found"}, status=status.HTTP_404_NOT_FOUND)
    """
    DELETE a form info template
    USE 1: forms/?token=_token_&formId=_form id_&info=1
    MUST HAVE ADMIN TO USE
    """
    def delete(self, request):
        token = request.GET.get("token", "default_value")
        form_id = request.GET.get("formId", "default_value")
        info = request.GET.get("info", "default_value")
        try:
            AuthUser = Token.objects.get(key=token).user
            form = FormInfo.objects.get(pk=form_id)
            if AuthUser.has_perm('user.can_delete_forms'):
                if info == "1": # Update a form info
                    form.delete()
                    return Response(status=status.HTTP_200_OK)
                    # TODO: Here gotta add the ability to delete a particular users form
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except FormInfo.DoesNotExist:
            return Response({"error": "Forminfo with specified id not found"}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "User with specified token not found"}, status=status.HTTP_404_NOT_FOUND)
    
class FormComplete(APIView):

    """
    Complete a form
    forms/complete/?token=_token_&formId=_form id_
    Create a form info template that spawns forms for users on some activation trigger
    data format:
    {
        "signature": "",
        "confirm": true,
    }
    """
    def post(self, request):
        token = request.GET.get("token", "default_value")
        form_id = request.GET.get("formId", "default_value")
        try:
            user = Token.objects.get(key=token).user
            form = Form.objects.get(pk=form_id)
            print(user == form.user)
            if user == form.user:
                signature = request.data.get("signature")
                confirm = request.data.get("confirm")
                if signature != "" and confirm:
                    form.signature = signature
                    form.completed = True
                    form.save()
                    return Response(FormSerializer(form).data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(status=status.HTTP_403_FORBIDDEN)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Form.DoesNotExist:
            return Response({"error": "Form with specified id does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "User with specified token does not exist"}, status=status.HTTP_404_NOT_FOUND)