import axios from "axios";
import {useState, FormEvent} from "react";
import {HostPlusPort} from "../../consts";

export default function AddNewTopic() {

    const [topicText, setTopicText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        axios.post(HostPlusPort + "/api/topics/", {topicText: topicText}).then(
            (response) => {
                setTopicText("");
                setError("");
            }
        ).catch(
            (error) => {
                if (error.response.data.topicText)
                    setError(error.response.data.topicText);
                else setError(error.message);
            }
        ).finally(
            () => {
                setLoading(false);
            }
        )
    }

    return <>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="topic">Topic:</label>
            <input type="text" value={topicText} onChange={(event) => setTopicText(event.target.value)} id="topic" />
            <button type="submit">Add</button>
        </form>
    </>
}