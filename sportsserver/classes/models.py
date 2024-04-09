from django.db import models
from user.models import User
from datetime import datetime
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver

# Create your models here.

class Class(models.Model):
    name=models.CharField(max_length=50, default="Class Name")
    description=models.CharField(max_length=1000, blank=True, default="")
    capacity=models.PositiveIntegerField(blank=True, default=10)
    registered_participants=models.PositiveIntegerField(blank=True, default=0)
    class_time=models.DateTimeField(blank=True, default=datetime.now())
    members=models.ManyToManyField(User, blank=True, related_name="class_member")
    instructors=models.ManyToManyField(User, blank=True, related_name="class_instructor")

# Signal to update the registered_participants count when a user joins or leaves
@receiver(m2m_changed, sender=Class.members.through)
def update_participant_count(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove"]:
        instance.registered_participants = instance.members.count()
        instance.save()