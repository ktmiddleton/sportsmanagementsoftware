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
                ### Users
                create_users = Permission.objects.create(
                        codename='can_create_users',
                        name='Can create users',
                        content_type=user_type)
                view_users = Permission.objects.create(
                        codename='can_view_users',
                        name='Can view users',
                        content_type=user_type)
                update_users = Permission.objects.create(
                        codename='can_update_users',
                        name='Can update users',
                        content_type=user_type)
                delete_users = Permission.objects.create(
                        codename='can_delete_users',
                        name='Can delete users',
                        content_type=user_type)
                ### Promotion/Making other roles
                promote_admin = Permission.objects.create(
                        codename='can_promote_admin',
                        name='Can promote_admin',
                        content_type=user_type)
                promote_captain = Permission.objects.create(
                        codename='can_promote_captain',
                        name='Can promote_captain',
                        content_type=user_type)
                promote_referee = Permission.objects.create(
                        codename='can_promote_referee',
                        name='Can promote_referee',
                        content_type=user_type)
                promote_instructor = Permission.objects.create(
                        codename='can_promote_instructor',
                        name='Can promote_instructor',
                        content_type=user_type)
                ### Club Teams
                create_club_team = Permission.objects.create(
                        codename='can_create_club_team',
                        name='Can create club team',
                        content_type=user_type)
                view_club_team = Permission.objects.create(
                        codename='can_view_club_team',
                        name='Can view club team',
                        content_type=user_type)
                update_club_team = Permission.objects.create(
                        codename='can_update_club_team',
                        name='Can update club team',
                        content_type=user_type)
                delete_club_team = Permission.objects.create(
                        codename='can_delete_club_team',
                        name='Can delete club team',
                        content_type=user_type)
                ### Intramural Teams
                create_intramural_team = Permission.objects.create(
                        codename='can_create_intramural_team',
                        name='Can create intramural team',
                        content_type=user_type)
                view_intramural_team = Permission.objects.create(
                        codename='can_view_intramural_team',
                        name='Can view intramural team',
                        content_type=user_type)
                update_intramural_team = Permission.objects.create(
                        codename='can_update_intramural_team',
                        name='Can update intramural team',
                        content_type=user_type)
                delete_intramural_team = Permission.objects.create(
                        codename='can_delete_intramural_team',
                        name='Can delete intramural team',
                        content_type=user_type)
                ### Teams
                join_team = Permission.objects.create(
                        codename='can_join_team',
                        name='Can join team',
                        content_type=user_type)
                request_team = Permission.objects.create( # Request superseeds automatically being allowed to join a team
                        codename='can_request_team',
                        name='Can request team',
                        content_type=user_type)
                ### Leagues
                create_league = Permission.objects.create(
                        codename='can_create_league',
                        name='Can create league',
                        content_type=user_type)
                ### Classes
                create_class = Permission.objects.create(
                        codename='can_create_class',
                        name='Can create class',
                        content_type=user_type)
                view_class = Permission.objects.create(
                        codename='can_view_class',
                        name='Can view class',
                        content_type=user_type)
                update_class = Permission.objects.create(
                        codename='can_update_class',
                        name='Can update class',
                        content_type=user_type)
                delete_class = Permission.objects.create(
                        codename='can_delete_class',
                        name='Can delete class',
                        content_type=user_type)
                join_class = Permission.objects.create(
                        codename='can_join_class',
                        name='Can join class',
                        content_type=user_type)
                request_class = Permission.objects.create( # Request superseeds automatically being allowed to join a class
                        codename='can_request_class',
                        name='Can request class',
                        content_type=user_type)
                ### Games
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
                admin.permissions.add(create_users, view_users, update_users, delete_users,
                                      promote_admin, promote_captain, promote_instructor, promote_referee,
                                      create_club_team, view_club_team, update_club_team, delete_club_team,
                                      create_intramural_team, view_club_team, update_club_team, delete_intramural_team,
                                      join_team,
                                      create_league,
                                      create_class, view_class, update_class, delete_class,
                                      join_class,
                                      create_game, administer_game)
                
                captain, created_captain = Group.objects.get_or_create(name='captain')
                # Add permissions to captain group here
                captain.permissions.add(create_intramural_team, view_club_team, update_club_team, delete_intramural_team)
                
                guest, created_guest = Group.objects.get_or_create(name='guest')
                # Add permissions to guest group here
                guest.permissions.add(request_team, request_class)
                
                referee, created_referee = Group.objects.get_or_create(name='referee')
                # Add permissions to referee group here
                referee.permissions.add(administer_game)
                
                instructor, created_instructor = Group.objects.get_or_create(name='instructor')
                # Add permissions to instructor group here
                instructor.permissions.add(create_class)
        except Exception as e:
                print(e)
                print("Groups and permissions are likely already created in your database :)")
                print("If you have added new permissions first run 'python manage.py deletegroups' ")

