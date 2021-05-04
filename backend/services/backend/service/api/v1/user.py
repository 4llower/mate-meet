from django.urls import path

from apps.user.views import (
    UserRegisterAPIView, UserProfileAPIView,
    UserUpdatePasswordAPIView, UserProfileCreateAPIView,
)

urlpatterns = [
    path('', UserRegisterAPIView.as_view()),

    # current
    path('current/update-password/', UserUpdatePasswordAPIView.as_view()),
    path('current/profile/', UserProfileCreateAPIView.as_view()),
    path('current/profile-details/', UserProfileAPIView.as_view()),
]


