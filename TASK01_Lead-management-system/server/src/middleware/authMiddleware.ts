import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export function protect(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}