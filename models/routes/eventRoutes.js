
const express = require('express');
const Event = require('../Event');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
});

router.post('/register/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        
        if (!event.registeredUsers.includes(req.user.id)) {
            event.registeredUsers.push(req.user.id);
            await event.save();
        }
        
        res.json({ message: "Successfully registered for event" });
    } catch (error) {
        res.status(500).json({ message: "Error registering for event" });
    }
});

module.exports = router;
