from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

from meeting_app_backend.serializers import MyTokenObtainPairSerializer

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
