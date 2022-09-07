import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Well done!");
});

app.get("/api", (req, res) => {
  res.send("Well done!");
});

app.listen(3000, () => {
  console.log(`The application is listening on http://localhost:${PORT}`);
});
