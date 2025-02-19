
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config");

const router = express.Router();
const SECRET_KEY = "supersecret";

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, country, username, password } = req.body;
        
        // Check if username exists
        db.get("SELECT id FROM users WHERE username = ?", [username], async (err, row) => {
            if (err) {
                return res.status(500).json({ message: "Server Error", error: err });
            }
            if (row) {
                return res.status(400).json({ message: "Username already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            db.run(
                "INSERT INTO users (name, email, phone, country, username, password) VALUES (?, ?, ?, ?, ?, ?)",
                [name, email, phone, country, username, hashedPassword],
                (err) => {
                    if (err) {
                        return res.status(500).json({ message: "Server Error", error: err });
                    }
                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Server Error", error: err });
            }
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ message: "Login successful", token });
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
