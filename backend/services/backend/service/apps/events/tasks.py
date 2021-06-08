from django.db import transaction
from celery.schedules import crontab
from celery.task import PeriodicTask
from .models import Event
from datetime import date, timedelta
from apps.common.services import MailNotificationService


class EmailEventManager(PeriodicTask):
    run_every = crontab(minute=0, hour=0)

    @transaction.atomic
    def run(self, *args, **kwargs):
        tomorrow = date.today() + timedelta(days=1)
        events = list(
            Event.objects.filter(
                date__gt=date.today(),
                date__lte=tomorrow,
            )
        )
        events_creators = [
            event.author.login for event in events
        ]
        for author in events_creators:
            MailNotificationService.send_default_email(
                subject='Event',
                message=f'Dear {author}, you have an event during the day',
                to=[author]
            )
