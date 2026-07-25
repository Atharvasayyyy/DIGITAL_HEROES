import { Request, Response } from "express";
import Lead from "../models/Lead";
import User from "../models/User";
import { logActivity } from "../utils/activityLogger";
import { canMoveStatus } from "../utils/statusTransition";
import { AuthRequest } from "../middleware/authMiddleware";

export const updateLeadStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    if (!canMoveStatus(lead.status, status)) {
      return res.status(400).json({
        message: "Invalid status transition",
      });
    }

    const previous = lead.status;

    lead.status = status;

    await lead.save();

    await logActivity(
      lead._id.toString(),
      req.user.id,
      "STATUS_CHANGED",
      `${previous} → ${status}`
    );

    res.json(lead);

  } catch {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch {
    res.status(500).json({
      message: "Unable to create lead",
    });
  }
};


export const getLeads = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = String(req.query.sortBy || "createdAt");
  const sortOrder = String(req.query.sortOrder || "desc");

  const filter: any = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.assignedTo) {
    filter.assignedTo = req.query.assignedTo;
  }

  const allowedSortFields = [
    "name",
    "email",
    "company",
    "status",
    "createdAt",
  ];
  const sortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const sortOptions: any = {
    [sortField]: sortDirection,
  };

  const leads = await Lead.find(filter)
    .populate("assignedTo", "name email")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sortOptions);

  const total = await Lead.countDocuments(filter);

  res.json({
    page,
    total,
    totalPages: Math.ceil(total / limit),
    leads,
  });
};


export const getLead = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id)
    .populate("assignedTo", "name email");

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  res.json(lead);
};


export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    // Authorization check: members can only update leads assigned to them
    if (
      req.user.role === "member" &&
      lead.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update leads assigned to you",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const deleteLead = async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  res.json({
    message: "Lead deleted successfully",
  });
};

export const assignLead = async (req: AuthRequest, res: Response) => {
  try {
    const { assignedTo } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const member = await User.findById(assignedTo);

    if (!member) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (member.role !== "member") {
      return res.status(400).json({
        message: "Lead can only be assigned to a member",
      });
    }

    lead.assignedTo = member._id;

    await lead.save();

    await logActivity(
      lead._id.toString(),
      req.user.id,
      "LEAD_ASSIGNED",
      `Assigned to ${member.name}`
    );

    res.json(lead);

  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
