from django.core.management import BaseCommand, CommandError
from django.contrib.auth.models import Group
from user.models import User

#The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):
    
    # Show this when the user types help
    help = """
        Makes a user an admin based on a given username
        syntax: 'python manage.py makeadmin [username]'
    """
    
    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('username', type=str, help='The username to process')
    
    # A command must define handle()
    def handle(self, *args, **options):
        username = options['username']
        try:
            admin_group = Group.objects.get(name='admin')
            user = User.objects.get(username=username)
            user.groups.add(admin_group)
            print("User:", user.username, "was added to admin group")
        except User.DoesNotExist:
            raise CommandError('User "%s" does not exist' % username)

