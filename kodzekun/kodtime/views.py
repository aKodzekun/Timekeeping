from datetime import datetime

# from django.db.models import Q
from django.db.models import Sum, Q
from django.db import connection
from django.http import JsonResponse

from .models import *
from smtplib import *
from .fuction import *
from .tree import *
from django.contrib import admin
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password

import time

# Create your views here.
def home(request):
    if(request.session.get('login')):
        # return render(request,"home.html")
        return redirect('dashboardClick')
    else:
        return redirect('login')

def sign(request):
    if(request.session.get('login')):
        return redirect('home')
    else:
        return render(request,"sign.html",{'name_val': '','short_name_val': '','phone_val': '','mail_val': '','men_cnt_val': 0,'type_val': 0})

def login(request):
    if (request.session.get('login')):
        return redirect('home')
    else:
        # return render(request,"login.html")
        return render(request, "loginContent/loginform.html")

def signClick(request):
    if request.method == 'POST':
        db_key = randomword(8)
        # adminpass = password(db_key)
        adminpass = make_password(db_key, salt=None)

        name = request.POST["com_name"]
        register = 0
        short_name = request.POST["nick_name"]
        phone = request.POST["phone"]
        mail = request.POST["mail"]
        men_cnt = request.POST["customRange"]
        type = request.POST["type"]
        license_date = time.time() + 1209600  # after 14days
        license_attent_date = time.time() + 950400  # after 11days

        title="Сайн байна уу"
        sendDatas = {
            'title': title.encode('utf-8'),
            'password': db_key,
            'sign_name': mail,
            'confidentiality': db_key,
            'men_cnt': men_cnt,
            'license': time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.localtime(license_date)),
        }
        count = companies_i.objects.filter(mail__contains=mail).count()
        if(count>0):
            messages.success(request, 'Таны бүртгэл давхардаж байна!')
            name_val = name
            short_name_val = short_name
            phone_val = phone
            mail_val = mail
            men_cnt_val = men_cnt
            type_val = type
            return render(request,"sign.html",{'name_val': name_val,'short_name_val': short_name_val,'phone_val': phone_val,'mail_val': mail_val,'men_cnt_val': men_cnt_val,'type_val': type_val})
        else:
            myCompany = companies_i()
            myCompany.db_key=db_key
            myCompany.register=register
            myCompany.name=name
            myCompany.short_name=short_name
            myCompany.type=type
            myCompany.phone=phone
            myCompany.mail=mail
            myCompany.men_cnt=men_cnt
            myCompany.license_date=license_date
            myCompany.license_attent_date=license_attent_date
            myCompany.date=time.time()
            myCompany.save()
            newCompanyId = myCompany.id

            myTree = tree_i()
            myTree.mid=0
            myTree.root_id=newCompanyId
            myTree.type=0
            myTree.name=name
            myTree.short_name=short_name
            myTree.salary=0
            myTree.salary_type=""
            myTree.men_cnt=men_cnt
            myTree.date=time.time()
            myTree.save()
            newTreeComId = myTree.id

            myTreeApp = tree_i()
            myTreeApp.mid=newTreeComId
            myTreeApp.root_id=newCompanyId
            myTreeApp.type=2
            myTreeApp.name="Систем удирдагч"
            myTreeApp.short_name="СУ"
            myTreeApp.salary=0
            myTreeApp.salary_type=""
            myTreeApp.men_cnt=1
            myTreeApp.date=time.time()
            myTreeApp.save()
            newTreeAppId = myTreeApp.id

            myHuman = human_i()
            myHuman.db_key=db_key
            myHuman.com_id=newTreeComId
            myHuman.dep_id=0
            myHuman.app_id=newTreeAppId
            myHuman.last_name="Систем"
            myHuman.first_name="Админ"
            myHuman.gender=1
            myHuman.phone=""
            myHuman.email=mail
            myHuman.work_type_id=1
            myHuman.is_moderator=1
            myHuman.code='000001'
            myHuman.is_attendace=0 #irts bvrtguuleh eseh
            myHuman.time_access_id=0 #tsagiin id
            myHuman.salary_id=0
            myHuman.author_id=0
            myHuman.create_date=time.time()
            myHuman.save()
            newHumanId = myHuman.id

            # user = User.objects.create_user(username='С.Админ', email=mail, password=adminpass, last_login=time.time(), date_joined=time.time(), human_id=newHumanId , last_name='Админ', first_name='Систем')
            # user.save()

            myLogin = login_i()
            myLogin.human_id=newHumanId
            myLogin.phone=phone
            myLogin.mail=mail
            myLogin.enc_password=adminpass
            myLogin.date=time.time()
            myLogin.save()

            myCofirmMail = confirm_mail_i()
            myCofirmMail.human_id=newHumanId
            myCofirmMail.mail=mail
            myCofirmMail.msg="Тавтай морил Админ"
            myCofirmMail.is_active=1
            myCofirmMail.date=time.time()

            access = sendMeil("eenkhsuren10@gmail.com", mail, "Тавтай морил", sendDatas)
            print(access)
            return redirect('login')

def loginClick(request):
    if request.method == 'POST':
        email = request.POST["email"]
        password = request.POST["password"]

        auth_login = login_i.objects.filter(mail__icontains=email)

        if auth_login.count()==1:
            for log in auth_login:
                stored_hash = log.enc_password
                human_id = log.human_id
                check_pass = check_password(password, stored_hash)
                if check_pass:
                    human_row = human_i.objects.get(id=human_id)
                    print(human_id)
                    print(check_pass)
                    request.session['login'] = check_pass
                    request.session['user_id'] = human_id
                    request.session['db_key'] = human_row.db_key
                    request.session['com_id'] = human_row.com_id
                    request.session['dep_id'] = human_row.dep_id
                    request.session['app_id'] = human_row.app_id
                    request.session['gender'] = human_row.gender
                    request.session['last_name'] = human_row.last_name
                    request.session['first_name'] = human_row.first_name
                    request.session['is_attendace'] = human_row.is_attendace
                    request.session['time_access_id'] = human_row.time_access_id
                    request.session['work_type_id'] = human_row.work_type_id
                    # request.session.save()
                    return redirect(home)
                else:
                    # nuuts ug buruu bna
                    # return render(request, "home.html")
                    messages.success(request, 'Таны нууц үг буруу байна!')
                    return redirect(login)
        elif auth_login.count()>1:
            #email davhardaj bna
            messages.success(request, 'Таны имэйл хаяг давхардаж байна!')
            return render(request, "loginContent/loginform.html")
        else:
            #email buruu bna
            messages.success(request, 'Таны имэйл хаяг бүртгэлгүй байна!')
            return render(request, "loginContent/loginform.html")
    else:
        return render(request, "loginContent/loginform.html")

def logintosign(request):
        return redirect('sign')

def signtologin(request):
        return redirect('login')

def logintoforget(request):
    # return redirect(dashboard)
    return render(request, "loginContent/forgetform.html")

def forgetClick(request):
    if request.method == 'POST':
        email = request.POST["email"]
        is_email = human_i.objects.filter(email__icontains=email).count()
        print(is_email)
        if(is_email>0):
            messages.success(request, 'Та имэйл хаягаа шалгана уу!')
            return render(request, "loginContent/forgetform.html")
        else:
            messages.success(request, 'Таны имэйл хаяг бүртгэлгүй байна!')
            return render(request, "loginContent/forgetform.html")

def password_recovery(request):
    # return redirect(dashboard)
    return render(request, "loginContent/recovery.html")



# in Home Moduls Action

def dashboardClick(request):
    # return redirect(dashboard)
    if (request.session.get('login') == True):
        count = human_i.objects.filter(com_id__icontains=int(request.session['com_id'])).count()
        s_count = direct_schedule_i.objects.filter(Q(description__icontains=request.session['com_id']) & Q(time_1__icontains=1)).count()
        n_count = human_i.objects.filter(Q(com_id__icontains=int(request.session['com_id']))).exclude(Q(work_type_id=1)).count()

        iresen_ids = direct_schedule_i.objects.filter(Q(description__icontains=request.session['com_id']) & Q(time_1__icontains=1)).values_list('human_id', flat=True)
        # iresen = human_i.objects.filter(Q(com_id__icontains=request.session['com_id']) & Q(id__in=iresen_ids))
        # ireegvi = human_i.objects.filter(com_id__icontains=request.session['com_id']).exclude(id__in=iresen_ids)

        # for ds in ireegvi:
        #     print("ds",ds.last_name)
        # for aaa in iresen:
        #     print("aaa",aaa.last_name)
        # query = "SELECT * FROM your_table WHERE your_condition;"
        # results = YourModel.objects.raw(query)

        iresen = human_i.objects.raw('SELECT * FROM kodtime_human_i INNER JOIN kodtime_direct_schedule_i ON kodtime_human_i.id = kodtime_direct_schedule_i.human_id WHERE kodtime_human_i.com_id=' + str(request.session['com_id']) + ' AND kodtime_human_i.id IN (' + ', '.join(map(str, iresen_ids)) + ');')
        ireegvi = human_i.objects.raw('SELECT * FROM kodtime_human_i  WHERE com_id=' + str(request.session['com_id']) + ' AND id NOT IN (' + ', '.join(map(str, iresen_ids)) + ');')
        # for dfds in joined_results:
        #     print(dfds.human_id,dfds.last_name)

        return render(request, "pages/dashboard.html",{
            'first_name':request.session['first_name'],
            'last_name':request.session['last_name'][:1],
            'gender':('man' if request.session['gender'] == 1 else 'woman'),
            'count':count,
            'scount':s_count,
            'ncount':n_count,
            'iresen':iresen,
            'ireegvi':ireegvi
        })
    else:
        return redirect('login')

def notificationClick(request):
    # return redirect(dashboard)
    if (request.session.get('login') == True):
        return render(request, "pages/notification.html",{'first_name':request.session['first_name'],'last_name':request.session['last_name'][:1],'gender':('man' if request.session['gender'] == 1 else 'woman')})
    else:
        return redirect('login')

def analystClick(request):
    # return redirect(dashboard)
    if (request.session.get('login') == True):
        return render(request, "pages/analyst.html",{'first_name':request.session['first_name'],'last_name':request.session['last_name'][:1],'gender':('man' if request.session['gender'] == 1 else 'woman')})
    else:
        return redirect('login')

def memberClick(request):
    if (request.session.get('login')==True):
        tree_com = tree_i.objects.filter(id__icontains=request.session['com_id'])
        for tree in tree_com:
            tree_all = tree_i.objects.filter(root_id__icontains=tree.root_id)
            tree_front = []
            for tree_some in tree_all:
                tree_front.append(f'''{str(tree_some.id)},{str(tree_some.mid)},{str(tree_some.root_id)},{tree_some.name},{str(tree_some.short_name)},{str(tree_some.type)},{str(tree_some.men_cnt)},{str(tree_some.date)}''')

            return render(request, "pages/member.html",{'tree_com': tree_com,'tree_all':tree_front,'first_name':request.session['first_name'],'last_name':request.session['last_name'][:1],'gender':('man' if request.session['gender'] == 1 else 'woman')})
    else:
        return redirect('login')

def settingsClick(request):
    # return redirect(dashboard)
    if (request.session.get('login')==True):
        # global tree_array
        tree_com = tree_i.objects.filter(id__icontains=request.session['com_id'])
        for tree in tree_com:
            tree_all = tree_i.objects.filter(root_id__icontains=tree.root_id)
            # tree_array=[]
            tree_front=[]
            for tree_some in tree_all:
                tree_front.append(f'''{str(tree_some.id)},{str(tree_some.mid)},{str(tree_some.root_id)},{tree_some.name},{str(tree_some.short_name)},{str(tree_some.type)},{str(tree_some.men_cnt)},{str(tree_some.date)}''')
            direct_g = direct_group.objects.filter(com_id__icontains=request.session['com_id'])
            ip_res = ip_i.objects.filter(date__icontains=request.session['com_id'])

            return render(request, "pages/settings.html",{'tree_com': tree_com,'tree_all':tree_front,'direct_g':direct_g,'ips':ip_res,'first_name':request.session['first_name'],'last_name':request.session['last_name'][:1],'gender':('man' if request.session['gender'] == 1 else 'woman')})
    else:
        return redirect('login')

def exitClick(request):
    # print(request.session.get('login'))
    del request.session['login']
    del request.session['user_id']
    del request.session['db_key']
    del request.session['com_id']
    del request.session['dep_id']
    del request.session['app_id']
    del request.session['gender']
    del request.session['last_name']
    del request.session['first_name']
    del request.session['is_attendace']
    del request.session['time_access_id']
    del request.session['work_type_id']

    return redirect(login)

def time_req(request):
    if request.method == 'POST':
        now = request.POST.get('now')
        epoch = request.POST.get('epoch')
        id = request.POST.get('id')
        time_type = request.POST.get('time_type')

        print((datetime.strptime(str(date.today()), '%Y-%m-%d')).timestamp())
        today=(datetime.strptime(str(date.today()), '%Y-%m-%d')).timestamp()
        count = direct_schedule_i.objects.filter(Q(human_id=int(request.session['user_id'])) & Q(create_date=int(today))).count()
        if count > 0:
            if int(time_type) == 1:
                direct_schedule_i.objects.filter(Q(human_id=int(request.session['user_id'])) & Q(create_date=int(today))).update(time_1=epoch)
            else:
                direct_schedule_i.objects.filter(Q(human_id=int(request.session['user_id'])) & Q(create_date=int(today))).update(time_3=epoch)

            messages.success(request, 'Ажилттай бүртгүүллээ!')
        else:
            print(request.session['user_id'])
            print(id)
            print(epoch if time_type == 1 else 0)
            print(time_type)
            direct = direct_schedule_i()
            direct.human_id = request.session['user_id']
            direct.direct_group_id=id
            direct.is_type=time_type
            direct.is_lunch=0
            direct.time_2=0
            if int(time_type) == 1:
                direct.time_1=epoch
                direct.time_3=0
            else:
                direct.time_1=0
                direct.time_3=epoch
            direct.time_4=0
            direct.description=request.session['com_id']
            direct.create_date=today
            direct.save()
            messages.success(request, 'Ажилттай бүртгүүллээ!')
    return JsonResponse({'data':"successful"}, status=200)