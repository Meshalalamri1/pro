const express = require('express');
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


// حذف مستخدم
// حذف مستخدم
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Error deleting user', error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'User deleted successfully' });
    });

    // التحقق من وجود المستخدم أولاً
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // حذف المستخدم
        db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "User deleted successfully", deletedId: userId });
        });
    });
});

// جلب جميع المستخدمين
router.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
});

// Add new user 
router.post("/users", (req, res) => {
    const { name, email, status } = req.body;
    db.run("INSERT INTO users (name, email, status) VALUES (?, ?, ?)", 
        [name, email, status], 
        function(err) {
            if (err) {
                return res.status(500).json({ message: "Server Error", error: err });
            }
            res.json({ id: this.lastID, name, email, status });
        }
    );
});

module.exports = router;