import Animal from "../models/dierenModel.js";

const animalController = {
  async createAnimal(req, res) {
    const { animalName } = req.body;
    try {
      const createAnimal = await Animal.create({ animalName });
      res.status(200).json(createAnimal);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async getAnimal(req, res) {
    try {
      const getAnimal = await Animal.find();
      res.json(getAnimal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async getOneAnimal(req, res) {
    try {
      const getOneAnimal = await Animal.findById(req.params.id);
      res.json(getOneAnimal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async deleteAnimal(req, res) {
    try {
      const deleteAnimal = await Animal.findByIdAndDelete(req.params.id);
      res.json(deleteAnimal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async updateAnimal(req, res) {
    const { id } = req.params;
    const { animalName } = req.body;
    try {
      const updateAnimal = await Animal.findById(id);
      if (animalName) {
        updateAnimal.animalName = animalName;
      }
      await updateAnimal.save();
      res.status(200).json({ data: updateAnimal });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default animalController;
