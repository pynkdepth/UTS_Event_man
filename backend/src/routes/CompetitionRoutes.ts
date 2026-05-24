import express from "express";
import { registComp } from "../controllers/CompetitionController";

const router = express.Router();

router.post("/regist", registComp);

export default router;