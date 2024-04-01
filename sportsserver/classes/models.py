from django.db import models
from datetime import datetime

# Create your models here.

class Class(models.Model):
    name=models.CharField(max_length=50, default="Class Name")
    description=models.CharField(max_length=1000, blank=True, default="")
    capacity=models.PositiveIntegerField(blank=True, default=10)
    registered_participants=models.PositiveIntegerField(blank=True, default=0)
    class_time=models.DateTimeField(blank=True, default=datetime.now())