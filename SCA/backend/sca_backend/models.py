from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Resume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='resume')
    data = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Resume({self.user.username})"
