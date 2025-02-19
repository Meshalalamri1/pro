const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    country: String,
    username: { type: String, unique: true },
    password: String
});

// تشفير كلمة المرور قبل الحفظ
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);
