import express from "express";

import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  assignLead,
  updateLeadStatus,
} from "../controllers/leadController";

import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/roleMiddleware";

const router = express.Router();

// Public
router.post("/public", createLead);

// Protected
router.get("/", protect, getLeads);

router.get("/:id", protect, getLead);

router.put("/:id", protect, adminOnly, updateLead);

// Admin only
router.delete("/:id", protect, adminOnly, deleteLead);

router.patch(
  "/:id/assign",
  protect,
  adminOnly,
  assignLead
);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateLeadStatus
);



export default router;