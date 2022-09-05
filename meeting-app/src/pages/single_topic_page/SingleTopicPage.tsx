import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useParams} from "react-router-dom";
import AddComment from "../../components/single_topic_page/addComment";
import {HostPlusPort} from "../../consts";
import {UserContext} from "../../contexts/UserContext";
import ITopic from "../../models/Topic.interface";
import {Role} from "../../models/User.Interface";

export default function SingleTopicPage() {
    const {id} = useParams();

    const user = useContext(UserContext).user;

    const [updateRequired, setUpdateRequired] = useState<boolean>(false);
    const [topic, setTopic] = useState<ITopic | undefined>(undefined);

    useEffect(() => {
        if (topic === undefined || updateRequired)
            axios.get(HostPlusPort + "/api/topics/" + id).then(
                (response) => {
                    setTopic(response.data);
                    setUpdateRequired(false);
                }
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, updateRequired])



    return <>
        <Helmet>
            <title>Topic - {topic?.topicText ?? "page"}</title>
        </Helmet>
        <h3>{topic && topic?.topicText}</h3>
        <p>{topic && topic?.createdAt.toString()}</p>

        <ul>
            {topic && topic?.comments.map((comment) => {
                return <li key={comment.id}>{comment.commentText}</li>
            })}
        </ul>
        {id && topic && user?.role === Role.Admin &&
            <AddComment id={id} setUpdateRequired={setUpdateRequired} />
        }
    </>
}