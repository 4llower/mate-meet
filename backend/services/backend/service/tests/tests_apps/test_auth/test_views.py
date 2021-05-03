import pytest
from rest_framework import test
from rest_framework_simplejwt import tokens
from rest_framework_simplejwt import exceptions

from apps.auth.views import LogoutView
from apps.auth.tokens import AccessToken


@pytest.mark.django_db
class TestLogoutView:
    def test_logout_puts_tokens_in_blacklisted(self, user):
        view = LogoutView.as_view()
        token = tokens.RefreshToken.for_user(user)
        refresh = str(token)
        access = str(token.access_token)
        request = test.APIRequestFactory().post(
            'logout',
            format='json',
            data={'refresh': str(refresh)},
            HTTP_AUTHORIZATION=f'Bearer {access}'
        )
        view(request)
        with pytest.raises(exceptions.TokenError):
            assert AccessToken(access).check_blacklist()

    def test_logout_puts_refresh_token_in_blacklisted(self, user):
        view = LogoutView.as_view()
        token = tokens.RefreshToken.for_user(user)
        refresh = str(token)
        access = str(token.access_token)
        request = test.APIRequestFactory().post(
            'logout',
            format='json',
            data={'refresh': str(refresh)},
            HTTP_AUTHORIZATION=f'Bearer {access}'
        )
        view(request)
        with pytest.raises(exceptions.TokenError):
            assert tokens.RefreshToken(refresh).check_blacklist()
