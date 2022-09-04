from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.



class MeetingUser(AbstractUser):
    class Role(models.TextChoices):
        """admin or user"""
        ADMIN = 'admin'
        USER = 'user'
    role=models.CharField(max_length=10, choices=Role.choices, default=Role.USER)

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