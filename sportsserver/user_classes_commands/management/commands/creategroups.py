from django.core.management import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

#The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):
    # Show this when the user types help
    help = """
    Create the user groups and permissions for those groups
    IMPORTANT: WHEN ADDING PERMISSIONS, A PERMISSION MUST FOLLOW THE SYNTAX "codename: can_[action]_[model], name: Can [action] [model]"
    """

    # A command must define handle()
    def handle(self, *args, **options):
        
        try:
                user_type = ContentType.objects.get(app_label="user", model="user")
                
                ### Permissions
                create_team = Permission.objects.create(
                        codename='can_create_team',
                        name='Can create team',
                        content_type=user_type)
                join_team = Permission.objects.create(
                        codename='can_join_team',
                        name='Can join team',
                        content_type=user_type)
                request_team = Permission.objects.create( # Request superseeds automatically being allowed to join a team
                        codename='can_request_team',
                        name='Can request team',
                        content_type=user_type)
                create_league = Permission.objects.create(
                        codename='can_create_league',
                        name='Can create league',
                        content_type=user_type)
                create_class = Permission.objects.create(
                        codename='can_create_class',
                        name='Can create class',
                        content_type=user_type)
                join_class = Permission.objects.create(
                        codename='can_join_class',
                        name='Can join class',
                        content_type=user_type)
                request_class = Permission.objects.create( # Request superseeds automatically being allowed to join a class
                        codename='can_request_class',
                        name='Can request class',
                        content_type=user_type)
                create_game = Permission.objects.create(
                        codename='can_create_game',
                        name='Can create game',
                        content_type=user_type)
                administer_game = Permission.objects.create(
                        codename='can_administer_game',
                        name='Can administer game',
                        content_type=user_type)
                ### End Permissions
                # TODO: Other permissions likely needed: can_promote_captain, can_promote_referee, can_promote_instructor
                # can_modify_league, can_modify_..., can_view_..., etc.
                
                user, created_user = Group.objects.get_or_create(name='user')
                # Add base user permissions to user group here
                user.permissions.add(join_team, join_class)
                
                admin, created_admin = Group.objects.get_or_create(name='admin')
                # Add permissions to admin group here
                admin.permissions.add(create_team, join_team, create_league, create_class, join_class, create_game, administer_game)
                
                captain, created_captain = Group.objects.get_or_create(name='captain')
                # Add permissions to captain group here
                captain.permissions.add(create_team)
                
                guest, created_guest = Group.objects.get_or_create(name='guest')
                # Add permissions to guest group here
                guest.permissions.add(request_team, request_class)
                
                referee, created_referee = Group.objects.get_or_create(name='referee')
                # Add permissions to referee group here
                referee.permissions.add(administer_game)
                
                instructor, created_instructor = Group.objects.get_or_create(name='instructor')
                # Add permissions to instructor group here
                instructor.permissions.add(create_class)
        except:
                print("Groups and permissions are likely already created in your database :)")

