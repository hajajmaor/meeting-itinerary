import { ITopicComment } from "./TopicComment.interface";

export default interface ITopic {
  id: number;
  topicText: string;
  createdAt: Date;
  comments: ITopicComment[];
}
