from rest_framework import viewsets, status
from rest_framework.response import Response
from .permissions import IsAuthorOrReadOnly, IsAuthenticatedOrReadOnly
from .serializers import *
from .pagination import PostCursorPagination
from .services import PostService

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').prefetch_related('images')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = PostCursorPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = PostService.create_post(request.user, serializer.validated_data)
        return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        PostService.update_post(instance, serializer.validated_data)
        post = self.get_queryset().get(pk=instance.pk)
        return Response(PostSerializer(post).data)