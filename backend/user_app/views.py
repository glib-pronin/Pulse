from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
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

