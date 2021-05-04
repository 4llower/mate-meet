from django.http import Http404
from rest_framework import generics
from rest_framework import permissions
from apps.user.models import (
    Profile)
from apps.user.serializers import (
    UserRegisterSerializer,
    UserUpdatePasswordSerializer,
    UserProfileSerializer,
)


class OneToOneInstanceMixin:
    model_instance = None
    pagination_class = None

    def get_serializer(self, *args, **kwargs):
        kwargs.update(
            {'many': False}
        )
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        try:
            return self.model_instance.objects.get(user=self.request.user)
        except:
            raise Http404


class UserRegisterAPIView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (permissions.AllowAny,)


class UserUpdatePasswordAPIView(generics.UpdateAPIView):
    serializer_class = UserUpdatePasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UserProfileCreateAPIView(OneToOneInstanceMixin, generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    model_instance = Profile


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        try:
            return Profile.objects.get(
                user=self.request.user
            )
        except:
            raise Http404