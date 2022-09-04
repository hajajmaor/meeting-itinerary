from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers

from .models import MeetingUser, Topic, TopicComment


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: MeetingUser):
        token = super().get_token(user)
        # print(user, type(user))
        token["role"] = user.role
        return token


class TopicCommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    createdAt = serializers.DateTimeField(read_only=True)

    class Meta:
        model = TopicComment
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    createdAt = serializers.DateTimeField(read_only=True)
    comments = TopicCommentSerializer(
        many=True,
        read_only=True,
        source="topiccomment_set",
    )

    class Meta:
        model = Topic
        fields = ["id", "topicText", "createdAt", "comments"]
