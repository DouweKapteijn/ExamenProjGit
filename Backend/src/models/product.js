import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand",
        required: true,
    },
    variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variant",
        required: true,
    },
});

const Product = mongoose.model("product", productSchema);

export default Product;
