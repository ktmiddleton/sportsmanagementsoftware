from django.urls import path

from . import views

urlpatterns = [
    path("", views.ClassesList.as_view(), name="index"),
    path("userclasses/", views.UserClassesList.as_view(), name="register")
]