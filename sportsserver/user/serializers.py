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
    first_name = serializers.CharField(max_length=32)
    last_name = serializers.CharField(max_length=32)
    password = serializers.CharField(min_length = 8, write_only = True)
    groups = GroupSerializer(many=True, read_only=True)
    
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'],
                                    email=validated_data['email'],
                                    first_name=validated_data['first_name'],
                                    last_name=validated_data['last_name'],
                                    )
        user.set_password(validated_data['password'])
        user.save()
        default_user_group = Group.objects.get(name='user')
        user.groups.add(default_user_group)
        return user

    class Meta:
        model = User
        fields = "__all__"