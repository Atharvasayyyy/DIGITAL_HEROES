import express from "express";

import { protect } from "../middleware/authMiddleware";

import {
  addNote,
  getNotes,
} from "../controllers/noteController";

const router = express.Router();

router.post("/:id", protect, addNote);

router.get("/:id", protect, getNotes);

export default router;