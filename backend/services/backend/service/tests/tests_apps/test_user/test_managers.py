import pytest

from apps.user.models import User
from tests.factories.user import UserFactory


@pytest.mark.django_db
class TestUserManager:
    @pytest.mark.parametrize('user,method,is_superuser', [
        (UserFactory.build(), User.objects.create_user, False),
        (UserFactory.build(), User.objects.create_superuser, True)
    ])
    def test_create_user_and_superuser(self, user, method, is_superuser):
        method(
            login=user.login, password=user.password,
        )
        assert User.objects.get(login=user.login, is_superuser=is_superuser)
