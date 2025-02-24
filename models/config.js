const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');

        // إنشاء جدول المستخدمين
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            status TEXT NOT NULL
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