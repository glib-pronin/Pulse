from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .services import AuthService
from .serializers import *

# Create your views here.

class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        AuthService.register(serializer.validated_data)
        return Response({'message': 'Verification code sent.'}, status=status.HTTP_201_CREATED)

class VerifyEmailAPIView(APIView):
    def post(self, request):
        serializer = VerifyEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = AuthService.verify_email(serializer.validated_data)
        response = Response({'message': 'Email is verified.', 'access': tokens['access']}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh', value=tokens['refresh'],
            httponly=True, secure=True, samesite='Lax'
        )
        return response

class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = AuthService.login(serializer.validated_data)
        response = Response({'message': 'User logged in', 'access': tokens['access']}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh', value=tokens['refresh'],
            httponly=True, secure=False, samesite='Lax'
        )
        return response

class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def post(self, request):
        response = super().post(request)
        if 'refresh' in response.data:
            response.set_cookie(
                key='refresh', value=response.data.pop('refresh'),
                httponly=True, secure=False, samesite='Lax'
            )
        return response

class LogoutAPIView(APIView):
    def post(self, request):
        response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh')
        return response

class MeAPIView(generics.RetrieveAPIView):
    serializer_class = MeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user