from forms.models import Form
from rest_framework import serializers
from clubsports.serializers import ClubSportsTeamSerializer
from classes.serializers import ClassSerializer
from user.models import User
from intramurals.serializers import IntramuralSportTeamSerializer

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class FormSerializer(serializers.ModelSerializer):
    
    clubsports = ClubSportsTeamSerializer(many=True, required=False)
    classes = ClassSerializer(many=True, required=False)
    user = MemberSerializer(many=True, required=False)
    intramurals = IntramuralSportTeamSerializer(many=True, required=False)

    class Meta:
        model = Form
        fields = '__all__'

