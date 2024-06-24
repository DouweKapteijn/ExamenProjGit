import Merk from "../models/merkenModel.js";
import Animal from "../models/dierenModel.js";

const merkenController = {
  async createMerk(req, res) {
    const { brandName, animalName } = req.body;
    let existingAnimalId = null;
    try {
      if (animalName) {
        const existingAnimal = await Animal.findOne({ animalName: animalName });
        if (!existingAnimal) {
          return res.status(404).json({ message: "geen bestaand diersoort" });
        }
        existingAnimalId = existingAnimal._id;
      }

      const createMerk = await Merk.create({
        brandName,
        animal_id: existingAnimalId,
      });
      res.status(200).json(createMerk);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async getMerk(req, res) {
    const animalId = req.params.id;

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    try {
      let query = {};
      // Kijkt of er een filter is en vult de query op basis daarvan
      if (animalId === "all") {
        query = {};
      } else {
        query = { animal_id: animalId };
      }

      // Telt items en rekent uit hoeveel paginas er zijn
      const totalItems = await Merk.countDocuments(query);
      const totalPages = Math.ceil(totalItems / perPage);

      const getMerk = await Merk.find(query)
        // kijkt hoeveel items er geskipt moeten worden
        .skip((page - 1) * perPage)
        // Limit per page
        .limit(perPage)
        .populate("animal_id", "animalName");

      res.status(200).json({
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages,
        data: getMerk,
      });
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async getOneMerk(req, res) {
    const { id } = req.params;
    try {
      const getMerk = await Merk.findById(id).populate(
        "animal_id",
        "animalName"
      );
      res.status(200).json(getMerk);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async updateMerk(req, res) {
    const { id } = req.params;
    const { brandName, animalName } = req.body;
    let existingAnimalId = null;
    try {
      // Kijkt of animal bestaat in de animals tabel
      if (animalName) {
        const existingAnimal = await Animal.findOne({ animalName: animalName });
        if (!existingAnimal) {
          return res.status(404).json({ message: "geen bestaand diersoort" });
        }
        existingAnimalId = existingAnimal._id;
      }

      // Pakt merk dat geupdate moet worden
      const updateMerk = await Merk.findById(id)
          .populate({
            path: "animal_id",
            select: "animalName"
          })
      // Update values van brandName en animal_id
      if (brandName || animalName) {
        updateMerk.brandName = brandName;
        updateMerk.animal_id = existingAnimalId;
      }
      // Slaat het op
      await updateMerk.save();

      // Response
      res.status(200).json({ data: updateMerk });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async deleteMerk(req, res) {
    try {
      const deleteMerk = await Merk.findByIdAndDelete(req.params.id);
      res.json(deleteMerk);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default merkenController;
