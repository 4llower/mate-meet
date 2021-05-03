import pytest

from apps.user.models import User
from tests.factories.user import UserFactory
from apps.user.services.management import UserManagementService


@pytest.mark.django_db
class TestUserManagementService:
    @pytest.mark.parametrize('status,is_superuser', [
        (False, False)
    ])
    def test_create_user_password(self, status, is_superuser):
        user = UserManagementService.create_user(email='test@mail.com')
        assert user.is_active is status
        assert user.is_superuser is is_superuser

    # @pytest.mark.parametrize('attr,value,updated', [
    #     ('first_name', 'Darth', True),
    #     ('last_name', 'Vader', True)
    # ])
    # def test_update_user_info(self, attr, value, updated, user):
    #     UserManagementService.update_user(user, **{attr: value})
    #     assert (getattr(user, attr) == value) is updated
    #
    # def test_create_or_update_if_user_exists(self, user):
    #     user = UserManagementService.create_or_update(
    #         email=user.email, first_name='Darth', last_name='Vader'
    #     )
    #     assert user.first_name == 'Darth' and user.last_name == 'Vader'
    #
    # @pytest.mark.parametrize('user', [UserFactory.build()])
    # def test_create_or_update_if_user_does_not_exists(self, user):
    #     user = UserManagementService.create_or_update(email=user.email)
    #     assert User.objects.filter(email=user.email).exists()
    #
    # @pytest.mark.parametrize('user', [UserFactory.build()])
    # def test_create_or_update_created_user_with_empty_password(self, user):
    #     user = UserManagementService.create_or_update(email=user.email)
    #     assert not user.password
