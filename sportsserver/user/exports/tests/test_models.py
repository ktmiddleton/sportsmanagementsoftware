from django.test import TestCase
from user.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token

TEST_USERNAME = 'testuser'
TEST_PASSWORD = 'password'
TEST_FIRST_NAME = 'test'
TEST_LAST_NAME = 'user'
TEST_EMAIL = 'test@user.com'

class ClubSportsTeamModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username=TEST_USERNAME, password=TEST_PASSWORD, first_name=TEST_FIRST_NAME, last_name=TEST_LAST_NAME, email=TEST_EMAIL)

    def test_create_user(self):
        print("Test create user")
        user = self.user
        self.assertEquals(user.username, TEST_USERNAME)
        self.assertEquals(user.check_password(TEST_PASSWORD), True)
        self.assertEquals(user.first_name, TEST_FIRST_NAME)
        self.assertEquals(user.last_name, TEST_LAST_NAME)
        self.assertEquals(user.email, TEST_EMAIL)

    def test_token_exists(self):
        token, created = Token.objects.get_or_create(user=self.user)
        print("Test user key", token.key)
        self.assertIsNotNone(token.key)