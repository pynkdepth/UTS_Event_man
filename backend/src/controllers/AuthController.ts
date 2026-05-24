import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    res.status(401).json({ message: "Invalid credential" });
    return;
  }
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  res.json({ token });
};
