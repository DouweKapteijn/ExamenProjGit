import Product from "../models/product.js";
import Merk from "../models/merkenModel.js";
import Variant from "../models/variantModel.js";

// Create one
export const createProduct = async (req, res) => {
    const {productName, brandName, variantName} = req.body;

    try {
        const existingBrand = await Merk.findOne({brandName});
        if (!existingBrand) {
            return res.status(400).json({message: "Brand niet gevonden"});
        }

        const existingVariant = await Variant.findOne({variantName});
        if (!existingVariant) {
            return res.status(400).json({message: "Variant niet gevonden"});
        }

        const product = await Product.create({
            productName,
            brand_id: existingBrand._id,
            variant_id: existingVariant._id,
        });

        res.status(201).json({message: "Product toegevoegd"});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
};

// Get all
export const getProducts = async (req, res) => {
    const {merk, variant} = req.params;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    let query = {};

    if (merk && merk !== "all") {
        query["brand_id"] = merk;
    }

    if (variant && variant !== "all") {
        query["variant_id"] = variant;
    }

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / perPage);

    try {
        const product = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate({
                path: "brand_id",
                select: ["brandName", "animal_id"],
                populate: {
                    path: "animal_id",
                    select: ["animalName"],
                },
            })
            .populate({
                path: "variant_id",
                select: "variantName",
            });

        res.status(200).json({
            page: parseInt(page),
            perPage: parseInt(perPage),
            totalItems,
            totalPages,
            data: product,
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Get one
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: "brand_id",
                select: "brandName",
            })
            .populate({
                path: "variant_id",
                select: "variantName",
            });

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update one
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {productName, brandName, variantName} = req.body;

    try {
        const existingBrand = await Merk.findOne({brandName});
        if (!existingBrand) {
            return res.status(400).json({message: "Brand niet gevonden"});
        }

        const existingVariant = await Variant.findOne({variantName});
        if (!existingVariant) {
            return res.status(400).json({message: "Variant niet gevonden"});
        }

        const product = await Product.findById(id)
            .populate({
                path: "brand_id",
                select: "brandName",
            })
            .populate({
                path: "variant_id",
                select: "variantName",
            });

        if (productName || brandName || variantName) {
            product.productName = productName;
            product.brand_id = existingBrand._id;
            product.variant_id = existingVariant._id;
        }

        await product.save();

        res.status(200).json({success: true, data: product});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

// Delete one
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({deletedProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
