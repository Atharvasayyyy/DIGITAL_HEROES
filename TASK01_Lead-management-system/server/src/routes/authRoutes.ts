import express from "express";

import {
  login,
  register,
  getUsers,
  createUser,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", protect, adminOnly, getUsers);
router.post("/users", protect, adminOnly, createUser);

export default router;