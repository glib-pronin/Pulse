from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import PostImage

@receiver(pre_delete, sender=PostImage)
def delete_image_file(sender, instance, **kwargs):
    if instance.thumbnail:
        instance.thumbnail.storage.delete(instance.thumbnail.name)
    instance.image.delete(save=False)