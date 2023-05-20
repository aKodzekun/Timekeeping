from django.db import models

# Create your models here.
class companies_i(models.Model):
    db_key=models.CharField(max_length=25,default="")
    register=models.CharField(max_length=25,default="")
    name=models.CharField(max_length=25,default="")
    short_name=models.CharField(max_length=25,default="")
    type=models.CharField(max_length=25,default="")
    phone=models.CharField(max_length=25,default="")
    mail=models.CharField(max_length=25,default="")
    men_cnt=models.IntegerField(max_length=11,default=0)
    license_date=models.IntegerField(max_length=11,default=0)
    license_attent_date=models.IntegerField(max_length=11,default=0)
    date=models.IntegerField(max_length=11,default=0)

class tree_i(models.Model):
    mid=models.IntegerField(max_length=11,default=0)
    root_id=models.IntegerField(max_length=11,default=0)
    type=models.IntegerField(max_length=11,default=0)
    name=models.CharField(max_length=25,default="")
    short_name=models.CharField(max_length=25,default="")
    salary=models.IntegerField(max_length=11,default=0)
    salary_type=models.CharField(max_length=25,default="")
    men_cnt=models.IntegerField(max_length=11,default=0)
    date=models.IntegerField(max_length=11,default=0)

class human_i(models.Model):
    db_key=models.CharField(max_length=25,default="")
    com_id=models.IntegerField(max_length=11,default=0)
    dep_id=models.IntegerField(max_length=11,default=0)
    app_id=models.IntegerField(max_length=11,default=0)
    last_name=models.CharField(max_length=25,default="")
    first_name=models.CharField(max_length=25,default="")
    gender=models.IntegerField(max_length=11,default=0)
    phone=models.CharField(max_length=25,default="")
    email=models.EmailField(max_length=25,default="")
    work_type_id=models.IntegerField(max_length=11,default=0)
    is_moderator=models.IntegerField(max_length=11,default=0)
    code=models.CharField(max_length=25,default="")
    is_attendace=models.IntegerField(max_length=11,default=0)
    time_access_id=models.IntegerField(max_length=11,default=0)
    salary_id=models.IntegerField(max_length=11,default=0)
    author_id=models.IntegerField(max_length=11,default=0)
    create_date=models.IntegerField(max_length=11,default=0)

class login_i(models.Model):
    human_id=models.IntegerField(max_length=11,default=0)
    phone=models.CharField(max_length=25,default="")
    mail=models.CharField(max_length=25,default="")
    enc_password=models.CharField(max_length=250,default="")
    date=models.IntegerField(max_length=11,default=0)

class confirm_mail_i(models.Model):
    human_id=models.IntegerField(max_length=11,default=0)
    mail=models.CharField(max_length=25,default="")
    msg=models.CharField(max_length=25,default="")
    is_active=models.IntegerField(max_length=11,default=0)
    date=models.IntegerField(max_length=11,default=0)




class direct_i(models.Model):
    com_id=models.IntegerField(max_length=11,default=0)
    direct_group_id=models.IntegerField(max_length=11,default=0)
    days=models.IntegerField(max_length=2,default=0)
    is_holiday=models.IntegerField(max_length=11,default=0)
    is_flexible=models.IntegerField(max_length=11,default=0)
    start_date=models.IntegerField(max_length=11,default=0)
    between_start_date=models.IntegerField(max_length=11,default=0)
    end_date=models.IntegerField(max_length=11,default=0)
    between_end_date=models.IntegerField(max_length=11,default=0)
    is_lunch=models.IntegerField(max_length=11,default=0)
    lunch_start_date=models.IntegerField(max_length=11,default=0)
    lunch_end_date=models.IntegerField(max_length=11,default=0)
    missed_work_money=models.IntegerField(max_length=11,default=0)
    create_date=models.IntegerField(max_length=11,default=0)

class direct_user_i(models.Model):
    direct_group_id=models.IntegerField(max_length=11,default=0)
    human_id=models.IntegerField(max_length=11,default=0)
    create_date=models.IntegerField(max_length=11,default=0)

class direct_group(models.Model):
    name=models.CharField(max_length=25,default="")
    description=models.CharField(max_length=25,default="")
    is_active=models.IntegerField(max_length=11,default=0)
    author_id=models.IntegerField(max_length=11,default=0)
    date=models.IntegerField(max_length=11,default=0)
    _cron_date=models.IntegerField(max_length=11,default=0)

class direct_schedule_i(models.Model):
    human_id=models.IntegerField(max_length=11,default=0)
    direct_group_id=models.IntegerField(max_length=11,default=0)
    is_type=models.IntegerField(max_length=11,default=0)
    is_lunch=models.IntegerField(max_length=11,default=0)
    time_1=models.IntegerField(max_length=11,default=0)
    time_2=models.IntegerField(max_length=11,default=0)
    time_3=models.IntegerField(max_length=11,default=0)
    time_4=models.IntegerField(max_length=11,default=0)
    description=models.CharField(max_length=25,default="")
    create_date=models.IntegerField(max_length=11,default=0)

class request_i(models.Model):
    human_id=models.IntegerField(max_length=11,default=0)
    mail=models.CharField(max_length=25,default="")
    msg=models.CharField(max_length=25,default="")
    is_active=models.IntegerField(max_length=11,default=0)
    date=models.IntegerField(max_length=11,default=0)

class access_user_i(models.Model):
    human_id = models.IntegerField(max_length=11, default=0)
    mail = models.CharField(max_length=25, default="")
    msg = models.CharField(max_length=25, default="")
    is_active = models.IntegerField(max_length=11, default=0)
    date = models.IntegerField(max_length=11, default=0)

class shift_access_user_i(models.Model):
    human_id = models.IntegerField(max_length=11, default=0)
    mail = models.CharField(max_length=25, default="")
    msg = models.CharField(max_length=25, default="")
    is_active = models.IntegerField(max_length=11, default=0)
    date = models.IntegerField(max_length=11, default=0)