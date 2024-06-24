import { Router } from "express";
import animalController from "../controllers/dierenController.js";
import authorize from "../middlewares/auth.js";

const animalRoute = Router();

animalRoute.post(
  "/createAnimal",
  authorize(["admin"]),
  animalController.createAnimal
);
animalRoute.get(
  "/getAnimal",
  authorize(["admin", "customer"]),
  animalController.getAnimal
);
animalRoute.get(
  "/getOneAnimal/:id",
  authorize(["admin", "customer"]),
  animalController.getOneAnimal
);
animalRoute.delete(
  "/deleteAnimal/:id",
  authorize(["admin"]),
  animalController.deleteAnimal
);
animalRoute.patch(
  "/updateAnimal/:id",
  authorize(["admin"]),
  animalController.updateAnimal
);

export default animalRoute;
