from intramurals.models import IntramuralSport, IntramuralSportTeam
from rest_framework import serializers
from user.models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')
        
class IntramuralSportTeamSerializer(serializers.ModelSerializer):
    
    members = MemberSerializer(many=True, required=False)
    
    class Meta:
        model = IntramuralSportTeam
        fields = '__all__'
        
class ShortIntramuralSportTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntramuralSportTeam
        fields = '__all__'
        
class IntramuralSportSerializer(serializers.ModelSerializer):
    
    casual_teams=serializers.SerializerMethodField('get_sport_casual_teams')
    
    class Meta:
        model = IntramuralSport
        fields = '__all__'
        
    def get_sport_casual_teams(self, obj):
        teams = IntramuralSportTeam.objects.filter(sport=obj.pk)
        serializer = ShortIntramuralSportTeamSerializer(teams, many=True)
        return serializer.data