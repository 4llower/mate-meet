from django.core.exceptions import ValidationError
from django.db import transaction
from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers

from apps.user.services.management import UserManagementService
from apps.user.models import (
    User,
    Profile,
)


class UserRegisterSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    login = serializers.CharField(required=True)

    class Meta:
        fields = (
            'uuid',
            'password',
            'login',

        )
        model = get_user_model()

        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }
        }

    @staticmethod
    def validate_login(value):
        if User.objects.filter(login=value, is_active=True).exists():
            raise serializers.ValidationError("Пользователь с таким логином уже существует")
        return value

    @staticmethod
    def validate_password(value):
        try:
            password_validation.validate_password(value)
        except ValidationError as error:
            raise serializers.ValidationError(
                error.messages
            )
        return value

    @transaction.atomic()
    def create(self, validated_data):
        return UserManagementService.create_user(**validated_data)


class UserUpdatePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(min_length=8, write_only=True, source='password')

    class Meta:
        fields = ('old_password', 'new_password',)
        model = get_user_model()

    def validate(self, attrs):
        if not self.context['request'].user.check_password(attrs['old_password']):
            raise ValidationError(message={'old_password': 'Invalid old password'})
        if attrs['old_password'] == attrs['password']:
            raise ValidationError(message={'new_password': 'Passwords are identical'})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'uuid',
            'user',
            'first_name',
            'last_name',
            'description',
            'phone_number',
            'avatar',
        )

    @staticmethod
    def get_avatar(attr):
        return attr.avatar.file.url if attr.avatar else None

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except:
            return Profile.objects.get(user=self.context['request'].user)
