
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    description: String,
    date: Date,
    images: [String],
    capacity: Number,
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Event', EventSchema);
