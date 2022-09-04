import {useEffect, useState} from "react";

import {UserContext} from "./contexts/UserContext";
import IUser from "./models/User.Interface";

function App() {

  const [user, setUser] = useState<IUser | undefined>(undefined);

  // update the user context
  const updateUser = (user: IUser) => {
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


  return (
    <UserContext.Provider value={{user, update: updateUser}}>
      <div>Hello World!</div>
    </UserContext.Provider>
  );
}

export default App;
