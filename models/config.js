const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');

        // Drop existing users table if exists
        db.run("DROP TABLE IF EXISTS users");

        // Create new users table with all required fields
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            country TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

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