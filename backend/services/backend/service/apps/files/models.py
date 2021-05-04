import os

from django.db import models
from django.utils.translation import gettext_lazy as _

from libs.django.models import BaseModel
from apps.user.models import User


class Image(BaseModel):
    file = models.ImageField(
        upload_to='image/',
        verbose_name=_('file'),
        help_text=_('Image file')
    )
    owner = models.ForeignKey(
        to=User,
        on_delete=models.PROTECT
    )

    class Meta:
        abstract = True

    def __str__(self):
        return str(os.path.basename(self.file.name))


class Avatar(Image):
    file = models.ImageField(
        upload_to='avatar/',
        verbose_name=_('avatar'),
        help_text=_('Avatar file')
    )

    class Meta:
        verbose_name_plural = _('Avatars')
        verbose_name = _('Avatar')


class EventPhoto(Image):
    file = models.ImageField(
        upload_to='event/',
        verbose_name=_('event_photo'),
        help_text=_('Event photo file')
    )

    class Meta:
        verbose_name_plural = _('Event photo files')
        verbose_name = _('Event photo file')
