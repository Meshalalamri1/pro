
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    description: String,
    features: [String],
    images: [String],
    rating: { type: Number, default: 0 },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Hotel', HotelSchema);
