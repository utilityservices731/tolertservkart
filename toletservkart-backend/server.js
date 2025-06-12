const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const util = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------- MySQL Connection ----------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toletservkart",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("✅ Connected to MySQL database.");
  }
});

// Promisify DB queries
const query = util.promisify(db.query).bind(db);

// ---------- USERS REGISTER ----------
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUsers = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    await query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ]);

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- USERS LOGIN ----------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Both email and password are required." });
  }

  try {
    const users = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- OWNERS REGISTER ----------
app.post("/api/owners/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingOwners = await query("SELECT * FROM owners WHERE email = ?", [email]);
    if (existingOwners.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    await query("INSERT INTO owners (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ]);

    res.status(201).json({ message: "Owner registered successfully." });
  } catch (err) {
    console.error("Owner register error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- OWNERS LOGIN ----------
app.post("/api/owners/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Both email and password are required." });
  }

  try {
    const owners = await query("SELECT * FROM owners WHERE email = ?", [email]);
    if (owners.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const owner = owners[0];
    if (owner.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: owner.id, email: owner.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      owner: { id: owner.id, name: owner.name, email: owner.email },
    });
  } catch (err) {
    console.error("Owner login error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- ADMINS REGISTER ----------
app.post("/api/admins/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingAdmins = await query("SELECT * FROM admins WHERE email = ?", [email]);
    if (existingAdmins.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    await query("INSERT INTO admins (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ]);

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    console.error("Admin register error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- ADMINS LOGIN ----------
app.post("/api/admins/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Both email and password are required." });
  }

  try {
    const admins = await query("SELECT * FROM admins WHERE email = ?", [email]);
    if (admins.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const admin = admins[0];
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- CREATE ORDER ----------
app.post("/api/orders", async (req, res) => {
  const { user_id, item, type, price, date, status } = req.body;

  if (!user_id || !item || !type || !price || !date || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await query(
      "INSERT INTO orders (user_id, item, type, price, date, status) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, item, type, price, date, status]
    );

    res.status(201).json({ message: "Order saved successfully." });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- GET USER ORDER HISTORY ----------
app.get("/api/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await query("SELECT * FROM orders WHERE user_id = ?", [userId]);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- PLACE ORDER ----------
app.post("/api/orders", async (req, res) => {
  const { name, email, address, city, zip, paymentMethod } = req.body;

  if (!name || !email || !address || !city || !zip || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await query(
      "INSERT INTO orders (name, email, address, city, zip, payment_method) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, address, city, zip, paymentMethod]
    );

    res.status(201).json({ message: "Order placed successfully." });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

// GET all listings (no filter)
app.get('/api/listings', (req, res) => {
  const query = 'SELECT * FROM listings';

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});



// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
