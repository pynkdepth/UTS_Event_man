import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  admin?: { id: number; email: string };
}

export const authAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const hdr = req.headers.authorization;
  if (!hdr) return res.status(401).json({ message: "No token" });

  const token = hdr.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.admin = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};