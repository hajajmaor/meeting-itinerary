import { Sequelize } from "sequelize";

const DATABASE = process.env.MYSQL_DATABASE;
// const DATABASE = "127.0.0.1";
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
// const HOST = process.env.MYSQL_HOST;
const HOST = process.env.DEBUG ? "localhost" : process.env.MYSQL_HOST;

// console.log(DATABASE, USER, PASSWORD, HOST);

const sequelize = new Sequelize(DATABASE!, USER!, PASSWORD, {
  host: HOST,
  port: 3306,
  dialect: "mysql",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
