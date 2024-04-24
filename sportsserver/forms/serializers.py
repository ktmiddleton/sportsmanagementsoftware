from forms.models import Form, FormInfo
from rest_framework import serializers
from clubsports.serializers import ClubSportsTeamSerializer
from classes.serializers import ClassSerializer
from user.models import User
from clubsports.models import ClubSportsTeam
from classes.models import Class
from intramurals.models import IntramuralSport, IntramuralSportTeam
from intramurals.serializers import IntramuralSportTeamSerializer, IntramuralSportSerializer

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class FormInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormInfo
        fields = '__all__'

"""
Used for creating and updating individual forms and fields
"""
class FormCreateUpdateSerializer(serializers.ModelSerializer):
    form_info=serializers.PrimaryKeyRelatedField(queryset=FormInfo.objects.all(), required=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    clubsport = serializers.PrimaryKeyRelatedField(queryset=ClubSportsTeam.objects.all(), required=False)
    class_obj = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=False)
    intramural_team = serializers.PrimaryKeyRelatedField(queryset=IntramuralSportTeam.objects.all(), required=False)

    class Meta:
        model = Form
        fields = '__all__'

"""
Used for returning form data through an endpoint
"""
class FormSerializer(serializers.ModelSerializer):
    form_info=FormInfoSerializer()
    user = MemberSerializer(required=True)
    clubsport = ClubSportsTeamSerializer(required=False)
    class_obj = ClassSerializer(required=False)
    intramural_team = IntramuralSportTeamSerializer(required=False)

    class Meta:
        model = Form
        fields = '__all__'
