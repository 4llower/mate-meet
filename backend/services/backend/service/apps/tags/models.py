from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.events.models import Event
from libs.django.models import BaseModel


class Tag(BaseModel):
    name = models.CharField(
        max_length=64,
        verbose_name=_('Tag Name'),
    )
    event = models.ForeignKey(
        to=Event,
        on_delete=models.CASCADE,
        related_query_name='event',
        related_name='events',
    )


    class Meta:
        verbose_name_plural = _('Tags')
        verbose_name = _('Tag')

    def __str__(self):
        return f"{self.name}"
