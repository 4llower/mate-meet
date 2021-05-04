from django.db import transaction

from apps.user.models import User


class UserManagementService:
    """User management service"""

    @classmethod
    @transaction.atomic
    def create_user(*args, **kwargs):
        """Create user with defined login

        If no password is passed or is empty the user will
        create a user without a password (empty password).
        """
        login = kwargs.get('login')
        kwargs['is_superuser'] = False

        user, _ = User.objects.get_or_create(login=login)

        user.set_password(kwargs.get('password'))
        user.save()

        return user
