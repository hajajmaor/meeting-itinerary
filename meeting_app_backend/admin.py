from django.contrib import admin
from . import models
# Register your models here.
admin.site.register([
    models.MeetingUser,
    models.Topic,
    models.TopicComment
])