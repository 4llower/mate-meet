import pytest
from rest_framework import test
from rest_framework_simplejwt.exceptions import InvalidToken

from apps.auth.tokens import AccessToken
from apps.auth.authentication import JWTAuthentication


@pytest.mark.django_db
class TestJWTAuthentication:
    def test_check_authentication(self, user):
        token = str(AccessToken.for_user(user))
        request = test.APIRequestFactory().request(
            HTTP_AUTHORIZATION=f'Bearer {token}'
        )
        auth_user, _ = JWTAuthentication().authenticate(request)
        assert auth_user.email == user.email

    def test_check_is_token_blacklisted(self, user):
        token = str(AccessToken.for_user(user))
        AccessToken(token).blacklist()
        request = test.APIRequestFactory().request(
            HTTP_AUTHORIZATION=f'Bearer {token}'
        )
        with pytest.raises(InvalidToken):
            assert JWTAuthentication().authenticate(request)
