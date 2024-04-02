from django.urls import path

from . import views

urlpatterns = [
    path("", views.ClassesList.as_view(), name="index"),
    path("register/", views.ClassRegister.as_view(), name="register")
]