from django.db import models

# Create your models here.

class IntramuralTeam(models.Model):
    name=models.CharField(max_length=50, null=True)
    description=models.CharField(max_length=1000, null=True)
    registeredParticipants=models.PositiveIntegerField(default=0)