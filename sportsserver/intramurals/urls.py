from django.urls import path

from . import views

urlpatterns = [
    path("", views.IntramuralSportList.as_view(), name="index"),
    path("teams/", views.IntramuralSportTeamList.as_view(), name="teams"),
    path("userteams/", views.UserTeamsList.as_view(), name="userteams"),
]