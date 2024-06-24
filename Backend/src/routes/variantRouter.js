import { Router } from "express";
import variantController from "../controllers/variantController.js";
import authorize from "../middlewares/auth.js";

const variantRoute = Router();

variantRoute.post(
  "/createVariant",
  authorize(["admin"]),
  variantController.createVariant
);
variantRoute.get(
  "/getVariant",
  authorize(["admin", "customer"]),
  variantController.getVariant
);
variantRoute.delete(
  "/deleteVariant/:id",
  authorize(["admin"]),
  variantController.deleteVariant
);
variantRoute.patch(
  "/updateVariant/:id",
  authorize(["admin"]),
  variantController.updateVariant
);

export default variantRoute;
