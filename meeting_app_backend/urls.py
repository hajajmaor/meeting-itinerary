# import django router
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView, TopicViewSet, TopicCommentViewSet

router = DefaultRouter()
router.register("topics", TopicViewSet, basename="topics")
router.register("topic_comments", TopicCommentViewSet, basename="topic_comments")


urlpatterns = router.urls
urlpatterns += [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
