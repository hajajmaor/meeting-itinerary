import axios from "axios";
import {useState, FormEvent, useContext} from "react";
import {HostPlusPort} from "../../../consts";
import {UserContext} from "../../../contexts/UserContext";

export default function AddNewTopic(props: {setUpdateRequired: (updateRequired: boolean) => void}) {

    const [topicText, setTopicText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const user = useContext(UserContext).user;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const headers = {'Authorization': 'JWT ' + user?.access_token};
        axios.post(HostPlusPort + "/api/topics/", {topicText: topicText}, {headers: headers}).then(
            (response) => {
                setTopicText("");
                setError("");
                props.setUpdateRequired(true);
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
            <label htmlFor="topic" className="form-label">Topic:</label>
            <input type="text" value={topicText} onChange={(event) => setTopicText(event.target.value)} id="topic" />
            <button type="submit">Add</button>
        </form>
    </>
}