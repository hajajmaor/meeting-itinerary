import {Helmet} from "react-helmet-async";

import "./TopicsPage.css";
import {useEffect, useState} from "react";
import axios from "axios";
import AddNewTopic from "../../components/topics-page/add-new-topic/AddNewTopic";
import TopicsList from "../../components/topics-page/TopicsList/TopicsList";
import {HostPlusPort} from "../../consts";
import ITopic from "../../models/Topic.interface";
export default function TopicsPage() {
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [updateRequired, setUpdateRequired] = useState<boolean>(false);



    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("TopicsList: useEffect");
            console.log("TopicsList: updateRequired: " + updateRequired);

        }
        if (!updateRequired && topics.length > 0) return;
        if (updateRequired) {setTopics([]);}

        setLoading(true);
        axios
            .get(HostPlusPort + "/api/topics")
            .then((response) => {
                setTopics(response.data);
                setUpdateRequired(false);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateRequired]);

    return (
        <>
            <Helmet>
                <title>Topics page</title>
            </Helmet>

            <section id="topics">
                <h4>Topics</h4>
                <>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <TopicsList topics={topics} />
                </>
                <div id="addNewTopic mt-3">
                    <AddNewTopic setUpdateRequired={setUpdateRequired} />
                </div>
            </section>
        </>
    );
}
