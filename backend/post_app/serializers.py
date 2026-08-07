from rest_framework import serializers
from .models import *

MAX_IMAGES = 5

class PostAuthorSerializer(serializers.ModelSerializer):
    avatar_thumbnail = serializers.SerializerMethodField()

    def get_avatar_thumbnail(self, obj):
        return obj.avatar_thumbnail.url if obj.avatar else None
        
    class Meta:
        model = User
        fields = ['username', 'avatar_thumbnail']

class PostImageSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        return obj.thumbnail.url

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

    def validate_text(self, value):
        if not value.strip():
            raise serializers.ValidationError('Text cannot be empty')
        if len(value) > 1000:
            raise serializers.ValidationError('Text cannot exceed 1000 characters')
        return value 

    def validate(self, attrs):
        if self.instance:
            current = self.instance.images.count()
            deleted = len(attrs.get('deleted_images', []))
            new = len(attrs.get('new_images', []))
            total = current - deleted + new
        else:
            total = len(attrs.get('new_images', []))

        if total > MAX_IMAGES:
            raise serializers.ValidationError(f'A post can contain at most {MAX_IMAGES} images')
        return attrs

    class Meta: 
        model = Post
        fields = ['id', 'text', 'author', 'created_at', 'images', 'new_images', 'deleted_images']