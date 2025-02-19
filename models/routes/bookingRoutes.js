
const express = require('express');
const Booking = require('../Booking');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            userId: req.user.id
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error creating booking" });
    }
});

router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('hotelId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

module.exports = router;
