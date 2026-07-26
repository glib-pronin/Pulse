from django.core.mail import send_mail
import random, threading

def generate_code():
    return f'{random.randint(0, 999999):06d}'

def _send_verification_mail(email, code):
    try:
        send_mail(
            subject='Email Verification',
            message=f'Your verification code: {code}.\nIt is valid for 15 minutes',
            recipient_list=[email],
            from_email=None
        )
    except Exception:
        print('ERROR')

def send_verification_mail_async(email, code):
        threading.Thread(
            target=_send_verification_mail,
            args=(email, code),
            daemon=True
        ).start()