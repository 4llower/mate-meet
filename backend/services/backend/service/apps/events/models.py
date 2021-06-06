from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.events.consts import EventStatusEnum
from apps.user.models import User
from libs.django.models import BaseModel


class Event(BaseModel):
    name = models.CharField(
        max_length=64,
        verbose_name=_('Event Name'),
    )
    event_photo = models.ForeignKey(
        to='EventPhoto',
        on_delete=models.PROTECT,
        related_name='profiles',
        related_query_name='profile',
        null=True,
    )
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_query_name='event',
        related_name='events',
    )
    status = models.CharField(
        max_length=64,
        choices=EventStatusEnum.choices(),
        default=EventStatusEnum.NOT_STARTED,
    )
    date = models.DateTimeField(
        null=True,
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is active'),
    )
    participants = models.ManyToManyField(
        to=User,
        related_query_name='participant',
        related_name='participants',
        null=True,
    )
    description = models.TextField()

    class Meta:
        verbose_name_plural = _('Events')
        verbose_name = _('Event')

    def __str__(self):
        return f"{self.name} - {self.date}"
