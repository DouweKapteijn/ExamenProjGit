import express from "express";
import { loginUser } from "../../controllers/auth/login.js";

const router = express.Router();

// login
router.post("/", loginUser);

export default router;
