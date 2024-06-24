import Ras from "../models/rassenModel.js";
import Animal from "../models/dierenModel.js";

const rassenController = {
  async createRas(req, res) {
    const { rasName, animalName } = req.body;
    try {
      const existingAnimal = await Animal.findOne({ animalName: animalName });
      if (!existingAnimal) {
        return res.status(404).json({ message: "geen bestaand diersoort" });
      }

      const createRas = await Ras.create({
        rasName,
        animal_id: existingAnimal._id,
      });
      res.status(200).json(createRas);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async getRas(req, res) {
    const animalId = req.params.id;

    // De pagina en standaard is 1
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
      const totalItems = await Ras.countDocuments(query);
      const totalPages = Math.ceil(totalItems / perPage);

      const getRas = await Ras.find(query)
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
        data: getRas,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getOneRas(req, res) {
    const { id } = req.params;
    try {
      const getRas = await Ras.findById(id).populate("animal_id", "animalName");
      res.status(200).json(getRas);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async updateRas(req, res) {
    const { id } = req.params;
    const { rasName, animalName } = req.body;
    try {
      // Kijkt of animal bestaat in de animals tabel
      const existingAnimal = await Animal.findOne({ animalName: animalName });
      if (!existingAnimal) {
        return res.status(404).json({ message: "geen bestaand diersoort" });
      }

      // Pakt ras dat geupdate moet worden
      const updateRas = await Ras.findById(id);

      // Update values van rasName en animal_id
      if (rasName || animalName) {
        updateRas.rasName = rasName;
        updateRas.animal_id = existingAnimal._id;
      }
      // Slaat het op
      await updateRas.save();

      // Response
      res.status(200).json({ data: updateRas });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async deleteRas(req, res) {
    try {
      const deleteRas = await Ras.findByIdAndDelete(req.params.id);
      res.json(deleteRas);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default rassenController;
