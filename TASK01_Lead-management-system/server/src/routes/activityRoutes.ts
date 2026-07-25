import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import { getActivities } from "../controllers/activityController";


router.get("/:id", protect, getActivities);

export default router;