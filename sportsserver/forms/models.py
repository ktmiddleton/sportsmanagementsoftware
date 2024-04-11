from django.db import models
from user.models import User
from clubsports.models import ClubSportsTeam
from classes.models import Class
from intramurals.models import IntramuralSportTeam, IntramuralSport
from datetime import datetime

class FormInfo(models.Model):
    name=models.CharField(max_length=50)
    body=models.TextField(null=True)

    # Triggers that define when a new form gets added to a user
    clubsport_join=models.BooleanField(blank=True, null=False, default=False)
    class_join=models.BooleanField(blank=True, null=False, default=False)
    # intramural_team_join=models.BooleanField(blank=True, default=False)
    intramural_team_join=models.BooleanField(blank=True, null=False, default=False)

# Create your models here. 
class Form(models.Model):

    form_info=models.ForeignKey(FormInfo, blank=False, null=True, on_delete=models.CASCADE)
    deadline=models.DateTimeField(blank=True, null=False, default=datetime.now())
    user=models.ForeignKey(User, blank=False, null=True, on_delete=models.CASCADE)
    clubsport=models.ForeignKey(ClubSportsTeam, blank=True, null=True, on_delete=models.CASCADE)
    class_obj=models.ForeignKey(Class, blank=True, null=True, on_delete=models.CASCADE)
    # intramural_sport=models.ForeignKey(IntramuralSport, blank=True, null=True, on_delete=models.CASCADE)
    intramural_team=models.ForeignKey(IntramuralSportTeam, blank=True, null=True, on_delete=models.CASCADE)

# class ClubSportForm(Form):
#     clubsport=models.ForeignKey(ClubSportsTeam, blank=True)

# class ClassForm(Form):
#     class_=models.ForeignKey(Class, blank=True)

# class IntramuralSportForm(Form):
#     intramural_sport=models.ForeignKey(IntramuralSport, blank=True)

# class IntramuralTeamForm(Form):
#     intramural_team=models.ForeignKey(IntramuralSportTeam, blank=True)
