from intramurals.models import IntramuralTeam
from rest_framework import serializers

class IntramuralTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntramuralTeam
        fields = '__all__'