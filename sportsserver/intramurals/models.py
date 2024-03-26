from django.db import models

# Create your models here.

class IntramuralSport(models.Model):
    name=models.CharField(max_length=50, null=True)
    description=models.CharField(max_length=1000, null=True)
    registeredTeams=models.PositiveIntegerField(default=0)
    registrationDeadline=models.DateTimeField(null=True)