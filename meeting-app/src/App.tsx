import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async';
import Layout from "./components/Layout";

import {UserContext} from "./contexts/UserContext";
import IUser from "./models/User.Interface";
import LoginPage from "./pages/LoginPage";

import './App.css'
import TopicsPage from "./pages/TopicsPage";


function App() {

  const [user, setUser] = useState<IUser | undefined>(undefined);

  // update the user context
  const updateUser = (user: IUser) => {
    if (process.env.NODE_ENV === "development") {
      console.log("updating user to", user);
    }
    setUser(user);
  };

  // save the user to local storage if it's defined
  useEffect(() => {
    if (user !== undefined) {localStorage.setItem("user", JSON.stringify(user));}
    return () => {
      localStorage.removeItem("user");
    };
  }, [user]);

  // get the user data from local storage
  // if undefined, set the user to undefined
  // if defined, set the user to the parsed user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    }
  }, []);



  const getRoutesIfNotLoggedIn = () => {
    return <></>;
  }


  const getRoutesIfLoggedIn = () => {

    return <>
      <Route path="/login" element={<LoginPage />} />
    </>
  }


  const getRoutes = () => {
    let routes = <>
      <Route path="/topics" element={<TopicsPage />} />
    </>;
    if (user === undefined) {
      return <>
        {routes}
        {getRoutesIfLoggedIn()}
      </>;
    }
    else return <>
      {routes}
      {getRoutesIfNotLoggedIn()}
    </>;
  }





  return (
    <BrowserRouter>
      <HelmetProvider>
        <UserContext.Provider value={{user, update: updateUser}}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {getRoutes()}
            </Route>

          </Routes>
        </UserContext.Provider>
      </HelmetProvider>

    </BrowserRouter>
  );
}

export default App;
