import express from "express";
import { authAdmin } from "../middlewares/authAdmin";
import {
  listParticipants,
  listSeminar,
  listWorkshop,
  listTalkshow,
  listCompetition,
  getDashboardStats,
  // Import fungsi baru
  deleteSeminar,
  verifySeminar,
  deleteWorkshop,
  verifyWorkshop,
  deleteTalkshow,
  verifyTalkshow,
} from "../controllers/AdminController";

const router = express.Router();
router.use(authAdmin as any);

router.get("/participants", listParticipants);
router.get("/seminar", listSeminar);
router.get("/workshop", listWorkshop);
router.get("/talkshow", listTalkshow);
router.get("/competition/:competition", listCompetition);
router.get("/dashboard", getDashboardStats);

// New action routes
router.delete("/seminar/:id", deleteSeminar);
router.patch("/seminar/:id/verify", verifySeminar);

router.delete("/workshop/:id", deleteWorkshop);
router.patch("/workshop/:id/verify", verifyWorkshop);

router.delete("/talkshow/:id", deleteTalkshow);
router.patch("/talkshow/:id/verify", verifyTalkshow);

export default router;
