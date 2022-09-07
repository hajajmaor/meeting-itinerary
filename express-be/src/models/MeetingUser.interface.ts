// class MeetingUser(AbstractUser):
//      role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)

import Role from "./Role.interface";

export interface MeetingUser {
  id: number;
  role: Role;
  userName: string;
  password: string;
}
