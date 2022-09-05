from django.contrib import admin
from . import models

# Register your models here.
admin.site.register([models.MeetingUser])

# topic admin panel - show id and topic title
# topic comment admin panel - show id, topic id, and comment
# meeting user admin panel - show id, username, and email


@admin.register(models.Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("id", "topicText")
    editable_fields = ("topicText",)
    search_fields = ("topicText",)


@admin.register(models.TopicComment)
class TopicCommentAdmin(admin.ModelAdmin):
    list_display = ("id", "topic", "commentText")
    editable_fields = ("commentText",)
    search_fields = ("commentText", "topic")
