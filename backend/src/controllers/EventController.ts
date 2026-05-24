import { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../utils/prisma";
import { uploadBuffer } from "../services/cloudinary";

const upload = multer({ storage: multer.memoryStorage() });
const uploadFields = upload.fields([
  { name: "payment", maxCount: 1 },
  { name: "igFollow", maxCount: 1 },
  { name: "idCard", maxCount: 1 }, 
]);

/* ~~~~~~~~~~ SEMINAR ~~~~~~~~~~ */
export const registSeminar = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, fullName, category, whatsapp, institution, idNumber } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Upload semua file ke Cloudinary
      const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
      const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer)).secure_url;
      const idCardUrl = files.idCard ? (await uploadBuffer(files.idCard[0].buffer)).secure_url : null;

      const data = await prisma.seminarRegistration.create({
        data: {
          email,
          fullName,
          category,
          whatsapp,
          institution,
          idNumber: idNumber || null,
          paymentUrl,
          igFollowUrl,
          idCardUrl,
          verified: false, // Default belum terverifikasi
        },
      });
      res.json({ message: "Seminar registered", data });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
];

/* ~~~~~~~~~~ WORKSHOP ~~~~~~~~~~ */
export const registWorkshop = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, fullName, workshop, category, whatsapp, institution, idNumber } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
      const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer)).secure_url;
      const idCardUrl = files.idCard ? (await uploadBuffer(files.idCard[0].buffer)).secure_url : null;

      const data = await prisma.workshopRegistration.create({
        data: {
          email,
          fullName,
          workshop,
          category,
          whatsapp,
          institution,
          idNumber: idNumber || null,
          paymentUrl,
          igFollowUrl,
          idCardUrl,
          verified: false,
        },
      });
      res.json({ message: "Workshop registered", data });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
];

/* ~~~~~~~~~~ TALKSHOW ~~~~~~~~~~ */
export const registTalkshow = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, fullName, category, whatsapp, institution, idNumber } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
      const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer)).secure_url;
      const idCardUrl = files.idCard ? (await uploadBuffer(files.idCard[0].buffer)).secure_url : null;

      const data = await prisma.talkshowRegistration.create({
        data: {
          email,
          fullName,
          category,
          whatsapp,
          institution,
          idNumber: idNumber || null,
          paymentUrl,
          igFollowUrl,
          idCardUrl,
          verified: false,
        },
      });
      res.json({ message: "Talkshow registered", data });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
];