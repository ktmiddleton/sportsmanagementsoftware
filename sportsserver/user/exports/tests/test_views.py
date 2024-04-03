from django.test import TestCase
from django.urls import reverse
from user.models import User
from rest_framework.test import APIClient
from clubsports.models import ClubSportsTeam
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from django.core.management import call_command

ADMIN_TEST_USERNAME = 'adminuser'

TEST_USERNAME = 'testuser'
TEST_PASSWORD = 'password'
TEST_FIRST_NAME = 'test'
TEST_LAST_NAME = 'user'
TEST_EMAIL = 'test@user.com'

TEST_POST_USERNAME = 'postuser'
TEST_POST_PASSWORD = 'password'
TEST_POST_FIRST_NAME = 'post'
TEST_POST_LAST_NAME = 'user'
TEST_POST_EMAIL = 'post@user.com'

class ClubSportsTeamsViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create groups
        cls.setup_user_groups(cls)

        # Create a user and admin user
        cls.user = User.objects.create_user(username=TEST_USERNAME, password=TEST_PASSWORD, first_name=TEST_FIRST_NAME, last_name=TEST_LAST_NAME, email=TEST_EMAIL)
        cls.admin_user = User.objects.create_user(username=ADMIN_TEST_USERNAME, password=TEST_PASSWORD, first_name=TEST_FIRST_NAME, last_name=TEST_LAST_NAME, email=TEST_EMAIL)

        # Add user to user group
        user_group = Group.objects.get(name="user")
        cls.user.groups.add(user_group)

        # Add admin_user to admin group
        admin_group = Group.objects.get(name="admin")
        cls.admin_user.groups.add(admin_group, user_group)

        # Get a user and admin token
        cls.user_token = Token.objects.create(user=cls.user)
        print(cls.user_token.key)
        cls.admin_token = Token.objects.create(user=cls.admin_user)
        print(cls.admin_token.key)

    def setUp(self):
        # Every test needs access to the APIClient
        self.client = APIClient()

    def setup_user_groups(self):
        args = []
        opts = {}
        call_command('creategroups', *args, **opts)

# UserRegister(APIView)
        
    # POST /register/
    def test_user_register(self):
        print('POST /user/register/')
        response_post = self.client.post('/user/register/',
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME,
            "last_name": TEST_POST_LAST_NAME,
            "password": TEST_POST_PASSWORD
        })
        self.assertEqual(response_post.status_code, 201) # Make sure we get the CREATED status code

        self.assertIn("token", str(response_post.data)) # Ensure we get the token username and email in response
        self.assertIn(TEST_POST_USERNAME, str(response_post.data))
        self.assertIn(TEST_POST_EMAIL, str(response_post.data))

        response_get = self.client.get('/user/allusers/?token=' + str(self.admin_token.key)) # check all users with admin token
        self.assertIn(TEST_POST_EMAIL, str(response_get.data)) # Ensure our posted user is there

    # POST  /user/login/
    def test_user_login_email(self):
        print('POST /user/login/')
        response_post = self.client.post('/user/login/',
        {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        })
        self.assertEqual(response_post.status_code, 200) # Make sure we get the OK status code
        
        self.assertIn("token", str(response_post.data)) # Ensure we get the token username and email in response
        self.assertIn(TEST_USERNAME, str(response_post.data))
        self.assertIn(TEST_EMAIL, str(response_post.data))

    # POST  /user/login/
    def test_user_login_username(self):
        print('POST /user/login/')
        response_post = self.client.post('/user/login/',
        {
            "email": TEST_USERNAME,
            "password": TEST_PASSWORD
        })
        self.assertEqual(response_post.status_code, 200) # Make sure we get the OK status code
        
        self.assertIn("token", str(response_post.data)) # Ensure we get the token username and email in response
        self.assertIn(TEST_USERNAME, str(response_post.data))
        self.assertIn(TEST_EMAIL, str(response_post.data))

    # POST  /user/login/
    def test_user_failed_login(self):
        print('POST /user/login/')
        response_post = self.client.post('/user/login/',
        {
            "email": TEST_EMAIL + "FAIL",
            "password": TEST_PASSWORD
        })
        self.assertEqual(response_post.status_code, 401) # Make sure we get the UNAUTHORIZED status code

    # GET  /user/getuser/?username=_username_
    def test_get_user_username(self):
        print('GET /user/getuser/?username=_username_')
        response_get = self.client.get('/user/getuser/?username=' + str(self.user.username)) # check user by username
        self.assertIn(TEST_EMAIL, str(response_get.data)) # Ensure our user is there

    # GET /user/getuser/?username=_username_
    def test_get_user_token(self):
        print('GET /user/getuser/?token=_token_')
        response_get = self.client.get('/user/getuser/?token=' + str(self.user_token.key)) # check user by token
        self.assertIn(TEST_EMAIL, str(response_get.data)) # Ensure our user is there

    def test_patch_user_self(self):
        print('PATCH /user/getuser/?token=_token_&username=_username_')
        response_post_new_user = self.client.post('/user/register/',
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME,
            "last_name": TEST_POST_LAST_NAME,
            "password": TEST_POST_PASSWORD
        })
        self.assertEqual(response_post_new_user.status_code, 201) # Make sure we get the CREATED status code
        post_token = response_post_new_user.data["token"]

        response_patch = self.client.patch('/user/getuser/?token=' + post_token + '&username=' + TEST_POST_USERNAME,
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME + "patch",
            "last_name": TEST_POST_LAST_NAME + "patch"
        })
        self.assertEqual(response_patch.status_code, 200) # Make sure we get the OK status code
        
        response_get = self.client.get('/user/getuser/?username=' + str(TEST_POST_USERNAME)) # check user by username
        self.assertIn(TEST_POST_FIRST_NAME + "patch", str(response_get.data)) # Ensure our users values have been patched
        self.assertIn(TEST_POST_LAST_NAME + "patch", str(response_get.data))


    def test_patch_user_other(self):
        print('PATCH /user/getuser/?token=_token_&username=_username_')
        response_post_new_user = self.client.post('/user/register/',
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME,
            "last_name": TEST_POST_LAST_NAME,
            "password": TEST_POST_PASSWORD
        })
        self.assertEqual(response_post_new_user.status_code, 201) # Make sure we get the CREATED status code

        response_patch = self.client.patch('/user/getuser/?token=' + self.admin_token.key + '&username=' + TEST_POST_USERNAME,
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME + "patch other",
            "last_name": TEST_POST_LAST_NAME + "patch other"
        })
        self.assertEqual(response_patch.status_code, 200) # Make sure we get the OK status code
        
        response_get = self.client.get('/user/getuser/?username=' + str(TEST_POST_USERNAME)) # check user by username
        self.assertIn(TEST_POST_FIRST_NAME + "patch other", str(response_get.data)) # Ensure our users values have been patched
        self.assertIn(TEST_POST_LAST_NAME + "patch other", str(response_get.data))

    def test_delete_user(self):
        print('DELETE /user/getuser/?token=_token_&username=_username_')
        response_post_new_user = self.client.post('/user/register/',
        {
            "email": TEST_POST_EMAIL,
            "username": TEST_POST_USERNAME,
            "first_name": TEST_POST_FIRST_NAME,
            "last_name": TEST_POST_LAST_NAME,
            "password": TEST_POST_PASSWORD
        })
        self.assertEqual(response_post_new_user.status_code, 201) # Make sure we get the CREATED status code

        response_delete = self.client.delete('/user/getuser/?token=' + self.admin_token.key + '&username=' + TEST_POST_USERNAME)
        self.assertEqual(response_delete.status_code, 200) # Make sure we get the OK status code
        
        response_get = self.client.get('/user/allusers/?token=' + str(self.admin_token.key)) # check all users with admin token
        self.assertNotIn(TEST_POST_EMAIL, str(response_get.data)) # Ensure our posted user is not there

    def test_get_all_users(self):
        response_get = self.client.get('/user/allusers/?token=' + str(self.admin_token.key)) # check all users with admin token
        self.assertIn(ADMIN_TEST_USERNAME, str(response_get.data)) # Ensure our admin user is there
        self.assertIn(TEST_USERNAME, str(response_get.data)) # Ensure our user is there
