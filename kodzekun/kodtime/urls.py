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
    path('dashboard/', dashboardClick, name="dashboardClick"),
    path('notificationClick/', notificationClick, name="notificationClick"),
    path('analystClick/', analystClick, name="analystClick"),
    path('memberClick/', memberClick, name="memberClick"),
    path('settingsClick/', settingsClick, name="settingsClick"),
    path('signtologin/', signtologin, name="signtologin"),
    path('logintosign/', logintosign, name="logintosign"),
    path('forgetClick/', forgetClick, name="forgetClick"),
    path('logintoforget/', logintoforget, name="logintoforget"),
    path('password_recovery/', password_recovery, name="password_recovery")
]