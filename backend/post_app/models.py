from django.db import models
from django.contrib.auth import get_user_model
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

User = get_user_model()

# Create your models here.

class Post(models.Model):
    text = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)

class PostImage(models.Model):
    image = models.ImageField(
        upload_to='posts/',
        width_field='width', height_field='height'
    )
    thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFit(300, 300)],
        format='WEBP',
        options={"quality": 85}
    )
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='images')
    order = models.IntegerField(default=0)
    width = models.IntegerField()
    height = models.IntegerField()

    class Meta:
        ordering = ['order']