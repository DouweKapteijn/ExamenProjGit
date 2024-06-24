import User from "../models/user.js";

// Get all
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Get one
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.anonymized) {
            return res.status(200).json({message: "User information is anonymized"});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update one
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        clientCardNumber,
        accountStatus,
        role,
    } = req.body;

    try {
        const user = await User.findById(id);
        if (
            firstName ||
            lastName ||
            email ||
            phoneNumber ||
            password ||
            accountStatus ||
            role
        ) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.password = password;
            user.accountStatus = accountStatus;
            user.role = role;
        }
        await user.save();
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

// Anonymize one
export const anonymizeUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);

        user.anonymized = true;
        user.firstName = "anoniem";
        user.lastName = "anoniem";
        user.email = "anoniem" + user._id;
        user.phoneNumber = "anoniem";
        user.password = "anoniem";
        user.accountStatus = "inactive";

        await user.save();
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

// Delete one
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({deletedUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
