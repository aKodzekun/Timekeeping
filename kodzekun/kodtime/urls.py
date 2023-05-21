from django.contrib import admin
from django.urls import path, include
from .views import *
from .settings import *
from .popup import *
from .action import *

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
    path('password_recovery/', password_recovery, name="password_recovery"),
    path('getData/', getData, name='getData'),
    path('getTime/', getTime, name='getTime'),
    path('treepopup/', treepopup, name='treepopup'),
    path('tree_back/', tree_back, name='tree_back'),
    path('timepopup/', timepopup, name='timepopup'),
    path('time_back/', time_back, name='time_back'),
    path('ippopup/', ippopup, name='ippopup'),
    path('ip_back/', ip_back, name='ip_back')
]