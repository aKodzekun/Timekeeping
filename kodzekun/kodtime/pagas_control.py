import time
from .views import *
from .models import *
from .fuction import *
from django.db.models import *
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect

def member_show(request):
    if request.method == 'POST':
        tsk = request.POST.get('tsk')
        if tsk=='member_show':
            members = []
            id = request.POST.get('tree_id')
            res_human = human_i.objects.filter(Q(com_id__icontains=id) | Q(dep_id__icontains=id) | Q(app_id__icontains=id))
            if res_human.count()>0:
                for row in res_human:

                    members.append(f'''{str(row.id)}#{str(row.last_name)}#{str(row.first_name)}#{str(row.gender)}#{str(row.phone)}#{str(row.email)}#{str(row.work_type_id)}#{str(row.is_attendace)}#{str(row.salary_id)}''')
            else:
                members.append(f'''none''')
            return JsonResponse({'datas':members})
        elif tsk=='member_search':
            members = []
            id = request.POST.get('tree_id')
            search = request.POST.get('search')
            if search != '':
                # print("search tree: ",type(id))
                if id=="0":
                    id=request.session['com_id']

                name = models.Q(first_name__contains=str(search))
                com = models.Q(com_id__icontains=id)
                dep = models.Q(dep_id__icontains=id)
                app = models.Q(app_id__icontains=id)

                # print("search tree: ",id)
                # & (com | dep | app)

                # combined_filter = name | dep | app

                filtered_objects = human_i.objects.filter(name & (com | dep | app))

                if filtered_objects.count()>0:
                    for row in filtered_objects:
                        members.append(f'''{str(row.id)}#{str(row.last_name)}#{str(row.first_name)}#{str(row.gender)}#{str(row.phone)}#{str(row.email)}#{str(row.work_type_id)}#{str(row.is_attendace)}#{str(row.salary_id)}''')
                else:
                    members.append(f'''none''')
                return JsonResponse({'datas':members})
            else:
                members = []
                id = request.session['com_id']
                res_human = human_i.objects.filter(
                    Q(com_id__icontains=id) | Q(dep_id__icontains=id) | Q(app_id__icontains=id))
                if res_human.count() > 0:
                    for row in res_human:
                        members.append(
                            f'''{str(row.id)}#{str(row.last_name)}#{str(row.first_name)}#{str(row.gender)}#{str(row.phone)}#{str(row.email)}#{str(row.work_type_id)}#{str(row.is_attendace)}#{str(row.salary_id)}''')
                else:
                    members.append(f'''none''')
                return JsonResponse({'datas': members})

def add_member(request):
    com_id = request.session['com_id']
    datas = direct_group.objects.filter(com_id__icontains=com_id)
    # print(com_id)
    return render(request, "popup/memberpopup.html", {'datas': datas})

def membersave(request):
    if request.method == 'POST':
        last = request.POST.get('last')
        first = request.POST.get('first')
        salary = request.POST.get('salary')
        age = request.POST.get('age')
        phone = request.POST.get('phone')
        mail = request.POST.get('mail')
        direct = request.POST.get('direct')
        gender = request.POST.get('gender')
        app_id = request.POST.get('app_id')

        # print(app_id)
        adminpass = make_password("12001200", salt=None)

        tree_res = tree_i.objects.filter(id__icontains=app_id)
        for ii in tree_res:
            dep_id= ii.mid
        myHuman = human_i()
        myHuman.db_key = request.session['db_key']
        myHuman.com_id = request.session['com_id']
        myHuman.dep_id = dep_id
        myHuman.app_id = app_id
        myHuman.last_name = last
        myHuman.first_name = first
        myHuman.gender = gender
        myHuman.phone = phone
        myHuman.email = mail
        myHuman.work_type_id = 1
        myHuman.is_moderator = 0
        myHuman.code = '000001'
        myHuman.is_attendace = 1  # irts bvrtguuleh eseh
        myHuman.time_access_id = direct  # tsagiin id
        myHuman.salary_id = salary
        myHuman.author_id = request.session['user_id']
        myHuman.create_date = time.time()
        myHuman.save()
        newHumanId = myHuman.id

        myLogin = login_i()
        myLogin.human_id = newHumanId
        myLogin.phone = phone
        myLogin.mail = mail
        myLogin.enc_password = adminpass
        myLogin.date = time.time()
        myLogin.save()

        myCofirmMail = confirm_mail_i()
        myCofirmMail.human_id = newHumanId
        myCofirmMail.mail = mail
        myCofirmMail.msg = "Тавтай морил Админ"
        myCofirmMail.is_active = 1
        myCofirmMail.date = time.time()

        title = "Сайн байна уу"
        sendDatas = {
            'title': 'sain bna u',
            'password': '12001200',
            'sign_name': mail,
            'men_cnt': "0",
            'confidentiality': request.session['db_key'],
            'license': time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.localtime(time.time())),
        }

        aaa = sendMeil("eenkhsuren10@gmail.com", mail, "sain bna u", sendDatas)

def memberdel(request):
    user_id = request.POST.get('user_id')
    human_del = human_i.objects.get(id__icontains=user_id)
    human_del.delete()
    return render(request, "pages/member.html")

def memberedit(request):
    com_id = request.session['com_id']
    datas = direct_group.objects.filter(com_id__icontains=com_id)
    # print(com_id)
    return render(request, "popup/memberpopup.html", {'datas': datas})