from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from apps.events.models import Event


class EventSerializer(ModelSerializer):

    date = serializers.DateTimeField(required=True)
    author = serializers.RelatedField(default=serializers.CurrentUserDefault)
    participants = serializers.ManyRelatedField(
        child_relation=Event.objects.al
    )

    class Meta:
        model = Event
        fields = (
            'name',
            'author',
            'status',
            'date',
            'is_active',
            'participants',
            'description',
        )

        read_only_fields = (
            'status',
            'is_active',
            '',
        )
