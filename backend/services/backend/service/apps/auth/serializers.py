from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt import tokens
from rest_framework_simplejwt import exceptions
from rest_framework_simplejwt import serializers as jwt_serializers
User = get_user_model()


class TokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    default_error_messages = {
        'auth_failed': 'The Login or Password is incorrect',
        'inactive': 'Account is not active',
    }

    def validate(self, attrs):

        authenticate_kwargs = {
            self.username_field: attrs[self.username_field].lower(),
            'password': attrs['password'],
        }
        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if self.user is None:
            raise exceptions.AuthenticationFailed(
                detail=self.error_messages['auth_failed'],
                code='invalid-credentials',
            )
        elif not self.user.is_active:
            raise exceptions.AuthenticationFailed(
                detail=self.error_messages['inactive'],
                code='inactive',
            )

        refresh = self.get_token(self.user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': 'Token is invalid or expired'
    }

    def validate_refresh(self, attr):
        try:
            tokens.RefreshToken(attr, verify=True)
        except exceptions.TokenError:
            self.fail('bad_token')

        return attr
