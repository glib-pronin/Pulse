from django.urls import path
from .views import *

urlpatterns = [
    path('register', view=RegistrationAPIView.as_view()),
    path('verify-email', view=VerifyEmailAPIView.as_view()),
    path('login', view=LoginAPIView.as_view()),
    path('refresh', view=CookieTokenRefreshView.as_view()),
    path('logout', view=LogoutAPIView.as_view()),
    path('me', view=MeAPIView.as_view()),
]