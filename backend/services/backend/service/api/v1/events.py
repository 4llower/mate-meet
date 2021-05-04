from django.urls import path

from apps.events.views import EventListCreateApiView, EventDestroyApiView, UpdateParticipantsApiView

app_name = 'v1'

urlpatterns = [
    path('', EventListCreateApiView.as_view()),
    path('<uuid:pk>/', EventDestroyApiView.as_view()),
    path('<uuid:pk>/participants/', UpdateParticipantsApiView.as_view()),
]