import express from "express";
import {
  getUsers,
  signin,
  signout,
  signup,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/signup", getUsers);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;
