import { Request, Response, NextFunction } from "express";

export function adminOnly(
  req: any,
  res: Response,
  next: NextFunction
): any {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
}