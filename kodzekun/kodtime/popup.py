from .models import *
from django.shortcuts import render, redirect

def treepopup(request):
    if request.method == 'POST':
        tsk = request.POST.get('mid_id')
        print(tsk)
    return render(request, "popup/treepopup.html",{"data":tsk})