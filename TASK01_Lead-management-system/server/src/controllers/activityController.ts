import { Response } from "express";
import Activity from "../models/Activity";
import { AuthRequest } from "../middleware/authMiddleware";

export const getActivities = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const activities = await Activity.find({
      lead: req.params.id,
    })
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
