from rest_framework import serializers
from .models import *

class PostAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'avatar_thumbnail']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'thumbnail', 'order', 'width', 'height']

class PostSerializer(serializers.ModelSerializer):
    author = PostAuthorSerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    new_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    deleted_images = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta: 
        model = Post
        fields = ['id', 'text', 'author', 'created_at', 'images', 'new_images', 'deleted_images']