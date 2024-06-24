import { Router } from "express";
import petController from "../controllers/petsController.js";
import authorize from "../middlewares/auth.js";

const petsRoute = Router();

petsRoute.post(
  "/createPet",
  authorize(["admin", "customer"]),
  petController.createPet
);
petsRoute.get(
  "/getPets/:user_id",
  authorize(["admin", "customer"]),
  petController.getPets
);
petsRoute.get(
  "/getOnePet/:id/:user_id",
  authorize(["admin", "customer"]),
  petController.getOnePet
);
petsRoute.delete(
  "/deletePet/:id/:user_id",
  authorize(["admin", "customer"]),
  petController.deletePet
);
petsRoute.patch(
  "/updatePet/:id/:user_id",
  authorize(["admin", "customer"]),
  petController.updatePet
);

export default petsRoute;
