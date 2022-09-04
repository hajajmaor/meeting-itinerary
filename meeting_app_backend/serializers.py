from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from meeting_app_backend.models import MeetingUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: MeetingUser):
        token = super().get_token(user)
        print(user, type(user))
        token["role"] = user.role
        return token
