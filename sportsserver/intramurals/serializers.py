from intramurals.models import IntramuralSport
from rest_framework import serializers

class IntramuralSportSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntramuralSport
        fields = '__all__'