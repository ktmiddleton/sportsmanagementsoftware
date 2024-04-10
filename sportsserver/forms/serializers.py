from classes.models import Class
from rest_framework import serializers
from user.models import User

class FormSerializer(serializers.ModelSerializer):
    
    clubsports = MemberSerializer(many=True, required=False)
    classes = MemberSerializer(many=True, required=False)
    user = MemberSerializer(many=True, required=False)
    intramurals = MemberSerializer(many=True, required=False)

    class Meta:
        model = Class
        fields = '__all__'