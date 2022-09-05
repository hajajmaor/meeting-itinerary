import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import Layout from "./components/Layout";

import {UserContext} from "./contexts/UserContext";
import User, {IUser} from "./models/User.Interface";
import LoginPage from "./pages/LoginPage";

import "./App.css";
import axios from "axios";
import {HostPlusPort} from "./consts";
import TopicsPage from "./pages/topics_page/TopicsPage";
import SingleTopicPage from "./pages/single_topic_page/SingleTopicPage";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  // update the user context
  const updateUser = (user: IUser | undefined) => {
    if (process.env.NODE_ENV === "development") {
      console.log("updating user to", user);
    }
    if (user) {
      axios
        .post(HostPlusPort + "/api/token/verify/", {token: user.access_token})
        .then((_) => setUser(User.fromIUser(user)))
        .catch((_) => setUser(undefined));
    } else {
      setUser(user);
    }
  };

  const logOut = () => {
    updateUser(undefined);
  };

  // save the user to local storage if it's defined
  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    return () => localStorage.removeItem("user");
  }, [user]);

  // get the user data from local storage
  // if undefined, set the user to undefined
  // if defined, set the user to the parsed user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) updateUser(JSON.parse(user));
  }, []);

  const getRoutesIfNotLoggedIn = () => {
    return (
      <>
        <Route path="/login" element={<LoginPage />} />
      </>
    );
  };

  const getRoutesIfLoggedIn = () => {
    return <></>;
  };

  const getRoutes = () => {
    let routes = (
      <>
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:id" element={<SingleTopicPage />} />
      </>
    );
    if (user === undefined) {
      return (
        <>
          {routes}
          {getRoutesIfNotLoggedIn()}
        </>
      );
    } else
      return (
        <>
          {routes}
          {getRoutesIfLoggedIn()}
        </>
      );
  };

  return (
    <BrowserRouter>
      <HelmetProvider>
        <UserContext.Provider value={{user, update: updateUser}}>
          <Routes>
            <Route path="/" element={<Layout logOutfunc={logOut} />}>
              {getRoutes()}
            </Route>
          </Routes>
        </UserContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
