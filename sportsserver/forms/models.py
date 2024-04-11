from django.db import models
from user.models import User
from clubsports.models import ClubSportsTeam
from classes.models import Class
from intramurals.models import IntramuralSportTeam, IntramuralSport
from datetime import datetime
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver

"""
More like the 'concept' of a form
Has some info and when created has triggers set to instantiate concrete forms that are related to other entities
"""
class FormInfo(models.Model):
    name=models.CharField(max_length=50)
    body=models.TextField(null=True)

    # TODO: Triggers that define when a new form gets added to a user
    clubsport_join=models.BooleanField(blank=True, null=False, default=False)
    class_join=models.BooleanField(blank=True, null=False, default=False)
    intramural_team_join=models.BooleanField(blank=True, null=False, default=False)

"""
Actual instance of a form that a user can sign and complete
"""
class Form(models.Model):

    form_info=models.ForeignKey(FormInfo, blank=False, null=True, on_delete=models.CASCADE)
    deadline=models.DateTimeField(blank=True, null=False, default=datetime.now())
    user=models.ForeignKey(User, blank=False, null=True, on_delete=models.CASCADE)
    clubsport=models.ForeignKey(ClubSportsTeam, blank=True, null=True, on_delete=models.CASCADE)
    class_obj=models.ForeignKey(Class, blank=True, null=True, on_delete=models.CASCADE)
    intramural_team=models.ForeignKey(IntramuralSportTeam, blank=True, null=True, on_delete=models.CASCADE)
    
# Signal to instantiate forms when user joins a club sports team
@receiver(m2m_changed, sender=ClubSportsTeam.members.through)
def create_clubsport_team_forms(sender, instance, action, pk_set, **kwargs):
    if action in ["post_add"]:#, "post_remove"]:
        clubsport_forms = FormInfo.objects.filter(class_join=True)
        users = User.objects.filter(pk__in=pk_set)
        for form in clubsport_forms:
            for user in users:
                Form.objects.create(
                    form_info=form,
                    user=user,
                    clubsport=instance
                )
    elif action in ["post_remove"]:
        users = User.objects.filter(pk__in=pk_set)
        for user in users:
            Form.objects.filter(clubsport=instance, user=user).delete()    

# Signal to instantiate forms when user joins a class
@receiver(m2m_changed, sender=Class.members.through)
def create_class_team_forms(sender, instance, action, pk_set, **kwargs):
    if action in ["post_add"]:#, "post_remove"]:
        class_forms = FormInfo.objects.filter(class_join=True)
        users = User.objects.filter(pk__in=pk_set)
        for form in class_forms:
            for user in users:
                Form.objects.create(
                    form_info=form,
                    user=user,
                    class_obj=instance
                )
    elif action in ["post_remove"]:
        users = User.objects.filter(pk__in=pk_set)
        for user in users:
            Form.objects.filter(class_obj=instance, user=user).delete()

# Signal to instantiate forms when user joins an intramural team
@receiver(m2m_changed, sender=IntramuralSportTeam.members.through)
def create_intramural_team_forms(sender, instance, action, pk_set, **kwargs):
    if action in ["post_add"]:#, "post_remove"]:
        intramural_forms = FormInfo.objects.filter(intramural_team_join=True)
        users = User.objects.filter(pk__in=pk_set)
        for form in intramural_forms:
            for user in users:
                Form.objects.create(
                    form_info=form,
                    user=user,
                    intramural_team=instance
                )
    elif action in ["post_remove"]:
        users = User.objects.filter(pk__in=pk_set)
        for user in users:
            Form.objects.filter(intramural_team=instance, user=user).delete()