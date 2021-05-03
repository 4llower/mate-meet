from rest_framework_simplejwt import exceptions
from rest_framework_simplejwt import authentication

from apps.auth.tokens import AccessToken


class JWTAuthentication(authentication.JWTAuthentication):
    def get_validated_token(self, raw_token):
        """Additional verification of the token in the blacklist

        When a token is blacklisted, the JWTAuthentication class
        doesn't check token for blacklist during authentication.
        """
        auth_token = super().get_validated_token(raw_token)

        try:
            AccessToken(auth_token.token).check_blacklist()
        except exceptions.TokenError as error:
            raise exceptions.InvalidToken(str(error))

        return auth_token
