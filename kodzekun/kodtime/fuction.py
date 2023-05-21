import time
import bcrypt
import smtplib
import random, string

from django.db import connection
from jinja2 import Template
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.contrib.auth.hashers import check_password

# def password(mypassword):
#     salt = bcrypt.gensalt()
#
#     password = mypassword.encode("utf-8")
#     hashed_password = bcrypt.hashpw(password, salt)
#
#     return hashed_password

# def check_pass(mypassword,stored_hash):
#
#     # check if the provided password matches the stored hash
#     salt1 = bcrypt.gensalt()
#     password = mypassword.encode("utf-8")
#     hashed_password = bcrypt.hashpw(password, salt1)
#     print(hashed_password, stored_hash)
#     # if bcrypt.checkpw(password, stored_hash):
#     #     print("Password match!")
#     #     return 1
#     # else:
#     #     print("Invalid password.")
#     #     return 0
#
#     if check_password(password, stored_hash):
#         print('Password is correct')
#     else:
#         print('Password is incorrect')

def randomword(length=8):
    letters = string.ascii_letters
    wordKey = ''.join(random.choice(letters) for i in range(length))
    numkey = str(time.time())[:8]
    return numkey+'00'+wordKey

def sendMeil(sender_email_,recipient_email_,Subject,sendDatas):
    # Илгээгч болон хүлээн авагчийн имэйл хаягийг тодорхойл akodzekun@gmail.com
    sender_email = sender_email_
    recipient_email = recipient_email_

    # Имэйлийг илэрхийлэхийн тулд MIMEMultipart объект үүсгэ
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = Subject  # Имэйлийн сэдвийг тохируулна уу

    # Имэйлийн үндсэн хэсгийг нэмнэ үү
    body = htmlDraw(sendDatas)
    # msg.attach(MIMEText(body, 'plain'))
    msg.attach(MIMEText(body, 'html'))

    print(msg)
    # return msg
    # Файл хавсаргах (заавал биш)
    # with open('example.txt', 'rb') as f:
    #     attachment = MIMEText(f.read(), 'plain')
    #     attachment.add_header('Content-Disposition', 'attachment', filename='example.txt')
    #     msg.attach(attachment)

    # SMTP объект үүсгэж, имэйл серверт нэвтэрнэ үү

    # https://mailtrap.io/email-sandbox/
    # https://mailtrap.io/home
    #(235, b'2.0.0 OK')
    # smtp_server = 'sandbox.smtp.mailtrap.io'
    # smtp_port = 2525  # Имэйл сервертээ тохируулан портын дугаараа шинэчил
    # smtp_username = '02d51efd0a3318'
    # smtp_password = 'a980c004eae155'
    # smtp_tls = True  # Хэрэв таны имэйл сервер TLS шаардлагатай бол Үнэн, үгүй бол Худал гэж тохируулна уу

    # https://app-smtp.sendinblue.com/real-time
    # https://app.sendinblue.com/marketing-dashboard
    # (235, b'Authentication successful')
    smtp_server = 'smtp-relay.sendinblue.com'
    smtp_port = 587  # Имэйл сервертээ тохируулан портын дугаараа шинэчил
    smtp_username = 'akodzekun@gmail.com'
    smtp_password = 'KsIrEjOq0c76xYQP'
    smtp_tls = True  # Хэрэв таны имэйл сервер TLS шаардлагатай бол Үнэн, үгүй бол Худал гэж тохируулна уу
    #


    smtp = smtplib.SMTP(smtp_server, smtp_port)
    smtp.starttls() if smtp_tls else None
    result = smtp.login(smtp_username, smtp_password)
    # Имэйл илгээнэ
    smtp.sendmail(sender_email, recipient_email, msg.as_string())

    # SMTP холболтыг хаа
    smtp.quit()

    if result[1] in b'2.0.0 OK':
        print("1")
        return 'true'
    elif result[1] in b'Authentication successful':
        print("2")
        return 'true'
    else:
        print("false")
        return 'false'

def htmlDraw(sendDatas):
    template_string = """
    <html>
        <head>
            <title>{{ title }}</title>
        </head>
        <body>
            <span>Нэвтрэх нэр: </span><h1>{{ sign_name }}</h1>
            <span>Нууц үг: </span><p>{{ password }}</p>
            <span>Хэрэглэгчдийн тоо: </span><p>{{ men_cnt }}</p>
            <span>Тусгай зөвшөөрөлийн дуусах хугацаа: </span><p>{{ license }}</p>
            <span>Нууцлалын түлхүүр: </span><p>{{ confidentiality }}</p>
        </body>
    </html>
    """

    template = Template(template_string)

    return template.render(sendDatas)

