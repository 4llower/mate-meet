from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from apps.auth import views as auth_views


urlpatterns = [
    path('', auth_views.TokenObtainPairView.as_view()),
    path('check/', TokenVerifyView.as_view()),
    path('logout/', auth_views.LogoutView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
