from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,"home.html")
def sign(request):
    return render(request,"sign.html")
def login(request):
    return render(request,"login.html")