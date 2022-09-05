# import django router
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet, TopicCommentViewSet, RoleViewSet


router = DefaultRouter()
router.register("topics", TopicViewSet, basename="topics")
router.register("topic_comments", TopicCommentViewSet, basename="topic_comments")
router.register("roles", RoleViewSet, basename="roles")

urlpatterns = router.urls
