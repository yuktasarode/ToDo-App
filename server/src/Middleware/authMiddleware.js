// todo/server/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ status: false, error: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, error: "Invalid or expired token" });
    }
    req.user = decoded; // Attach user data to the request
    next();
  });
};

module.exports = authMiddleware;
