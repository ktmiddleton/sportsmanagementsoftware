from django.test import TestCase
from django.urls import reverse
from user.models import User
from rest_framework.test import APIClient
from clubsports.models import ClubSportsTeam
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from django.core.management import call_command

TEST_USERNAME = 'testuser'
ADMIN_TEST_USERNAME = 'adminuser'
TEST_PASSWORD = 'password'

TEST_TEAM_NAME = 'Test Team'
TEST_TEAM_DESCRIPTION = 'A test team'

CLOSED_TEAM_NAME = 'Closed Team'
CLOSED_TEAM_DESCRIPTION = 'A closed team'

TEST_POST_TEAM_NAME = 'POST Team'
TEST_POST_TEAM_DESCRIPTION = 'A POST team'

class ClubSportsTeamsViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create groups
        cls.setup_user_groups(cls)

        # Create a user
        cls.user = User.objects.create_user(username=TEST_USERNAME, password=TEST_PASSWORD)
        cls.admin_user = User.objects.create_user(username=ADMIN_TEST_USERNAME, password=TEST_PASSWORD)

        # Add user to user group
        user_group = Group.objects.get(name="user")
        cls.user.groups.add(user_group)

        # Add admin_user to admin group
        admin_group = Group.objects.get(name="admin")
        cls.admin_user.groups.add(admin_group)

        # Get a user token
        cls.token = Token.objects.create(user=cls.user)
        print(cls.token.key)

        # Get a token for admin user
        cls.admin_token = Token.objects.create(user=cls.admin_user)
        print(cls.admin_token.key)

        # Create a team
        cls.team = ClubSportsTeam.objects.create(
            name=TEST_TEAM_NAME,
            description=TEST_TEAM_DESCRIPTION,
            registration='open'
        )

        # Create a closed team
        cls.closed_team = ClubSportsTeam.objects.create(
            name=CLOSED_TEAM_NAME,
            description=CLOSED_TEAM_DESCRIPTION,
            registration='closed'
        )

        # Add users to team
        cls.team.members.add(cls.user)
        cls.team.members.add(cls.admin_user)

    def setUp(self):
        # Every test needs access to the APIClient
        self.client = APIClient()

    def setup_user_groups(self):
        args = []
        opts = {}
        call_command('creategroups', *args, **opts)

# ClubSportsTeamsList(APIView)
    def test_clubsports_view_url_exists(self):
        print('/clubsports/')
        response = self.client.get('/clubsports/')
        self.assertEqual(response.status_code, 200)

    # GET /clubsports/
    def test_get_all_club_sports_teams(self):
        print('GET /clubsports/')
        response = self.client.get('/clubsports/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(TEST_TEAM_NAME, str(response.data))

    # GET /clubsports/?teamId=_team id_
    def test_get_single_club_sports_team(self):
        print('GET /clubsports/?teamId=' + str(self.team.id))
        response = self.client.get('/clubsports/?teamId=' + str(self.team.id))
        self.assertEqual(response.status_code, 200)
        self.assertIn(TEST_TEAM_NAME, str(response.data))

    # POST UNAUTHORIZED /clubsports/
    def test_post_club_sport_team_UNAUTHORIZED(self):
        print('POST UNAUTHORIZED /clubsports/')
        response_post = self.client.post('/clubsports/',
        {
            "name": TEST_POST_TEAM_NAME,
            "description": TEST_POST_TEAM_DESCRIPTION,
            "token": str(self.token.key)
        })
        self.assertEqual(response_post.status_code, 401) # Make sure we get the UNAUTHORIZED status code
        response_get = self.client.get('/clubsports/')
        self.assertNotIn(TEST_POST_TEAM_NAME, str(response_get.data)) # Ensure its not there
    
    # POST AUTHORIZED /clubsports/
    def test_post_club_sport_team_AUTHORIZED(self):
        print('POST AUTHORIZED /clubsports/')
        response_post = self.client.post('/clubsports/',
        {
            "name": TEST_POST_TEAM_NAME,
            "description": TEST_POST_TEAM_DESCRIPTION,
            "token": str(self.admin_token.key)
        })
        self.assertEqual(response_post.status_code, 201) # Make sure we get the CREATED status code
        response_get = self.client.get('/clubsports/')
        self.assertIn(TEST_POST_TEAM_NAME, str(response_get.data)) # Ensure its not there

    # DELETE /clubsports/?teamId=_team id_&token=_token_ UNAUTHORIZED
    def test_delete_club_sport_team_UNAUTHORIZED(self):
        print('DELETE UNAUTHORIZED /clubsports/?teamId=' + str(self.team.id) + '&token=' + str(self.token.key))
        response_delete = self.client.delete('/clubsports/?teamId=' + str(self.team.id) + '&token=' + str(self.token.key))
        self.assertEqual(response_delete.status_code, 401) # Make sure we get the UNAUTHORIZED status code
        response_get = self.client.get('/clubsports/')
        self.assertIn(TEST_TEAM_NAME, str(response_get.data)) # Ensure its still there

    # DELETE /clubsports/?teamId=_team id_&token=_token_ AUTHORIZED
    def test_delete_club_sport_team_AUTHORIZED(self):
        print('DELETE AUTHORIZED /clubsports/?teamId=' + str(self.team.id) + '&token=' + str(self.admin_token.key))
        response_delete = self.client.delete('/clubsports/?teamId=' + str(self.team.id) + '&token=' + str(self.admin_token.key))
        self.assertEqual(response_delete.status_code, 200) # Make sure we get the OK status code
        response_get = self.client.get('/clubsports/')
        self.assertNotIn(TEST_TEAM_NAME, str(response_get.data)) # Ensure it's not there

# UserTeamsList(APIView)

    # GET clubsports/userteams/?username=_username_
    def test_get_user_teams(self):
        print('GET /clubsports/userteams/?username=' + str(self.user.username))
        response = self.client.get('/clubsports/userteams/?username=' + str(self.user.username))
        self.assertEqual(response.status_code, 200)
        self.assertIn(TEST_TEAM_NAME, str(response.data))
    
    # POST /clubsports/userteams/
    def test_post_user_join_team(self):
        print('POST /clubsports/userteams/')
        response_post = self.client.post('/clubsports/userteams/',
        {
            "token": str(self.token.key),
            "teamId": 1
        })
        self.assertEqual(response_post.status_code, 201) # Make sure we get the CREATED status code
        response_get = self.client.get('/clubsports/userteams/?username=' + str(self.user.username))
        self.assertIn(TEST_TEAM_NAME, str(response_get.data)) # Ensure user is in team
        
    # DELETE /clubsports/userteams/?teamId=_team id_&token=_token_
    def test_post_user_join_team(self):
        print('POST /clubsports/userteams/?teamId=_team id_&token=_token_')
        response_delete = self.client.delete('/clubsports/userteams/?teamId=' + str(1) + '&token=' + str(self.token.key))
        self.assertEqual(response_delete.status_code, 200) # Make sure we get the OK status code
        response_get = self.client.get('/clubsports/userteams/?username=' + str(self.user.username))
        self.assertNotIn(TEST_TEAM_NAME, str(response_get.data)) # Ensure user is no longer in team

    # POST /clubsports/userteams/
    def test_post_user_join_team_closed(self):
        print('POST /clubsports/userteams/')
        response_post = self.client.post('/clubsports/userteams/',
        {
            "token": str(self.token.key),
            "teamId": 2
        })
        self.assertEqual(response_post.status_code, 401) # Make sure we get the UNAUTHORIZED status code
        response_get = self.client.get('/clubsports/userteams/?username=' + str(self.user.username))
        self.assertNotIn(CLOSED_TEAM_NAME, str(response_get.data)) # Ensure user is not in team

# PromoteCaptain(APIView)
        
    # POST AUTHORIZED /clubsports/promotecaptain/
    def test_post_promote_user_captain_AUTHORIZED(self):
        print('POST /clubsports/promotecaptain/')
        response_post = self.client.post('/clubsports/promotecaptain/',
        {
            "username": self.user.username,
            "teamId": 1,
            "token": self.admin_token
        })
        self.assertEqual(response_post.status_code, 200) # Make sure we get the OK status code
        response_get = self.client.get('/clubsports/?teamId=' + str(1))
        self.assertIn(self.user.username, str(response_get.data["captains"])) # Ensure user is in captain list

    # POST UNAUTHORIZED /clubsports/promotecaptain/
    def test_post_promote_user_captain_UNAUTHORIZED(self):
        print('POST /clubsports/promotecaptain/')
        response_post = self.client.post('/clubsports/promotecaptain/',
        {
            "username": self.admin_user.username,
            "teamId": 1,
            "token": self.token
        })
        self.assertEqual(response_post.status_code, 401) # Make sure we get the UNAUTHORIZED status code
        response_get = self.client.get('/clubsports/?teamId=' + str(1))
        self.assertNotIn(self.admin_user.username, str(response_get.data["captains"])) # Ensure user is in captain list
