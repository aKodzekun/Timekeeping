from django.http import JsonResponse
from .models import *

def getData(request):
  # data = {"message": "Hello, world!"}
  if request.method == 'POST':
      # Process the AJAX request data
      # return_data=[]
      tsk = request.POST.get('tsk')
      # print(tsk)
      if tsk=='tree_veiw':
          tree_id = request.POST.get('tree_id')
          # print('naka de'+tree_id)
          return_tree=tree_about(tree_id)
          # return_time=time_about(tree_id)
          return JsonResponse({'datas':return_tree})

def tree_about(id):
    send_data=[]
    tree_res = tree_i.objects.filter(id__icontains=id)
    for tree_row in tree_res:
        # print(tree_row.date)
        if tree_row.type==0:
            human_active = human_i.objects.filter(com_id__icontains=id,work_type_id__icontains=1).count()
            human_all = human_i.objects.filter(com_id__icontains=id).count()
            # print(human_all)
            # return send_data.append(f'''{human_active}''')
            # print(f'''{str(tree_row.name)},{str(tree_row.men_cnt)},{str(tree_row.date)},{str(tree_row.type)},{str(human_all)},{str(human_active)}''')
            send_data.append(f'''{str(tree_row.name)},{str(tree_row.men_cnt)},{str(tree_row.date)},{str(tree_row.type)},{str(human_all)},{str(human_active)}''')
            # print(send_data)
            return send_data
        elif tree_row.type==1:
            human_active = human_i.objects.filter(dep_id__icontains=id,work_type_id__icontains=1).count()
            human_all = human_i.objects.filter(dep_id__icontains=id).count()
            # return send_data.append(f'''{human_active}''')
            send_data.append(f'''{str(tree_row.name)},{str(tree_row.men_cnt)},{str(tree_row.date)},{str(tree_row.type)},{str(human_all)},{str(human_active)}''')
            # print(send_data)
            return send_data
        else:
            human_active = human_i.objects.filter(app_id__icontains=id,work_type_id__icontains=1).count()
            # return send_data.append(f'''{human_active}''')
            human_all = human_i.objects.filter(app_id__icontains=id).count()
            send_data.append(f'''{str(tree_row.name)},{str(tree_row.men_cnt)},{str(tree_row.date)},{str(tree_row.type)},{str(human_all)},{str(human_active)}''')
            # print(send_data)
            return send_data
def getTime(request):
    if request.method == 'POST':
        direct_id = request.POST.get('direct_id')
        print(direct_id)
        if(direct_id==None):
            return JsonResponse({'1': ''})
        else:
            return_time=time_about(direct_id)
            return JsonResponse({'1': return_time})

def time_about(id):
    send_data=[]
    direct = direct_i.objects.filter(direct_group_id__icontains=id).order_by('days')
    for i in direct:
        send_data.append([f'''{str(i.days)}#{str(i.is_flexible)}#{str(i.start_date)}#{str(i.between_start_date)}#{str(i.end_date)}#{str(i.between_end_date)}#{str(i.missed_work_money)}#{str(i.create_date)}'''])

    return send_data