import { Response } from "express";

import Note from "../models/Note";
import { AuthRequest } from "../middleware/authMiddleware";
import { logActivity } from "../utils/activityLogger";

export const addNote = async (
  req: AuthRequest,
  res: Response
) => {
  const note = await Note.create({
    lead: req.params.id,
    author: req.user.id,
    content: req.body.content,
  });

  await logActivity(
    req.params.id,
    req.user.id,
    "NOTE_ADDED",
    req.body.content
  );

  res.status(201).json(note);
};



export const getNotes = async (
  req: AuthRequest,
  res: Response
) => {
  const notes = await Note.find({
    lead: req.params.id,
  })
    .populate("author", "name")
    .sort({
      createdAt: -1,
    });

  res.json(notes);
};