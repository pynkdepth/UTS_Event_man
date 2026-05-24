import express from "express";
import { registSeminar, registWorkshop, registTalkshow } from "../controllers/EventController";

const router = express.Router();

router.post("/seminar",    registSeminar);
router.post("/workshop",   registWorkshop);
router.post("/talkshow",   registTalkshow);

export default router;