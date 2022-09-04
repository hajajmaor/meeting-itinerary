from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets

from .models import Topic, TopicComment
from .serializers import (
    MyTokenObtainPairSerializer,
    TopicCommentSerializer,
    TopicSerializer,
)
from .permissions import IsAdmin


# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    queryset = Topic.objects.select_related().all()

    def get_permissions(self):
        if self.action in ("update", "partial_update", "destroy"):
            return [IsAdmin()]
        return super().get_permissions()


class TopicCommentViewSet(viewsets.ModelViewSet):
    serializer_class = TopicCommentSerializer
    queryset = TopicComment.objects.all()

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAdmin()]
        return super().get_permissions()
