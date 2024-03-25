from django.db import models
from user.models import User

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    creator = models.OneToOneField(User, primary_key=True)
    
    class Meta:
        db_table = "events"