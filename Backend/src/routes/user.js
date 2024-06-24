import express from "express";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    anonymizeUser,
} from "../controllers/user.js";
import authorize from "../middlewares/auth.js";

// Create a new router (endpoints)
const router = express.Router();

// Get all
router.get("/", authorize(["admin"]), getUsers);

// Get by id
router.get("/:id", authorize(["admin", "customer"]), getUser);

// Update one
router.patch("/:id", authorize(["admin", "customer"]), updateUser);

// Anonymize one
router.patch("/anonymize/:id", authorize(["admin", "customer"]), anonymizeUser);

// Delete one
router.delete("/:id", authorize(["admin", "customer"]), deleteUser);

export default router;
