from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter(trailing_slash=False)
router.register(prefix='post', viewset=PostViewSet)

urlpatterns = [
    path('', include(router.urls))
]