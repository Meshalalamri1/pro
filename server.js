const express = require("express");
const mongoose = require("./models/config"); // الإتصال بقاعدة البيانات
const cors = require("cors");

const authRoutes = require("./models/routes/authRoutes");

const app = express();

// إعدادات السيرفر
app.use(express.json());  // يسمح بتبادل البيانات بتنسيق JSON
app.use(cors());  // تمكين CORS لتبادل البيانات بين السيرفر والـ frontend

// استخدام مسارات المصادقة
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
