from django.db import models
from user.models import User

# Create your models here.

class ClubSportsTeam(models.Model):
    REGISTRATION_CHOICES = [
        ("open", "Open"),
        ("invite", "Invite Only"),
        ("closed", "Closed"),
    ]

    name=models.CharField(max_length=50, null=True)
    description=models.CharField(max_length=1000, null=True)
    registeredParticipants=models.PositiveIntegerField(default=0)
    members=models.ManyToManyField(User, null=True)
    registration=models.TextField(choices=REGISTRATION_CHOICES, default="open")