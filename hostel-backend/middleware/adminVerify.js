// middleware/adminVerify.js
const jwt = require("jsonwebtoken");

const adminVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the role in the token is 'admin'
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.error("Admin token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminVerify;
