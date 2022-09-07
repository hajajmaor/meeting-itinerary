import { Router } from "express";
import MeetingUserModel from "../models/MeetingUser.interface";
const router = Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  MeetingUserModel.checkForOneUser(username, password)
    .then((user) => {
      if (user) {
        const token = user.generateToken();
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/verify", (req, res) => {});

router.post("/refresh", (req, res) => {});

export default router;
