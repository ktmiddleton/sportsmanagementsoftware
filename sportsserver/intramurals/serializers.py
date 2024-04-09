from intramurals.models import IntramuralSport, IntramuralSportTeam
from rest_framework import serializers
from user.models import User
from django.db.models import Sum

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
    competitive_teams=serializers.SerializerMethodField('get_sport_competitive_teams')
    total_participants=serializers.SerializerMethodField('get_total_participants')
    
    class Meta:
        model = IntramuralSport
        fields = '__all__'
        
    def get_sport_casual_teams(self, obj):
        teams = IntramuralSportTeam.objects.filter(sport=obj.pk, team_type="casual")
        serializer = ShortIntramuralSportTeamSerializer(teams, many=True)
        return serializer.data
    
    def get_sport_competitive_teams(self, obj):
        teams = IntramuralSportTeam.objects.filter(sport=obj.pk, team_type="competitive")
        serializer = ShortIntramuralSportTeamSerializer(teams, many=True)
        return serializer.data
    
    def get_total_participants(self, obj):
        # Returns a dictionary summing all registered participants for casual and competitive teams
        teams = IntramuralSportTeam.objects.filter(sport=obj.pk).aggregate(Sum("registered_participants"))["registered_participants__sum"]
        if teams is None:
            teams = 0
        print(teams)
        return teams
        