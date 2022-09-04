import AddNewTopic from "../components/topics-page/AddNewTopic";
import TopicsList from "../components/topics-page/TopicsList";
import {Helmet} from "react-helmet-async";

import "./TopicsPage.css";
export default function TopicsPage() {

    return <>
        <Helmet>
            <title>Topics page</title>
        </Helmet>

        <section id="topics">
            <h4>Topics</h4>
            <TopicsList />
            <div id="addNewTopic">
                <AddNewTopic />
            </div>
        </section>
    </>
};