from django.db import models
from user.models import User
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver
import datetime
from datetime import datetime as dt

# Create your models here.

class IntramuralSport(models.Model):
    name=models.CharField(max_length=50, null=True, unique=True)
    description=models.CharField(max_length=1000, null=True)
    registered_teams=models.PositiveIntegerField(default=0)
    registration_opens=models.DateTimeField(null=False, default=dt.now())
    registration_deadline=models.DateTimeField(null=False, default=dt.now() + datetime.timedelta(days=7))
    
class IntramuralSportTeam(models.Model):
    REGISTRATION_CHOICES = [
        ("open", "Open"),
        ("invite", "Invite Only"),
        ("closed", "Closed"),
    ]
    
    SPORT_TYPES_CHOICES = [
        ("club", "Club"),
        ("intramural", "Intramural")
    ]
    
    TEAM_TYPES_CHOICES = [
        ("casual", "Casual"),
        ("competitive", "Competitive")
    ]

    name=models.CharField(max_length=50, null=True, unique=True)
    sport_type=models.TextField(choices=SPORT_TYPES_CHOICES, blank=True, default="intramural")
    team_type=models.TextField(choices=TEAM_TYPES_CHOICES, blank=True, default="casual")
    description=models.CharField(max_length=1000, null=True)
    registered_participants=models.PositiveIntegerField(default=0)
    members=models.ManyToManyField(User, blank=True)
    registration=models.TextField(choices=REGISTRATION_CHOICES, default="open")
    sport = models.ForeignKey(IntramuralSport, null=True, on_delete=models.CASCADE)
    
# Signal to update the registered_teams count when a team is saved
@receiver(post_save, sender=IntramuralSportTeam)
def update_team_count_on_save(sender, instance, **kwargs):
    print("I GOT A TEAM YAY")
    sport = instance.sport
    sport.registered_teams = sport.intramuralsportteam_set.count()
    sport.save()

# Signal to update the registered_teams count when a team is deleted
@receiver(post_delete, sender=IntramuralSportTeam)
def update_team_count_on_delete(sender, instance, **kwargs):
    sport = instance.sport
    sport.registered_teams = sport.intramuralsportteam_set.count()
    sport.save()
    
# Signal to update the registeredParticipant count when a user joins or leaves
@receiver(m2m_changed, sender=IntramuralSportTeam.members.through)
def update_participant_count(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove"]:
        instance.registered_participants = instance.members.count()
        instance.save()