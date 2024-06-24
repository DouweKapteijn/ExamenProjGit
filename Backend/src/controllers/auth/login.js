import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

export const loginUser = async (req, res) => {
    const {email, clientCardNumber, password} = req.body;

    try {
        const user = await User.findOne({
            $or: [{email}, {clientCardNumber}],
        });

        if (!user) {
            return res.status(404).json({message: "Gebruiker niet gevonden"});
        }

        if (user.accountStatus === "inactive") {
            return res.status(403).json({message: "Account is inactief"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Ongeldig wachtwoord"});
        }

        const accessToken = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "24h"}
        );

        res.status(200).json({message: "Inloggen gelukt", accessToken});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
