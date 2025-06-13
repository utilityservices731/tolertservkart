const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Verify JWT token and attach decoded user info to req.user
 */
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id, email, role, ... }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

/**
 * Allow access to Admins only
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  next();
};

/**
 * Allow access to Owners only
 */
exports.requireOwner = (req, res, next) => {
  if (!req.user || req.user.role !== "owner") {
    return res.status(403).json({ message: "Access denied: Owners only." });
  }
  next();
};

/**
 * Allow access to general Users only
 */
exports.requireUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied: Users only." });
  }
  next();
};

/**
 * Optional: Allow only Admin OR Owner
 */
exports.requireAdminOrOwner = (req, res, next) => {
  if (!req.user || !["admin", "owner"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: Admins or Owners only." });
  }
  next();
};
