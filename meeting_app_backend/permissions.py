from rest_framework import permissions

# import AnonymousUser
from django.contrib.auth.models import User


from .models import MeetingUser, Role


class IsUser(permissions.BasePermission):
    message = "You must be user to access"

    def has_permission(self, request, view):
        user: MeetingUser = request.user
        return user.role == Role.USER


class IsAdmin(permissions.BasePermission):
    message = "You must be admin to access"

    def has_permission(self, request, view):
        user: User = request.user
        if type(user) == MeetingUser:
            return user.role == Role.ADMIN
        return False
