from django.db import transaction

from apps.user.models import User


class UserManagementService:
    """User management service"""

    @staticmethod
    @transaction.atomic
    def create_user(*args, **kwargs):
        """Create user with defined login

        If no password is passed or is empty the user will
        create a user without a password (empty password).
        """
        login = kwargs.get('login')
        kwargs['is_superuser'] = False

        user, _ = User.objects.get_or_create(login=login)

        return user

    @staticmethod
    @transaction.atomic
    def set_password(user, password):
        """Set user password"""

        user.set_password(password)
        user.save()

        return user

    @staticmethod
    @transaction.atomic
    def create_or_update(login, **kwargs):
        """Create user if doesn't exists or update user exists"""
        try:
            user = User.objects.get(login=login)
        except User.DoesNotExist:
            return UserManagementService.create_user(login, **kwargs)
        else:
            if kwargs.get('password'):
                UserManagementService.set_password(user, **kwargs)
            return user
