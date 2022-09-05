# Generated by Django 4.1 on 2022-09-05 07:22

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations
from meeting_app_backend.models import MeetingUser, Role


def add_user(apps, schema_editor):
    User: MeetingUser = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    User.objects.create(
        email="maor@example.com",
        password=make_password("testPassword123"),
        role=Role.ADMIN,
        username="maorTest",
        # is_admin=True,
        is_staff=True,
    )


def delete_user(apps, schema_editor):
    User: MeetingUser = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    User.objects.filter(email="maor@example.com").delete()


class Migration(migrations.Migration):

    dependencies = [
        ("meeting_app_backend", "0002_meetinguser_role"),
    ]

    operations = [migrations.RunPython(add_user, delete_user)]
