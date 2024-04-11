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

class FormCreateUpdateSerializer(serializers.ModelSerializer):
    form_info=serializers.PrimaryKeyRelatedField(queryset=FormInfo.objects.all(), required=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    clubsport = serializers.PrimaryKeyRelatedField(queryset=ClubSportsTeam.objects.all(), required=False)
    class_obj = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=False)
    # intramural_sport_id = serializers.PrimaryKeyRelatedField(queryset=IntramuralSport.objects.all(), required=False)
    intramural_team = serializers.PrimaryKeyRelatedField(queryset=IntramuralSportTeam.objects.all(), required=False)

    class Meta:
        model = Form
        fields = '__all__'

    # def create(self, validated_data):
    #     print(validated_data)
    #     user_id = validated_data.pop('user_id').pk
    #     clubsport_id = validated_data.pop('clubsport_id', None).pk
    #     class_id = validated_data.pop('class_id', None).pk
    #     intramural_team_id = validated_data.pop('intramural_team_id', None).pk
    #     deadline = validated_data.pop('deadline', None)

    #     form_info_data = validated_data.pop('form_info')
    #     form_info, _ = FormInfo.objects.get_or_create(**form_info_data)

    #     return Form.objects.create(
    #         user_id=user_id,
    #         clubsport_id=clubsport_id,
    #         class_obj_id=class_id,
    #         intramural_team_id=intramural_team_id,
    #         form_info=form_info,
    #         deadline=deadline,
    #         # **validated_data
    #     )

class FormSerializer(serializers.ModelSerializer):
    form_info=FormInfoSerializer()
    user = MemberSerializer(required=True)
    clubsport = ClubSportsTeamSerializer(required=False)
    class_obj = ClassSerializer(required=False)
    # intramural_sport = IntramuralSportSerializer(required=False)
    intramural_team = IntramuralSportTeamSerializer(required=False)

    class Meta:
        model = Form
        fields = '__all__'


# # CLUB SPORTS
# class ClubSportFormCreateUpdateSerializer(FormSerializer):
#     clubsport_id = serializers.PrimaryKeyRelatedField(queryset=ClubSportsTeam.objects.all(), required=True)

#     class Meta:
#         model = ClubSportForm
#         fields = '__all__'

# class ClubSportFormSerializer(FormSerializer):
#     clubsport = ClubSportsTeamSerializer(required=False)

#     class Meta:
#         model = ClubSportForm
#         fields = '__all__'


# # CLASSES
# class ClassFormCreateUpdateSerializer(FormSerializer):
#     class_id = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), required=True)

#     class Meta:
#         model = ClassForm
#         fields = '__all__'

# class ClassFormSerializer(FormSerializer):
#     class_ = ClassSerializer(required=False)

#     class Meta:
#         model = ClassForm
#         fields = '__all__'


# # INTRAMURAL SPORTS
# class IntramuralSportFormCreateUpdateSerializer(FormSerializer):
#     intramural_sport_id = serializers.PrimaryKeyRelatedField(queryset=IntramuralSport.objects.all(), required=True)

#     class Meta:
#         model = IntramuralSport
#         fields = '__all__'

# class IntramuralSportFormSerializer(FormSerializer):
#     intramural_sport = IntramuralSportSerializer(required=False)

#     class Meta:
#         model = IntramuralSportForm
#         fields = '__all__'


# # INTRAMURAL TEAMS
# class IntramuralTeamFormCreateUpdateSerializer(FormSerializer):
#     intramural_team_id = serializers.PrimaryKeyRelatedField(queryset=IntramuralSportTeam.objects.all(), required=True)

#     class Meta:
#         model = IntramuralTeamForm
#         fields = '__all__'        

# class IntramuralTeamFormSerializer(FormSerializer):
#     intramural_team = IntramuralSportTeamSerializer(required=False)

#     class Meta:
#         model = IntramuralTeamForm
#         fields = '__all__'