import { Router } from "express";
import rassenController from "../controllers/rassenController.js";
import authorize from "../middlewares/auth.js";

const rassenRoute = Router();

rassenRoute.post(
  "/createRas",
  authorize(["admin"]),
  rassenController.createRas
);
rassenRoute.get(
  "/getRas/:id",
  authorize(["admin", "customer"]),
  rassenController.getRas
);
rassenRoute.get(
  "/getOneRas/:id",
  authorize(["admin", "customer"]),
  rassenController.getOneRas
);
rassenRoute.patch(
  "/updateRas/:id",
  authorize(["admin"]),
  rassenController.updateRas
);
rassenRoute.delete(
  "/deleteRas/:id",
  authorize(["admin"]),
  rassenController.deleteRas
);

export default rassenRoute;
