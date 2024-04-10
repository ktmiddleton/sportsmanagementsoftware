from django.db import models
from user.models import User
from clubsports.models import ClubSportsTeam
from classes.models import Class
from intramurals.models import Intramural

# Create your models here.

class Form(models.Model):
    name=models.CharField(max_length=50, null=True, unique=True)
    user=models.ManyToManyField(User, blank=True, related_name="form_user")
    clubsports=models.ManyToManyField(ClubSportsTeam, blank=True, related_name="form_clubsports")
    classes=models.ManyToManyField(Class, blank=True, related_name="form_classes")
    intramurals=models.ManyToManyField(IntramuralSportTeam, blank=True, related_name"form_intramurals")
