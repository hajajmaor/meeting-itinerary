import {useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";
import './layout.css'

export default function Layout(props: {logOutfunc: () => void}) {
    const userContext = useContext(UserContext);
    const user = userContext.user;
    return <>
        <header className="my-3 container m-auto">
            <div className="row">
                <h3 className="col-md-3">Meeting App</h3>
                <p className="col-md">Hello: {user?.username ?? "Guest"}</p>
                {user && <button className="btn btn-primary col-md-2" onClick={props.logOutfunc}>Log out</button>}
            </div>
        </header>
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    {/* https://www.flaticon.com/free-icon/meeting_115918 */}
                    <img src="/images/meeting.png" className="brand-sm" alt="meeting icon" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/topics">Topics</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="#">Pricing</Link>
                        </li> */}
                        {user === undefined &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav><hr />
        <main className="m-4">
            <Outlet />
        </main>
        <hr />
        <footer className="container my-3">
            <a href="https://www.flaticon.com/free-icons/meeting" title="meeting icons">Meeting icons created by Freepik - Flaticon</a>
        </footer>
    </>
}

