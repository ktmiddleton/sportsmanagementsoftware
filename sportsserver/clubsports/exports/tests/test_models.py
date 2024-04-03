from django.test import TestCase
from user.models import User
from clubsports.models import ClubSportsTeam

TEST_USERNAME = 'testuser'
TEST_PASSWORD = 'password'

class ClubSportsTeamModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create a user
        cls.user = User.objects.create_user(username=TEST_USERNAME, password=TEST_PASSWORD)

        # Create a ClubSportsTeam instance to be used in test methods
        cls.team = ClubSportsTeam.objects.create(
            name='Test Team',
            description='A test team',
            registration='open'
        )
        cls.team.members.add(cls.user)
        cls.team.captains.add(cls.user)

    def test_club_team_creation(self):
        team = ClubSportsTeam.objects.get(id=1)
        self.assertEqual(team.name, 'Test Team')
        self.assertEqual(team.description, 'A test team')

    def test_club_team_join(self):
        team = ClubSportsTeam.objects.get(id=1)
        self.assertTrue(team.members.filter(username=TEST_USERNAME).exists())

    def test_club_team_captain_add(self):
        team = ClubSportsTeam.objects.get(id=1)
        self.assertTrue(team.captains.filter(username=TEST_USERNAME).exists())
