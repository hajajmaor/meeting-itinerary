export enum Role {
  Admin = "Admin",
  User = "User",
}
export default interface IUser {
  username: string;
  access_token: string;
  role: Role;
  refresh_token: string;
}
