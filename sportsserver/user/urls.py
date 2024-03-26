from django.urls import path
from user import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('getuserusername/', views.UserGetUsername.as_view(), name='getuserusername')
]