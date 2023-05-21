from .models import *
from django.db.models import Sum
from django.shortcuts import render, redirect

def treepopup(request):
    if request.method == 'POST':
        mid_id = request.POST.get('mid_id')
        tsk = request.POST.get('tsk')
        if tsk=="save":
            tree_res = tree_i.objects.filter(id__icontains=mid_id)
            total_sum = tree_i.objects.filter(mid__icontains=mid_id).aggregate(total=Sum('men_cnt'))['total']
            senddata=[]
            # mid_res=[]
            for tree in tree_res:
                print(total_sum)
                if total_sum==None:
                    total_sum=0
                remained_cnt = tree.men_cnt-total_sum
                senddata.append((tree.id,tree.mid,tree.root_id,tree.name,tree.short_name,tree.men_cnt,tree.type,remained_cnt,'save'))
                # senddata.append((mid_res,remained_cnt))
                return render(request, "popup/treepopup.html", {'data':senddata})
        elif tsk=="edit":
            myres = tree_i.objects.filter(id__icontains=mid_id) #minii row
            senddata=[]
            # mid_res=[]
            for myrow in myres:
                if myrow.mid==0:
                    # tree_res = tree_i.objects.filter(id__icontains=myrow.mid)
                    # total_sum = tree_i.objects.filter(mid__icontains=myrow.mid).aggregate(total=Sum('men_cnt'))['total']

                    # for tree in tree_res:
                    #     if total_sum == None:
                    #         total_sum = 0
                    #     remained_cnt = tree.men_cnt - total_sum
                        senddata.append((0, 0, 0, "</kodtime>", "</kodtime>", myrow.men_cnt,0, (200-myrow.men_cnt), 'edit', myrow.name, myrow.short_name, myrow.type,myrow.men_cnt, myrow.id))
                        # senddata.append((mid_res,remained_cnt))
                        return render(request, "popup/treepopup.html", {'data': senddata})
                else:
                    tree_res = tree_i.objects.filter(id__icontains=myrow.mid) #minii row
                    total_sum = tree_i.objects.filter(mid__icontains=myrow.mid).aggregate(total=Sum('men_cnt'))['total']

                    for tree in tree_res:
                        if total_sum==None:
                            total_sum=0
                        remained_cnt = tree.men_cnt-total_sum
                        senddata.append((tree.id,tree.mid,tree.root_id,tree.name,tree.short_name,tree.men_cnt,tree.type,remained_cnt,'edit',myrow.name,myrow.short_name,myrow.type,myrow.men_cnt, myrow.id))
                        # senddata.append((mid_res,remained_cnt))
                        return render(request, "popup/treepopup.html", {'data':senddata})
    else:
        return redirect('dashboardClick')

def timepopup(request):
    if request.method == 'POST':
        tsk = request.POST.get('tsk')
        if tsk == 'edit':
            time_id = request.POST.get('time_id')
            timegroup = direct_group.objects.filter(id__icontains=time_id)
            time_i = direct_i.objects.filter(direct_group_id__icontains=time_id)
            return render(request, "popup/timepopup.html", {'datas': {'tsk': 'edit','timegroup':timegroup,'time_i':time_i}})
        else:
            return render(request, "popup/timepopup.html", {'datas': {'tsk': 'add'}})
    else:
        return redirect('dashboardClick')

def ippopup(request):
    if request.method == 'POST':
        tsk = request.POST.get('tsk')
        if tsk=='add':
            return render(request, "popup/ippopup.html", {'datas': {'tsk': 'add'}})

    else:
        return redirect('dashboardClick')

