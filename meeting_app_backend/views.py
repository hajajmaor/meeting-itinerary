from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .models import Topic, TopicComment
from .serializers import (
    RoleSerializer,
    TopicCommentSerializer,
    TopicSerializer,
    MeetingUser,
)
from .permissions import IsAdmin


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


class RoleViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

    # querset show only role from MeetingUser based on the user id
    def get_queryset(self):
        return MeetingUser.objects.filter(id=self.request.user.id).only("role")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, many=False)
        return Response(serializer.data)
