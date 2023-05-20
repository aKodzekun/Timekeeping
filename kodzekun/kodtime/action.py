from .models import *
from django.db.models import Sum
from django.db.models import Q
from .views import *
from django.shortcuts import render, redirect

def tree_back(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        short_name = request.POST.get('short_name')
        type = request.POST.get('type')
        men_cnt = request.POST.get('men_cnt')
        root = request.POST.get('root')
        mid_id = request.POST.get('mid')
        tsk = request.POST.get('tsk')

        if tsk=='save':
            myTree = tree_i()
            myTree.mid = mid_id
            myTree.root_id = root
            myTree.type = type
            myTree.name = name
            myTree.short_name = short_name
            myTree.salary = 0
            myTree.salary_type = "0"
            myTree.men_cnt = men_cnt
            myTree.date = time.time()
            myTree.save()
            return render(request, "pages/settings.html")

        if tsk=='edit':
            id = request.POST.get('id')
            tree = tree_i.objects.get(id=id)
            tree.name = name
            tree.short_name = short_name
            tree.men_cnt = men_cnt
            tree.save()
            return render(request, "pages/settings.html")


        if tsk=='del':
            id = request.POST.get('id')
            is_human = human_i.objects.filter(Q(com_id__icontains=id)|Q(dep_id__icontains=id)|Q(app_id__icontains=id)).count()
            if is_human >0:
                return render(request, "pages/settings.html")
            else:
                tree = tree_i.objects.get(id=id)
                tree.delete()
                return render(request, "pages/settings.html")