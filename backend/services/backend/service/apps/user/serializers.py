from django.core.exceptions import ValidationError
from django.db import transaction
from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers

from apps.user.services.management import UserManagementService
from apps.user.models import (
    User,
    Profile,
)


class UserRegisterSerializer(serializers.Serializer):
    uuid = serializers.UUIDField(read_only=True)
    login = serializers.CharField(required=True)
    link = serializers.ReadOnlyField()

    @staticmethod
    def validate_login(value):
        if User.objects.filter(login=value, is_active=True).exists():
            raise serializers.ValidationError("User with such login is already registered in our system")
        return value

    @transaction.atomic()
    def create(self, validated_data):
        return UserManagementService.create_user(**validated_data)


class UserSetPasswordSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('password', )
        model = get_user_model()

        extra_kwargs = {
            'password': {'write_only': True}
        }

    @staticmethod
    def validate_password(value):
        if value:
            try:
                password_validation.validate_password(value)
            except ValidationError as error:
                raise serializers.ValidationError(
                    error.messages
                )
        else:
            raise serializers.ValidationError('Необходимо ввести пароль')
        return value

    @transaction.atomic()
    def create(self, validated_data):
        user = self.context['request'].user
        return UserManagementService.set_password(user, **validated_data)


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

    class Meta:
        fields = (
            'uuid',
            'user',
            'first_name',
            'last_name',
            'description',
            'phone_number',
        )
        model = Profile

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except:
            return Profile.objects.get(user=self.context['request'].user)
