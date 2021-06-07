import uuid

from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from libs.django.models import BaseModel
from django.contrib.auth.base_user import BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, login, password=None):
        user = self.model(login=login)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password):
        user = self.create_user(
            login=login,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    login = models.CharField(
        unique=True,
        max_length=64,
        verbose_name=_('Login'),
    )
    email = models.EmailField(
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is active'),
    )
    is_staff = models.BooleanField(
        default=False,
    )

    groups = None

    USERNAME_FIELD = 'login'
    objects = AccountManager()

    class Meta:
        verbose_name_plural = _('Users')
        verbose_name = _('User')

    def __str__(self):
        return f"{self.login}"


class Profile(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        blank=True,
        verbose_name=_('User'),
    )
    avatar = models.ForeignKey(
        to='Avatar',
        on_delete=models.PROTECT,
        related_name='profiles',
        null=True,
        related_query_name='profile',
    )
    first_name = models.CharField(
        max_length=32,
        blank=True,
        verbose_name=_('First name'),
    )
    last_name = models.CharField(
        blank=True,
        max_length=32,
        verbose_name=_('Last name'),
    )
    phone_number = models.CharField(
        blank=True,
        max_length=15,
        verbose_name=_('Phone number'),
    )
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = _('User profiles')
        verbose_name = _('User profile')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.full_name = f"{self.first_name} {self.last_name}"
