import pytest
from rest_framework import exceptions
from rest_framework_simplejwt import tokens

from apps.auth.serializers import RefreshTokenSerializer


@pytest.mark.django_db
class TestRefreshTokenSerializer:
    def test_validate_refresh_if_token_is_blacklisted(self, user):
        refresh = str(tokens.RefreshToken.for_user(user))
        tokens.RefreshToken(refresh).blacklist()

        serializer = RefreshTokenSerializer(data={'refresh': refresh})
        with pytest.raises(exceptions.ValidationError):
            assert serializer.is_valid(raise_exception=True)
