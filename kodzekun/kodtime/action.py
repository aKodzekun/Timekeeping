import time

from .models import *
from django.db.models import Sum
from django.contrib import messages
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
            messages.success(request, 'Ажилттай нэмэгдлээ!')
            return render(request, "pages/settings.html")

        if tsk=='edit':
            id = request.POST.get('id')
            tree = tree_i.objects.get(id=id)
            tree.name = name
            tree.short_name = short_name
            tree.men_cnt = men_cnt
            tree.save()
            messages.success(request, 'Ажилттай засагдлаа!')
            return render(request, "pages/settings.html")


        if tsk=='del':
            id = request.POST.get('id')
            is_human = human_i.objects.filter(Q(com_id__icontains=id)|Q(dep_id__icontains=id)|Q(app_id__icontains=id)).count()
            if is_human >0:
                messages.success(request, 'Уг бүтэц дээр '+is_human+'хүн бүртгэлтэй байна!')
                return render(request, "pages/settings.html")
            else:
                tree = tree_i.objects.get(id=id)
                tree.delete()
                messages.success(request, 'Ажилттай устлаа!')
                return render(request, "pages/settings.html")

    else:
        return redirect('dashboardClick')

def time_back(request):
    if request.method == 'POST':
        tsk = request.POST.get('tsk')
        print("enkeeeeeee"+tsk)
        if tsk=='add':
            print("mfsdjkhfj")
            name = request.POST.get('name')
            desc = request.POST.get('desc')
            penalty = request.POST.get('penalty')
            days = request.POST.getlist('days[]')

            direct_g = direct_group()
            direct_g.name = name
            direct_g.description = desc
            direct_g.is_active = 1
            direct_g.com_id = request.session['com_id']
            direct_g.author_id = request.session['user_id']
            direct_g.date = time.time()
            direct_g._cron_date = 3600
            direct_g.save()
            direct_id = direct_g.id
            print("mfsdjkhfj")

            for index, items in enumerate(days):
                item=items.split(',')
                direct = direct_i(com_id =request.session['com_id'],direct_group_id =direct_id,days = int(item[0]),is_holiday =0,is_flexible =int(item[2]),start_date =int(item[3]),between_start_date =int(item[4]),end_date =item[5],between_end_date =int(item[6]),missed_work_money = int(penalty),create_date = time.time())
                direct.save()

            messages.success(request, 'Ажилттай нэмэгдлээ!')
            return render(request, "pages/settings.html")
        elif tsk=='del':
            id = request.POST.get('id')
            timeg = direct_group.objects.get(id__icontains=id)
            timeg.delete()

            directi = direct_i.objects.get(direct_group_id__icontains=id)
            directi.delete()
            messages.success(request, 'Ажилттай устлаа!')
            return render(request, "pages/settings.html")
        else:
            return redirect('dashboardClick')
    else:
        return redirect('dashboardClick')

def ip_back(request):
    if request.method == 'POST':
        tsk = request.POST.get('tsk')
        print(tsk)
        if tsk=='add':
            ip = request.POST.get('ip')
            desc = request.POST.get('desc')
            ips = ip_i()
            ips.ip=ip
            ips.desc=desc
            ips.author_id=request.session['user_id']
            ips.date=request.session['com_id']
            ips.save()
            messages.success(request, 'Ажилттай нэмэгдлээ!')
            return render(request, "pages/settings.html")
        else:
            id = request.POST.get('id')
            ipdel = ip_i.objects.get(id__icontains=id)
            ipdel.delete()
            messages.success(request, 'Ажилттай устлаа!')
            return render(request, "pages/settings.html")
    else:
        return redirect('dashboardClick')
