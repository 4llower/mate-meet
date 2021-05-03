import pytest
from rest_framework import serializers
from rest_framework import exceptions

from apps.user.models import User
from tests.factories.user import UserFactory
from apps.user.serializers import (UserRegisterSerializer, UserSetPasswordSerializer)


@pytest.mark.django_db
class TestUserSerializer:
    def test_password_is_write_only_field(self, user):
        assert 'password' not in UserSetPasswordSerializer(user).data

    @pytest.mark.parametrize('password', [
        '',
        '12345678',
        'qwerty123'
    ])
    def test_validate_password(self, password, user):
        with pytest.raises(serializers.ValidationError):
            assert UserSetPasswordSerializer(user).validate_password(password)

    def test_create_exists_user(self, user):
        serializer = UserRegisterSerializer(data=vars(user))
        with pytest.raises(exceptions.ValidationError):
            assert serializer.is_valid(raise_exception=True)

    @pytest.mark.parametrize('user', [UserFactory.build()])
    def test_create_user(self, user):
        serializer = UserRegisterSerializer(data=vars(user))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        assert User.objects.get(email=user.email)
