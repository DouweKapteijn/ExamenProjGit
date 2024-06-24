import { Router } from "express";
import merkenController from "../controllers/merkenController.js";
import authorize from "../middlewares/auth.js";

const merkenRoute = Router();

merkenRoute.post(
  "/createMerk",
  authorize(["admin"]),
  merkenController.createMerk
);
merkenRoute.get(
  "/getMerk/:id",
  authorize(["admin", "customer"]),
  merkenController.getMerk
);
merkenRoute.get(
  "/getOneMerk/:id",
  authorize(["admin", "customer"]),
  merkenController.getOneMerk
);
merkenRoute.patch(
  "/updateMerk/:id",
  authorize(["admin"]),
  merkenController.updateMerk
);
merkenRoute.delete(
  "/deleteMerk/:id",
  authorize(["admin"]),
  merkenController.deleteMerk
);

export default merkenRoute;
