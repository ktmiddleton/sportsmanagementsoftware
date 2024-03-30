from clubsports.models import ClubSportsTeam
from rest_framework import serializers
from user.models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class ClubSportsTeamSerializer(serializers.ModelSerializer):
    
    members = MemberSerializer(many=True, required=False)
    
    class Meta:
        model = ClubSportsTeam
        fields = '__all__'