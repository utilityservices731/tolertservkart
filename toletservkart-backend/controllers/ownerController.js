const db = require('../db'); // db.js from mysql2
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Owner Register
exports.registerOwner = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  try {
    // Check if owner already exists
    const [existing] = await db.query("SELECT * FROM owners WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert owner
    await db.query(
      "INSERT INTO owners (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Owner registered successfully." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Owner Login
exports.loginOwner = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Both fields are required." });

  try {
    const [rows] = await db.query("SELECT * FROM owners WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const owner = rows[0];

    // Match password
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Create token
    const token = jwt.sign(
      { id: owner.id, email: owner.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      owner: {
        id: owner.id,
        name: owner.name,
        email: owner.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
