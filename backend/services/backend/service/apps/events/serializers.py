from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from apps.events.models import Event
from apps.user.models import User


class UserRelateSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField()
    full_name = serializers.CharField(
        source='profile.full_name',
        read_only=True
    )

    class Meta:
        model = User
        fields = (
            'uuid',
            'full_name',
        )


class EventSerializer(ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    author = UserRelateSerializer(
        default=serializers.CurrentUserDefault(),
        read_only=True,
    )
    participants = UserRelateSerializer(
        required=False,
        many=True,
    )
    event_photo = serializers.SerializerMethodField()


    class Meta:
        model = Event
        fields = (
            'uuid',
            'name',
            'date',
            'status',
            'author',
            'description',
            'participants',
            'event_photo',
        )

        read_only_fields = (
            'status',
        )

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

    @staticmethod
    def get_event_photo(attr):
        return attr.event_photo.file.url if attr.event_photo else None
