from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.contrib.auth import authenticate
from .models import CustomUser, EmailVerification
from .utils import generate_code, send_verification_mail_async

class AuthService:

    @staticmethod
    def register(validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        AuthService.send_verification_code(user)

    @staticmethod
    def login(validated_data):
        user = authenticate(username=validated_data['email_or_username'], password=validated_data['password'])
        if not user:
            raise AuthenticationFailed({'code': 'invalid_credentials', 'detail': 'Wrong credentials'})
        if hasattr(user, 'email_verification'):
            AuthService.send_verification_code(user)
            raise AuthenticationFailed({'code': 'email_not_verified', 'detail': 'Email is not verified.', 'email': user.email})
        return AuthService.create_tokens(user)

    @staticmethod
    def send_verification_code(user):
        code = generate_code()
        verification, created = EmailVerification.objects.get_or_create(user=user)
        if not verification.should_generate_new_code():
            return
        verification.set_code(code)
        verification.save()
        send_verification_mail_async(user.email, code)
        
    @staticmethod
    def verify_email(validated_data):
        try:
            user = CustomUser.objects.get(email=validated_data['email'])
            verification = user.email_verification
        except (CustomUser.DoesNotExist, EmailVerification.DoesNotExist):
            raise ValidationError('Bad request')
        if not verification.check_code(validated_data['code']):
            raise ValidationError({'code': ['Wrong or expired code']})
        verification.delete()
        return AuthService.create_tokens(user)

    @staticmethod
    def create_tokens(user):
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }