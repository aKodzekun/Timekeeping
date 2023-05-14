from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home, name="home"),
    path('registration/', registration, name="registration"),
    path('login/', login, name="login"),
    path('sign/', sign, name="sign"),
    path('loginClick/', loginClick, name="loginClick"),

]