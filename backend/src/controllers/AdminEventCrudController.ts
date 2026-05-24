import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

const toInt = (v: unknown) => {
  const n = typeof v === "string" ? Number(v) : Number(v);
  if (!Number.isFinite(n)) throw new Error("Invalid number");
  return n;
};

// -------------------- CategoryEvent --------------------
export const listCategoryEvents = async (_: Request, res: Response) => {
  const data = await prisma.categoryEvent.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
};

export const createCategoryEvent = async (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };
  if (!name || !name.trim()) {
    res.status(400).json({ message: "name is required" });
    return;
  }

  const data = await prisma.categoryEvent.create({
    data: { name: name.trim() },
  });
  res.json({ message: "CategoryEvent created", data });
};

export const updateCategoryEvent = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    const { name } = req.body as { name?: string };
    if (!name || !name.trim()) {
      res.status(400).json({ message: "name is required" });
      return;
    }

    const data = await prisma.categoryEvent.update({
      where: { id },
      data: { name: name.trim() },
    });
    res.json({ message: "CategoryEvent updated", data });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Update failed" });
  }
};

export const deleteCategoryEvent = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    await prisma.categoryEvent.delete({ where: { id } });
    res.json({ message: "CategoryEvent deleted" });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Delete failed" });
  }
};

// -------------------- Pembicara --------------------
export const listPembicara = async (_: Request, res: Response) => {
  const data = await prisma.pembicara.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
};

export const createPembicara = async (req: Request, res: Response) => {
  const { nama, jabatan, fotoUrl, bio } = req.body as {
    nama?: string;
    jabatan?: string;
    fotoUrl?: string;
    bio?: string;
  };

  if (!nama || !nama.trim()) {
    res.status(400).json({ message: "nama is required" });
    return;
  }

  const data = await prisma.pembicara.create({
    data: {
      nama: nama.trim(),
      jabatan: jabatan?.trim() || null,
      fotoUrl: fotoUrl?.trim() || null,
      bio: bio?.trim() || null,
    },
  });
  res.json({ message: "Pembicara created", data });
};

export const updatePembicara = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    const { nama, jabatan, fotoUrl, bio } = req.body as {
      nama?: string;
      jabatan?: string;
      fotoUrl?: string;
      bio?: string;
    };

    if (!nama || !nama.trim()) {
      res.status(400).json({ message: "nama is required" });
      return;
    }

    const data = await prisma.pembicara.update({
      where: { id },
      data: {
        nama: nama.trim(),
        jabatan: jabatan?.trim() || null,
        fotoUrl: fotoUrl?.trim() || null,
        bio: bio?.trim() || null,
      },
    });

    res.json({ message: "Pembicara updated", data });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Update failed" });
  }
};

export const deletePembicara = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    await prisma.pembicara.delete({ where: { id } });
    res.json({ message: "Pembicara deleted" });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Delete failed" });
  }
};

// -------------------- Event --------------------
export const listEvents = async (_: Request, res: Response) => {
  const data = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categoryEvent: true,
      pembicara: true,
    },
  });
  res.json(data);
};

export const createEvent = async (req: Request, res: Response) => {
  const {
    judul,
    deskripsi,
    tanggalWaktu,
    lokasi,
    categoryEventId,
    pembicaraId,
  } = req.body as {
    judul?: string;
    deskripsi?: string;
    tanggalWaktu?: string;
    lokasi?: string;
    categoryEventId?: number | string;
    pembicaraId?: number | string;
  };

  if (!judul || !judul.trim()) {
    res.status(400).json({ message: "judul is required" });
    return;
  }

  if (categoryEventId === undefined || pembicaraId === undefined) {
    res.status(400).json({ message: "categoryEventId and pembicaraId are required" });
    return;
  }

  const data = await prisma.event.create({
    data: {
      judul: judul.trim(),
      deskripsi: deskripsi?.trim() || null,
      tanggalWaktu: tanggalWaktu ? new Date(tanggalWaktu) : null,
      lokasi: lokasi?.trim() || null,
      categoryEventId: toInt(categoryEventId),
      pembicaraId: toInt(pembicaraId),
    },
    include: { categoryEvent: true, pembicara: true },
  });

  res.json({ message: "Event created", data });
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    const {
      judul,
      deskripsi,
      tanggalWaktu,
      lokasi,
      categoryEventId,
      pembicaraId,
    } = req.body as {
      judul?: string;
      deskripsi?: string;
      tanggalWaktu?: string;
      lokasi?: string;
      categoryEventId?: number | string;
      pembicaraId?: number | string;
    };

    if (!judul || !judul.trim()) {
      res.status(400).json({ message: "judul is required" });
      return;
    }

    if (categoryEventId === undefined || pembicaraId === undefined) {
      res.status(400).json({ message: "categoryEventId and pembicaraId are required" });
      return;
    }

    const data = await prisma.event.update({
      where: { id },
      data: {
        judul: judul.trim(),
        deskripsi: deskripsi?.trim() || null,
        tanggalWaktu: tanggalWaktu ? new Date(tanggalWaktu) : null,
        lokasi: lokasi?.trim() || null,
        categoryEventId: toInt(categoryEventId),
        pembicaraId: toInt(pembicaraId),
      },
      include: { categoryEvent: true, pembicara: true },
    });

    res.json({ message: "Event updated", data });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Update failed" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = toInt(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event deleted" });
  } catch (e: any) {
    res.status(500).json({ message: e.message ?? "Delete failed" });
  }
};

