import mongoose from "mongoose";

const rassenSchema = new mongoose.Schema({
  rasName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
    required: true,
    lowercase: true,
  },
});

const Ras = mongoose.model("rassen", rassenSchema);

export default Ras;
