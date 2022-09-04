from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers

from .models import MeetingUser, Topic


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: MeetingUser):
        token = super().get_token(user)
        print(user, type(user))
        token["role"] = user.role
        return token


class TopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    createdAt = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Topic
        fields = "__all__"
