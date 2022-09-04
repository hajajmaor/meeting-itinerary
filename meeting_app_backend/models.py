from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class MeetingUser(AbstractUser):
    pass

class Topic(models.Model):
    topicText = models.CharField(max_length=255, blank=False, null=False,unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self)->str:
        return self.topicText


class TopicComment(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    commentText = models.CharField(max_length=255, blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self)->str:
        return self.commentText