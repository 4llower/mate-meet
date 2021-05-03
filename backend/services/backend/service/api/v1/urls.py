from django.urls import include
from django.urls import path

from api.v1.auth import urlpatterns as auth_urls
from api.v1.user import urlpatterns as user_urls

app_name = 'v1'

urlpatterns = [
    path('auth/', include(auth_urls)),
    path('users/', include(user_urls)),
]
