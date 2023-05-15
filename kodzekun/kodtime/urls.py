from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home, name="home"),
    path('sign/', sign, name="sign"),
    path('login/', login, name="login"),
    path('signClick/', signClick, name="signClick"),
    path('exitClick/', exitClick, name="exitClick"),
    path('loginClick/', loginClick, name="loginClick"),
    path('signtologin/', signtologin, name="signtologin"),
    path('logintosign/', logintosign, name="logintosign")

]