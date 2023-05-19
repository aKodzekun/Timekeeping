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

        # sendDatas = {
        #     'title': title.encode('utf-8'),
        #     'password': db_key,
        #     'sign_name': mail,
        #     'confidentiality': db_key,
        #     'men_cnt': men_cnt,
        #     'license': time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.localtime(license_date)),
        # }

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
                    return render(request, "login.html")
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
        return render(request, "pages/dashboard.html")
    else:
        return redirect('login')


def notificationClick(request):
    # return redirect(dashboard)
    if (request.session.get('login') == True):
        return render(request, "pages/notification.html")
    else:
        return redirect('login')

def analystClick(request):
    # return redirect(dashboard)
    if (request.session.get('login') == True):
        return render(request, "pages/analyst.html")
    else:
        return redirect('login')

def memberClick(request):
    # return redirect(dashboard)
    print(request.session.get('login'))
    if (request.session.get('login')==True):
        return render(request, "pages/member.html")
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
                # tree_res = Tree(str(tree_some.id),str(tree_some.mid),str(tree_some.root_id),tree_some.name,str(tree_some.short_name),str(tree_some.type),str(tree_some.men_cnt),str(tree_some.date))
                # tree_array.append(tree_res)
                tree_front.append(f'''{str(tree_some.id)},{str(tree_some.mid)},{str(tree_some.root_id)},{tree_some.name},{str(tree_some.short_name)},{str(tree_some.type)},{str(tree_some.men_cnt)},{str(tree_some.date)}''')
            # for qqqq in tree_array:
            #     print(qqqq.getid(),qqqq.getname())
                # tree_front.append(f'''{qqqq.getid()},{qqqq.getmid()},{qqqq.getroot_id()},{qqqq.getname()},{qqqq.gettype1()},{qqqq.getmen_cnt()},{qqqq.getdate()}''')

            # print(f'''{str(tree_some.id)},{str(tree_some.mid)},{str(tree_some.root_id)},{tree_some.name},{str(tree_some.short_name)},{str(tree_some.type)},{str(tree_some.men_cnt)},{str(tree_some.date)}''')
            return render(request, "pages/settings.html",{'tree_com': tree_com,'tree_all':tree_front})
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

