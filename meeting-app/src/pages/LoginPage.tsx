import axios from "axios";
import jwtDecode from "jwt-decode";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HostPlusPort} from "../consts";
import {UserContext} from "../contexts/UserContext";
import User from "../models/User.Interface";

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    interface ILogin200 {
        token_type: string;
        role: string;
        user_id: number;
    }

    const onsubmit = (e: any) => {
        e.preventDefault();
        axios.post(HostPlusPort + "/api/token/", {username, password}).then(
            (response) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(response.data);
                }
                const refresh_token = response.data.refresh;
                const access_token = response.data.access;
                const decoded = jwtDecode<ILogin200>(access_token)
                console.log(decoded);

                const user: User = new User(username, access_token, refresh_token);

                userContext.update(user);
                navigate("/", {replace: true})
            }
        ).catch(
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                }
                setError("Invalid username or password");
            }
        )
    }


    return <form onSubmit={onsubmit} className="container">
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" minLength={process.env.NODE_ENV === 'production' ? 8 : 3} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3 row">
            <button type="submit" className="btn btn-primary col mx-2">Submit</button>
            <button type="reset" className="btn btn-secondary col mx-2">Reset</button>
        </div>
        {error && <h5>{error}</h5>}
    </form>
}