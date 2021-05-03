from django.conf import settings
from django.views.static import serve
from django.urls import include
from django.urls import path
from rest_framework import status
from rest_framework import response
from rest_framework import views
from rest_framework import permissions

from api.v1.auth import urlpatterns as auth_urls
from api.docs import urlpatterns as docs_urls
from apps.admin.admin import matemeet_admin
from api.v1 import urls as v1_urls


class HealthCheckView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return response.Response(status=status.HTTP_200_OK)


urlpatterns = [
    path('api/', include([
        path('admin/', matemeet_admin.urls),
        path('health-check/', HealthCheckView.as_view()),
        path('auth/', include(auth_urls)),
        path('v1/', include(v1_urls.urlpatterns)),
        path('docs/', include(docs_urls)),
    ])),
    path(f'{settings.MEDIA_DIR}/<path:path>', serve, {
        'document_root': settings.MEDIA_ROOT
    }),
]
