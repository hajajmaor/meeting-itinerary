import axios from "axios";
import { HostPlusPort } from "../consts";

export enum Role {
  Admin = "admin",
  User = "user",
}
export interface IUser {
  username: string;
  access_token: string;
  role: Role;
  refresh_token: string;
}

export default class User implements IUser {
  static fromIUser(user: IUser): User {
    return new User(user.username, user.access_token, user.refresh_token);
  }
  username: string;
  access_token: string;
  role: Role;
  refresh_token: string;
  constructor(
    username: string,
    access_token: string,
    refresh_token: string,
    role?: Role
  ) {
    this.username = username;
    this.access_token = access_token;
    this.role = role ?? Role.User;
    this.refresh_token = refresh_token;
    this.updateRole();
  }

  public updateRole() {
    const headers = {
      Authorization: `JWT ${this.access_token}`,
    };
    axios
      .get(HostPlusPort + "/api/roles", { headers: headers })
      .then((response) => {
        this.role = response.data[0].role;
      })
      .catch((error) => console.log(error));
  }
}
