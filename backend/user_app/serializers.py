from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from .models import *
import re

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    def validate_username(self, value):
        if not re.match(r'^[a-zA-Z][a-zA-Z0-9_.]{4,19}$', value):
            raise serializers.ValidationError('Usernames can only use letters (necessarily, first symbol), numbers, underscores and periods (5-20 symbols)')
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('Password must consist of at least 6 symbols')
        if not re.search(r'[a-z]', value) or not re.search(r'[A-Z]', value):
            raise serializers.ValidationError('Password must consist of at least 1 latin letter (uppercase and lowercase)')
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError('Password must consist of at least 1 digit')
        if not re.search(r'[_.+@-]', value):
            raise serializers.ValidationError('Password must consist of at least 1 symbol (_.+@-)')
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirmPassword': ['Passwords don`t match']})
        attrs.pop('confirm_password')
        return attrs

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password']

class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = serializers.CharField(required=False)

    def validate(self, attrs):
        refresh = self.context['request'].COOKIES.get('refresh')
        if not refresh:
            raise ValidationError({'detail': 'Refresh token not found.'})
        attrs['refresh'] = refresh
        return super().validate(attrs)

class MeSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(Self, obj):
        return f'{obj.first_name} {obj.last_name}'

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']