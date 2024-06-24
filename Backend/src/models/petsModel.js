import mongoose from "mongoose";

const petsSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
    lowercase: true,
  },
  birthDate: {
    type: Date,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
    lowercase: true,
    required: true,
  },
  ras_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rassen",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const Pet = mongoose.model("pet", petsSchema);

export default Pet;
