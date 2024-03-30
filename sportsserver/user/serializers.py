from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from user.models import User
from django.contrib.auth.models import Group, Permission

class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ("id", "codename", "name")

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionsSerializer(many=True)
    
    class Meta:
        model = Group
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=32,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length = 8, write_only = True)
    groups = GroupSerializer(many=True, read_only=True)
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'],)
        default_user_group = Group.objects.get(name='user')
        user.groups.add(default_user_group)
        return user

    class Meta:
        model = User
        fields = "__all__"