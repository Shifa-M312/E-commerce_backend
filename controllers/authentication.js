const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//  REGISTER NEW USER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
       
        const user = await User.create({ name, email, password, role });
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//  LOGIN USER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate a JWT Token
            const token = jwt.sign(
                { id: user._id, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            res.json({
                message: "Login successful!",
                token: token,
                role: user.role
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
