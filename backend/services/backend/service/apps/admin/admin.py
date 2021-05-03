from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.admin import AdminSite, ModelAdmin
from django.utils.translation import gettext_lazy as _

from apps.events.models import Event
from apps.files.models import Avatar
from apps.user.models import Profile

User = get_user_model()


class MateMeetAdminSite(AdminSite):
    site_header = 'Mate-Meet Admin'
    site_title = 'Mate-Meet Portal'
    index_title = 'Welcome to Mate-Meet '


class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 0
    raw_id_fields = ('user',)


class MateMeetUserAdmin(ModelAdmin):
    filter_horizontal = ()
    search_fields = (
        'login',
        'profile__phone_number',
    )
    ordering = ('login',)
    list_filter = ('is_active', 'is_staff', 'is_superuser',)
    fieldsets = (
        (None, {'fields': ('login', 'password')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser'),
        }),
    )
    inlines = (
        ProfileInline,
    )


class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'status')
    search_fields = ('name', 'date', 'status', 'author__login')
    list_filter = ('date', 'is_active',)


matemeet_admin = MateMeetAdminSite(name='matemeet_admin')
matemeet_admin.register(User, MateMeetUserAdmin)
matemeet_admin.register(Event, EventAdmin)
matemeet_admin.register(Avatar)
