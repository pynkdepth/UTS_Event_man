import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

// Task requirement: manual login menggunakan NIM + Password.
// Karena tabel Admin saat ini menyimpan (email, password), kita
// map NIM -> admin email secara fixed dan validasi password pakai bcrypt.
const ADMIN_NIM = "24090034";

// WARNING: Password Admin di DB kemungkinan sudah HASH.
// Endpoint ini tetap membandingkan dengan bcrypt.
// Untuk kompatibilitas, client mengirim { nim, password }.
export const loginWithNim = async (req: Request, res: Response): Promise<void> => {
  const { nim, password } = req.body as { nim?: string; password?: string };

  if (!nim || !password) {
    res.status(400).json({ message: "nim and password are required" });
    return;
  }

  // Validasi NIM (sesuai task)
  if (String(nim) !== ADMIN_NIM) {
    res.status(401).json({ message: "Invalid credential" });
    return;
  }

  // Ambil admin berdasarkan NIM agar tidak salah mengambil row admin lain.
  const admin = await prisma.admin.findUnique({ where: { nim: ADMIN_NIM } });
  if (!admin) {
    res.status(503).json({ message: "Admin not configured" });
    return;
  }

  // Password di DB bisa berupa bcrypt hash atau plaintext (tergantung kondisi seed/migrasi).
  // Lakukan fallback supaya login NIM + password sesuai task bisa berhasil.
  const okBcrypt = await bcrypt.compare(password, admin.password).catch(() => false);
  const okPlain = admin.password === password;

  if (!okBcrypt && !okPlain) {
    res.status(401).json({ message: "Invalid credential" });
    return;
  }


  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

