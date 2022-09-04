import {useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

export default function Layout() {
    const userContext = useContext(UserContext);
    const user = userContext.user;
    return <>
        <header className="m-3 container">
            <p>Meeting App</p>
            <p>Hello: {user?.username ?? "Guest"}</p>
        </header>
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Pricing</Link>
                        </li>
                        {user === undefined &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
        <main className="m-4">
            <Outlet />
        </main>
    </>
}