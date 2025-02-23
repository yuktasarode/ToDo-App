// todo/server/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ status: false, error: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, error: "Invalid or expired token" });
    }
    req.user = { id: decoded.userId, username: decoded.username };
    next();
  });
};

module.exports = authMiddleware;
