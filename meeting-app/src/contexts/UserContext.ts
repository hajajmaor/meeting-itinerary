import React from "react";
import IUser from "../models/User.Interface";

interface IUserContext {
  user: IUser | undefined;
  update: (user: IUser) => void;
}

export const UserContext = React.createContext<IUserContext>({
  user: undefined,
  update: () => {},
});
