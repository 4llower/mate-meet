from rest_framework import (
    generics,
    permissions,
    response,
    exceptions,
    views,
)
from rest_framework.response import Response

from apps.events.models import Event
from apps.events.serializers import EventSerializer


class EventListCreateApiView(generics.ListCreateAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.prefetch_related(
            'participants'
        ).select_related(
            'author',
        ).filter(
            is_active=True
        )


class EventDestroyApiView(views.APIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def delete(self, request, *args, **kwargs):
        event_pk = self.kwargs.get('pk')
        event_instance = Event.objects.filter(
            uuid=event_pk,
            author=self.request.user.uuid,
        )
        if event_instance:
            event_instance.is_active = False
            event_instance.save()
            return response.Response(status=204)
        else:
            raise exceptions.ValidationError('You do not have permission for this action!')


class UpdateParticipantsApiView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        instance = Event.objects.get(uuid=kwargs.get('pk'))
        if instance:
            current_participants = list(instance.participants.all())
            user = self.request.user

            if user in current_participants:
                instance.participants.remove(user)
            else:
                instance.participants.add(user)

            serializer = EventSerializer(instance)

            return Response(serializer.data)
