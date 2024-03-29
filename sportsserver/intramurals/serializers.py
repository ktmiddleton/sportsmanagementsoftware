from intramurals.models import IntramuralSport, IntramuralSportTeam
from rest_framework import serializers
from user.models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class IntramuralSportSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntramuralSport
        fields = '__all__'
        
class IntramuralSportTeamSerializer(serializers.ModelSerializer):
    
    members = MemberSerializer(many=True, required=False)
    
    class Meta:
        model = IntramuralSportTeam
        fields = '__all__'