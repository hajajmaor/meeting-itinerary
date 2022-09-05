from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

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
        if self.action == "create":
            return [IsAuthenticated()]
        return super().get_permissions()


class TopicCommentViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = TopicCommentSerializer
    queryset = TopicComment.objects.all()
    # parameters for the url
    lookup_field = "id"

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAdmin()]
        return super().get_permissions()
