from .models import Post, PostImage

class PostService:

    @staticmethod
    def create_post(author, validated_data):
        post = Post.objects.create(author=author, text=validated_data['text'])

        for index, img in enumerate(validated_data.get('new_images') or []):
            PostImage.objects.create(post=post, image=img, order=index)

        return post 

    @staticmethod
    def update_post(post, validated_data):
        text = validated_data.get('text')
        if text is not None:
            post.text = text
            post.save(update_fields=['text'])

        images = post.images.all()
        images.filter(id__in=validated_data.get('deleted_images') or []).delete()

        images_list = list(images)
        last_order = images_list[-1].order if images_list else -1

        for index, img in enumerate(validated_data.get('new_images') or []):
            PostImage.objects.create(post=post, image=img, order=last_order + index + 1)      

        images = list(post.images.all())
        for index, img in enumerate(images):
            img.order = index

        PostImage.objects.bulk_update(images, ['order'])
            
        return post
