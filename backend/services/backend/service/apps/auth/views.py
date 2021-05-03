from rest_framework import generics, permissions, response, status
from rest_framework_simplejwt import tokens
from rest_framework_simplejwt import views as jwt_views

from apps.auth.tokens import AccessToken
from apps.auth.serializers import (
    RefreshTokenSerializer,
    TokenObtainPairSerializer,
)


class TokenObtainPairView(jwt_views.TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class LogoutView(generics.GenericAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = RefreshTokenSerializer

    def post(self, request):
        _, token = request.headers['Authorization'].split()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        AccessToken(token).blacklist()
        tokens.RefreshToken(serializer.validated_data['refresh']).blacklist()

        return response.Response(status=status.HTTP_200_OK)
