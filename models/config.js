const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('./models/database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');

        // إنشاء جدول المستخدمين إذا لم يكن موجوداً
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            country TEXT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err);
            } else {
                console.log('Users table ready');
            }
        });

        // Hotels table
        db.run(`CREATE TABLE IF NOT EXISTS hotels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            price REAL,
            description TEXT
        )`);

        // Events table
        db.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            price REAL,
            date TEXT
        )`);

        // Bookings table
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            hotelId INTEGER,
            eventId INTEGER,
            bookingDate TEXT,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(hotelId) REFERENCES hotels(id),
            FOREIGN KEY(eventId) REFERENCES events(id)
        )`);
    }
});

module.exports = db;