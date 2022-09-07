import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
dotenv.config();

import sequelize from "./configs/db.config";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
  origin: "http://localhost:8000",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Well done!");
});

// app.get("/api", (req, res) => {
//   res.send("Well done!");
// });
import TokenRouter from "./routes/token";
app.use("/api/token", TokenRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(3000, () => {
  console.log(`The application is listening on http://localhost:${PORT}`);
});
