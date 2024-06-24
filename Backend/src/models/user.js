import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v) || "Anoniem";
            },
            message: (props) => `${props.value} is geen geldig telefoon nummer!`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    clientCardNumber: {
        type: [String],
        unique: true,
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    role: {
        type: String,
        enum: ["admin", "customer", "anoniem"],
        default: "customer",
    },
    anonymized: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("User", userSchema);
