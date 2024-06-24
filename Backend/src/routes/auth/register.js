import express from "express";
import { registerUser } from "../../controllers/auth/register.js";

const router = express.Router();

// register
router.post("/", registerUser);

export default router;
