from django.urls import path
from user import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('getuser/', views.UserGet.as_view(), name='getuser'),
    path('allusers/', views.AllUsers.as_view(), name='allusers'),
    path('changegroup/', views.ChangeGroup.as_view(), name='changegroup')
    # path('getusergroups/', views.UserGetGroups.as_view(), name='getusergroups')
]