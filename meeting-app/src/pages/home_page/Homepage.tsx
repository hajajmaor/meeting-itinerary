import {Helmet} from "react-helmet-async";

export default function Homepage() {
    return (<>
        <Helmet>
            <title>Meeting App - Homepage</title>
        </Helmet>
        <div>
            <h4>Meeting app</h4>
            <p>Welcome to 'Meeting App' developed by <a href="https://www.linkedin.com/in/maor-meir-hajaj/">Maor Meir Hajaj</a>
            </p>
            <p>This is simple app to demonstrate abilities (and learning) <a href="https://reactjs.org/">React.js</a> & <a href="https://www.djangoproject.com/">Django</a></p>
        </div>
    </>
    );
}