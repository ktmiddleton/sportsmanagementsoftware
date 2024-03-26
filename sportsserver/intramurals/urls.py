from django.urls import path

from . import views

urlpatterns = [
    path("", views.IntramuralSportList.as_view(), name="index"),
]