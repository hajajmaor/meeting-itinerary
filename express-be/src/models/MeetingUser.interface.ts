import { DataTypes, FindOptions, Model } from "sequelize";
// import hash function to use with secrete key
import bcrypt from "bcrypt";
import sequelize from "../configs/db.config";
import Role from "./Role.interface";

export interface IMeetingUser {
  id: number;
  role: Role;
  username: string;
}

export default class MeetingUserModel extends Model implements IMeetingUser {
  generateToken() {
    // TODO: implement token generation with access and refresh tokens
    throw new Error("Method not implemented.");
  }
  declare id: number;
  declare role: Role;
  declare username: string;
  declare password: string;
  declare salt: string;

  public getName(): string {
    return this.username;
  }

  private static async getSaltByUserName(
    username: String
  ): Promise<string | undefined> {
    const user = await MeetingUserModel.findOne({
      where: {
        username,
      },
    });
    return user?.salt;
  }

  static async generateSalt(): Promise<string> {
    return bcrypt.genSalt(10);
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    const passwordWithSecret = password + process.env.SECRET_KEY;
    return bcrypt.hash(passwordWithSecret, salt);
  }

  static async checkForOneUser(
    username: string,
    password: string
  ): Promise<MeetingUserModel | null> {
    const salt = await MeetingUserModel.getSaltByUserName(username);
    if (salt) {
      const hashedPassword = await MeetingUserModel.hashPassword(
        password,
        salt
      );
      const user = await MeetingUserModel.findOne({
        where: {
          username,
          password: hashedPassword,
        },
      });
      return user;
    }
    return null;
  }

  public toMap(): IMeetingUser {
    const { id, role, username } = this;
    return { id, role, username };
  }
}

MeetingUserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: [Role.ADMIN, Role.USER],
      defaultValue: Role.USER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    freezeTableName: true,
    modelName: "express_meetinguser",
    timestamps: true,
    // I don't want createdAt
    createdAt: false,
    hooks: {
      beforeCreate: async (user) => {
        user.salt = await MeetingUserModel.generateSalt();
        user.password = await MeetingUserModel.hashPassword(
          user.password,
          user.salt
        );
      },
    },
  }
);
MeetingUserModel.create(
  {
    username: "admin",
    password: "admin",
    role: Role.ADMIN,
    salt: "salt",
  },
  {
    ignoreDuplicates: true,
  }
);

MeetingUserModel.sync({ alter: true, force: true });
