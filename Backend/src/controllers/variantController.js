import Variant from "../models/variantModel.js";

const variantController = {
  async createVariant(req, res) {
    const { variantName } = req.body;
    try {
      const createVariant = await Variant.create({ variantName });
      res.status(200).json(createVariant);
    } catch (err) {
      res.status(400).send("er gaat iets mis: " + err.message);
    }
  },
  async getVariant(req, res) {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    try {
      // Telt items en rekent uit hoeveel paginas er zijn
      const totalItems = await Variant.countDocuments();
      const totalPages = Math.ceil(totalItems / perPage);

      const getVariant = await Variant.find()
        // kijkt hoeveel items er geskipt moeten worden
        .skip((page - 1) * perPage)
        // Limit per page
        .limit(perPage);

      res.status(200).json({
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages,
        data: getVariant,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async deleteVariant(req, res) {
    try {
      const deleteVariant = await Variant.findByIdAndDelete(req.params.id);
      res.json(deleteVariant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async updateVariant(req, res) {
    const { id } = req.params;
    const { variantName } = req.body;
    try {
      const updateVariant = await Variant.findById(id);
      if (variantName) {
        updateVariant.variantName = variantName;
      }
      await updateVariant.save();
      res.status(200).json({ data: updateVariant });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default variantController;
