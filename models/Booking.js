
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);
