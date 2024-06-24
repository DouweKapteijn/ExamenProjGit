import express from "express";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.js";
import authorize from "../middlewares/auth.js";

// Create a new router (endpoints)
const router = express.Router();

// Create
router.post("/", authorize(["admin"]), createProduct);

// Get all
router.get("/:merk/:variant", authorize(["admin", "customer"]), getProducts);

// Get by id
router.get("/:id", authorize(["admin"]), getProduct);

// Update one
router.patch("/:id", authorize(["admin"]), updateProduct);

// Delete one
router.delete("/:id", authorize(["admin"]), deleteProduct);

export default router;
