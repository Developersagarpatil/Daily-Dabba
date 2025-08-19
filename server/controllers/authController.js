const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

    const { name, email, phone, password } = req.body;
    
    
    // Check if all fields are provided
    if (!email || !name || !phone || !password) {
        return res.status(400).json({ message: "Please fill all details!!" });
    }

    // Validate phone number length
    if (phone.length !== 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long!!" });
    }

    // Check if user already exists
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });
    
    if (emailExist || phoneExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    });

    if (!user) {
        return res.status(400).json({ message: "User not created!" });
    }

    res.status(201).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt : user.createdAt
    });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all details!!" });
    }

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt : user.createdAt

        });
    } else {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
}

const privateController = (req, res) => {
    res.json(req.user);
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

module.exports = { registerUser, loginUser, privateController };
