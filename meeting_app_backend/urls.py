# import django router
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView

router = DefaultRouter()


urlpatterns = router.urls
urlpatterns += [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
