const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminprotect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user
            req.user = await User.findById(decoded.id).select('-password');

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ message: "User not found, unauthorized" });
            }

            // Check if admin
            if (req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json({ message: "Forbidden: Admins only" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Invalid token, unauthorized" });
        }
    } else {
        return res.status(401).json({ message: "No token provided, unauthorized" });
    }
};

module.exports = adminprotect;
