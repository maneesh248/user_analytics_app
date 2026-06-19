const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "change_me";

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required." });

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(409).json({ message: "Email already in use." });

        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

        res.status(201).json({
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and password are required." });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid email or password." });

        const ok = await user.matchPassword(password);
        if (!ok)
            return res.status(401).json({ message: "Invalid email or password." });

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
