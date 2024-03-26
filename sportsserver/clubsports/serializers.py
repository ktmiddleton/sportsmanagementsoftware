from clubsports.models import ClubSportsTeam
from rest_framework import serializers

class ClubSportsTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubSportsTeam
        fields = '__all__'