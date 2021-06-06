from django.conf import settings
from django.core.mail import send_mail


class MailNotificationService:

    @classmethod
    def send_default_email(cls, subject, message, to=None):
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_DOMEN,
                recipient_list=to if not settings.DEBUG else [settings.EMAIL_DEFAULT]

            )
        except Exception as e:
            print('Failed to send message: ' + str(e))
