from classes.models import Class
from rest_framework import serializers
from user.models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class ClassSerializer(serializers.ModelSerializer):
    
    members = MemberSerializer(many=True, required=False)
    instructors = MemberSerializer(many=True, required=False)
    waitlist_members = MemberSerializer(many=True, required=False)
    
    class Meta:
        model = Class
        fields = '__all__'