const express = require('express');
const router = express.Router();

// POST route for signup
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // 1. Basic Backend Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log(`New user registration request received:`);
    console.log(`Username: ${username}, Email: ${email}`);

    try {
        // 2. Database Logic goes here (e.g., checking if user exists, hashing password, saving to DB)
        
        // Mock successful registration response
        return res.status(201).json({ 
            message: 'User registered successfully! Welcome to the platform.' 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;