from django.urls import path
from .views import *

urlpatterns = [
    path('register', view=RegistrationAPIView.as_view()),
    path('verify-email', view=VerifyEmailAPIView.as_view()),
]