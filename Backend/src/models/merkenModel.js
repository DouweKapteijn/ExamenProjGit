import mongoose from "mongoose";

const merkenSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
    lowercase: true,
  },
});

const Merk = mongoose.model("brand", merkenSchema);

export default Merk;
