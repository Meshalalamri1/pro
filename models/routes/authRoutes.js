const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();
const SECRET_KEY = "supersecret";

// 🔹 API: تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, country, username, password } = req.body;

        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ name, email, phone, country, username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 🔹 API: تسجيل الدخول
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
