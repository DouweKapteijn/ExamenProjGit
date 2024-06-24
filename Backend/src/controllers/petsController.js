import Animal from "../models/dierenModel.js";
import Pet from "../models/petsModel.js";
import Ras from "../models/rassenModel.js";
import Product from "../models/product.js";

const petController = {
  // CreatePet
  //
  async createPet(req, res) {
    // Haalt ingevulde info op uit de body
    const { petName, birthDate, animalName, rasName, productName } = req.body;

    // Zet raceId en productId op null
    let existingRaceId = null;
    let existingProductId = null;
    try {
      // checkt of het ingevulde diersoort bestaat
      const existingAnimal = await Animal.findOne({ animalName: animalName });
      if (!existingAnimal) {
        return res.status(404).json({ message: "geen bestaand diersoort" });
      }
      // Kijkt of er een rasname is ingevuld en zo niet blijft de existingRaceId null
      if (rasName) {
        // Kijkt of het ingevulde rasname bestaat onder de ingevulde animal
        const existingRace = await Ras.findOne({
          rasName: rasName,
          animal_id: existingAnimal._id,
        });
        if (!existingRace) {
          return res.status(404).json({ message: "geen bestaand ras" });
        }
        // Geeft existingRaceId een value wanneer die gevonden is
        existingRaceId = existingRace._id;
      }
      // zelfde verhaal als bij het ras bij Product
      if (productName) {
        const existingProduct = await Product.findOne({
          productName: productName,
        });
        if (!existingProduct) {
          return res.status(400).json({ message: "Product niet gevonden" });
        }
        existingProductId = existingProduct._id;
      }
      // Maakt Pet aan
      const createPet = await Pet.create({
        petName,
        birthDate,
        // Pakt user_id uit de jwt
        user_id: req.user.userId,
        animal_id: existingAnimal._id,
        ras_id: existingRaceId,
        product_id: existingProductId,
      });
      // Response
      res.status(200).json(createPet);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  // getPets
  // Pakt alle pets van de ingelogde user
  async getPets(req, res) {
    const userId = req.params.user_id;
    try {
      const getPet = await Pet.find({ user_id: userId })
        .populate({
          path: "animal_id",
          select: "animalName",
        })
        .populate({
          path: "ras_id",
          select: "rasName",
        })
        .populate({
          path: "product_id",
          select: "productName",
        });
      res.status(200).json(getPet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // getOnePet
  // Pakt een pet geselecteerd op id
  async getOnePet(req, res) {
    const petId = req.params.id;
    const userId = req.params.user_id;
    try {
      const getOnePet = await Pet.findOne({ _id: petId, user_id: userId })
        .populate({
          path: "animal_id",
          select: "animalName",
        })
        .populate({
          path: "ras_id",
          select: "rasName",
        })
        .populate({
          path: "product_id",
          select: "productName",
        });
      res.status(200).json(getOnePet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // deletePet
  //
  async deletePet(req, res) {
    const petId = req.params.id;
    const userId = req.params.user_id;
    try {
      const deletePet = await Pet.findOneAndDelete({
        _id: petId,
        user_id: userId,
      });

      // kijkt of er een pet is gevonden en verwijderd of niet
      if (!deletePet) {
        return res
          .status(404)
          .json({ message: "huisdier niet gevonden of is niet van de user" });
      }

      res.json(deletePet);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // updatePet
  //
  async updatePet(req, res) {
    // pakt pet en user id uit params
    const petId = req.params.id;
    const userId = req.params.user_id;
    // pakt ingevulde info uit body
    const { petName, birthDate, animalName, rasName, productName } = req.body;
    // zorgt dat existingRaceId en existingProductId null zijn als ze niet zijn ingevuld
    let existingRaceId = null;
    let existingProductId = null;
    try {
      // zelfde verhaal als bij de create
      const existingAnimal = await Animal.findOne({ animalName: animalName });
      if (!existingAnimal) {
        return res.status(404).json({ message: "geen bestaand diersoort" });
      }
      //
      if (rasName) {
        const existingRace = await Ras.findOne({
          rasName: rasName,
          animal_id: existingAnimal._id,
        });
        if (!existingRace) {
          return res.status(404).json({ message: "geen bestaand ras" });
        }
        existingRaceId = existingRace._id;
      }
      //
      if (productName) {
        const existingProduct = await Product.findOne({
          productName: productName,
        });
        if (!existingProduct) {
          return res.status(400).json({ message: "Product niet gevonden" });
        }
        existingProductId = existingProduct._id;
      }
      // haalt juiste pet op
      const updatePet = await Pet.findOne({ _id: petId, user_id: userId });
      // update de velden
      if (petName || birthDate || animalName || rasName || productName) {
        updatePet.petName = petName;
        updatePet.birthDate = birthDate;
        updatePet.animal_id = existingAnimal._id;
        updatePet.ras_id = existingRaceId;
        updatePet.product_id = existingProductId;
      }
      // slaat de veranderingen op
      await updatePet.save();
      res.status(200).json({ data: updatePet });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default petController;
