// auth.js
import express from 'express';
import User from "../models/user.js"; // Correct path to user model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { SALT_ROUNDS } from "../config/connection.js"; // Correctly import SALT_ROUNDS

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        // Create the new user
        await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Authentication route example
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt with username:', username);
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
