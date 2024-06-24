import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variantName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Variant = mongoose.model("variant", variantSchema);

export default Variant;
