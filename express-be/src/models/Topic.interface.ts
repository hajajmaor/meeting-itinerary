// class Topic(models.Model):
// topicText = models.CharField(max_length=255, blank=False, null=False, unique=True)
// createdAt = models.DateTimeField(auto_now_add=True)

export interface Topic {
  id: number;
  topicText: string;
  createdAt: Date;
}
