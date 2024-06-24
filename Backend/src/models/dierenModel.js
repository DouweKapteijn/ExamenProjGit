import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  animalName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Animal = mongoose.model("animal", animalSchema);

export default Animal;
