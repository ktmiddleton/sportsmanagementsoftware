from django.urls import path

from . import views

urlpatterns = [
    path("", views.IntramuralTeamList.as_view(), name="index"),
]