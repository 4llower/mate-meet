from os import environ

from celery import Celery


app = Celery('mate-meet')

app.config_from_object(environ['DJANGO_SETTINGS_MODULE'], namespace='CELERY')

app.autodiscover_tasks()
