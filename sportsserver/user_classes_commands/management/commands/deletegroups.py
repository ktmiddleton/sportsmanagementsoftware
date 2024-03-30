from django.core.management import BaseCommand, CommandError
from django.contrib.auth.models import Group, Permission
from user.models import User
from django.contrib.contenttypes.models import ContentType

#The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):
    
    # Show this when the user types help
    help = """
        deletes all groups in the database
        syntax: 'python manage.py deletegroups'
    """
        
    # A command must define handle()
    def handle(self, *args, **options):
        try:
            user_type = ContentType.objects.get(app_label="user", model="user")
            groups = Group.objects.all().delete()
            permissions = Permission.objects.filter(content_type=user_type).delete()
        except Exception as e:
            print(e)
            print("Don't know what went wrong")
