
const jwt = require('jsonwebtoken');
const SECRET_KEY = "supersecret";

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication required" });
    }
};
