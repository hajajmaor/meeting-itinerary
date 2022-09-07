// class TopicComment(models.Model):
// topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
// commentText = models.CharField(max_length=255, blank=False, null=False)
// createdAt = models.DateTimeField(auto_now_add=True)

import { Topic } from "./Topic.interface";

export interface TopicComment {
  id: number;
  topic: Topic;
  commentText: string;
  createdAt: Date;
}
