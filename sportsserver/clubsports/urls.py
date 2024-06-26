from django.urls import path

from . import views

urlpatterns = [
    path("", views.ClubSportsTeamsList.as_view(), name="index"),
    path("userteams/", views.UserTeamsList.as_view(), name="userteams"),
    path("promotecaptain/", views.PromoteCaptain.as_view(), name="promotecaptain")
]