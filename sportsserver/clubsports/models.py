from django.db import models
from user.models import User
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver

# Create your models here.

class ClubSportsTeam(models.Model):
    REGISTRATION_CHOICES = [
        ("open", "Open"),
        ("invite", "Invite Only"),
        ("closed", "Closed"),
    ]
    
    SPORT_TYPES_CHOICES = [
        ("club", "Club"),
        ("intramural", "Intramural")
    ]

    name=models.CharField(max_length=50, null=True, unique=True)
    sport_type=models.TextField(choices=SPORT_TYPES_CHOICES, default="club")
    description=models.CharField(max_length=1000, null=True)
    registered_participants=models.PositiveIntegerField(default=0)
    members=models.ManyToManyField(User, blank=True, related_name="club_team_member")
    captains=models.ManyToManyField(User, blank=True, related_name="club_team_captain")
    registration=models.TextField(choices=REGISTRATION_CHOICES, default="open")
    
# Signal to update the registered_participants count when a user joins or leaves
@receiver(m2m_changed, sender=ClubSportsTeam.members.through)
def update_participant_count(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove"]:
        instance.registered_participants = instance.members.count()
        instance.save()