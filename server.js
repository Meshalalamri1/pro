
const express = require("express");
const mongoose = require("./models/config");
const cors = require("cors");

const authRoutes = require("./models/routes/authRoutes");
const hotelRoutes = require("./models/routes/hotelRoutes");
const eventRoutes = require("./models/routes/eventRoutes");
const bookingRoutes = require("./models/routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
