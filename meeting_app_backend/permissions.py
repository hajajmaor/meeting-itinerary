from rest_framework import permissions
from .models import MeetingUser


class IsUser(permissions.BasePermission):
    message = "You must be user to access"

    def has_permission(self, request, view):
        user: MeetingUser = request.user
        return user.role == "user"


class IsAdmin(permissions.BasePermission):
    message = "You must be admin to access"

    def has_permission(self, request, view):
        user: MeetingUser = request.user
        return user.role == "admin"
