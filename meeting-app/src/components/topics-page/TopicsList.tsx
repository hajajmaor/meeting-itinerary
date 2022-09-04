import axios from "axios";
import {useEffect, useState} from "react";
import {HostPlusPort} from "../../consts";

export interface ITopic {
    id: number;
    topicText: string;
    createdAt: Date;
}

export default function TopicsList() {

    const [topics, setTopics] = useState<ITopic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("TopicsList: useEffect");
        }
        setLoading(true);
        setTopics([]);
        axios.get(HostPlusPort + "/api/topics").then(
            (response) => {
                setTopics(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        ).catch(
            (error) => {
                setError(error.message);
            }
        ).finally(
            () => {
                setLoading(false);
            }
        )
    }, []);



    return <div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <ul>
            {topics.map((topic) => {
                return <li key={topic.id}>{topic.topicText}</li>
            })}
        </ul>
    </div>
}