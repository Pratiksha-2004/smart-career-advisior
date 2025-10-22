from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Resume

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'password', 're_password', 'first_name', 'last_name')


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('user', 'data', 'updated_at')
        read_only_fields = ('user', 'updated_at')
