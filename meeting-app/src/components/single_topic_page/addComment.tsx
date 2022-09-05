import axios from "axios";
import {useContext, useState} from "react";
import {HostPlusPort} from "../../consts";
import {UserContext} from "../../contexts/UserContext";

export default function AddComment(props: {id: number | string, setUpdateRequired: (value: boolean) => void}) {
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState("");
    const user = useContext(UserContext).user;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "JWT " + user?.access_token
    }
    const addComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (process.env.NODE_ENV === "development") {
            console.log("AddComment: onSubmit");
        }
        axios.post(HostPlusPort + "/api/topic_comments/", {commentText: commentText, topic: props.id}, {headers: headers}).then(
            (response) => {
                if (process.env.NODE_ENV === "development") {
                    console.log("AddComment: response", response);
                }
                setCommentText("");
                props.setUpdateRequired(true);
            }).catch((error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log("AddComment: error", error);
                }
                setError(error.message);
            });
    }



    // form with single field+label for comment text + submit btn using bootstrap 5
    return (
        <>
            <form className="row g-3" onSubmit={addComment}>
                <div className="col-auto">
                    <label htmlFor="commentText" className="visually-hidden">
                        Comment text
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="commentText"
                        placeholder="Comment text"
                        value={commentText}
                        minLength={4}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">
                        Add comment
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                </div>

            </form>
        </>
    );
}
