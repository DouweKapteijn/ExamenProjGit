import User from "../../models/user.js";
import bcrypt from "bcrypt";

const validCardNumberRegex = /^2401160930(\d{4})$/;

const isValidCardNumber = (cardNumbers) => {
    if (!Array.isArray(cardNumbers)) {
        return false;
    }

    return cardNumbers.every((cardNumber) => {
        const cardString = cardNumber.toString();
        const sum = cardString
            .split("")
            .map(Number)
            .reduce((acc, num) => acc + num, 0);

        return sum % 13 === 0;
    });
};

export const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        clientCardNumber,
        role,
    } = req.body;

    if (role !== "admin" && (!isValidCardNumber(clientCardNumber) || !validCardNumberRegex.test(clientCardNumber))) {
        return res.status(400).json({message: "Invalid card number"});
    }

    try {
        const existingEmail = await User.findOne({email});

        if (existingEmail) {
            return res.status(400).json({message: "Email already in use"});
        }

        const existingClientCardNumber = await User.findOne({clientCardNumber});

        if (existingClientCardNumber) {
            return res.status(400).json({message: "Card number already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            clientCardNumber,
            role,
        });

        await user.save();

        res.status(201).json({message: "User added"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
