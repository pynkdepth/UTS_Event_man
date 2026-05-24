import express from "express";
import { loginWithNim } from "../controllers/NimAuthController";

const router = express.Router();

router.post("/nim-login", loginWithNim);

export default router;

