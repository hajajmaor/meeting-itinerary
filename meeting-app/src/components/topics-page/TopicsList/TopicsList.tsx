import {Link} from "react-router-dom";
import ITopic from "../../../models/Topic.interface";
import './TopicsList.css'
export default function TopicsList(props: {topics: ITopic[]}) {
    const {topics, } = props;

    return <div>

        <ul>
            {topics.map((topic) => {
                return <li key={topic.id} className="topic-text">
                    <Link to={"/topics/" + topic.id} >
                        {topic.topicText}</Link>
                    <ul >
                        {topic.comments.map((comment) => {
                            return <li key={comment.id} className="comment-text">

                                {comment.commentText}
                            </li>
                        })}
                    </ul>
                </li>
            })}
        </ul>
    </div>
}