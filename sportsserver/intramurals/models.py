from django.db import models
from user.models import User
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver

# Create your models here.

class IntramuralSport(models.Model):
    name=models.CharField(max_length=50, null=True, unique=True)
    description=models.CharField(max_length=1000, null=True)
    registeredTeams=models.PositiveIntegerField(default=0)
    registrationDeadline=models.DateTimeField(null=True)
    
class IntramuralSportTeam(models.Model):
    REGISTRATION_CHOICES = [
        ("open", "Open"),
        ("invite", "Invite Only"),
        ("closed", "Closed"),
    ]

    name=models.CharField(max_length=50, null=True, unique=True)
    description=models.CharField(max_length=1000, null=True)
    registeredParticipants=models.PositiveIntegerField(default=0)
    members=models.ManyToManyField(User, blank=True)
    registration=models.TextField(choices=REGISTRATION_CHOICES, default="open")
    sport = models.ForeignKey(IntramuralSport, to_field="name", db_column="sport_name", on_delete=models.CASCADE)
    
# Signal to update the registeredTeams count when a team is saved
@receiver(post_save, sender=IntramuralSportTeam)
def update_team_count_on_save(sender, instance, **kwargs):
    sport = instance.sport
    sport.registeredTeams = sport.intramuralsportteam_set.count()
    sport.save()

# Signal to update the registeredTeams count when a team is deleted
@receiver(post_delete, sender=IntramuralSportTeam)
def update_team_count_on_delete(sender, instance, **kwargs):
    sport = instance.sport
    sport.registeredTeams = sport.intramuralsportteam_set.count()
    sport.save()
    
# Signal to update the registeredParticipant count when a user joins or leaves
@receiver(m2m_changed, sender=IntramuralSportTeam.members.through)
def update_participant_count(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove"]:
        instance.registeredParticipants = instance.members.count()
        instance.save()