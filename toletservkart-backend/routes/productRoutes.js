const express = require("express");
const router = express.Router();
const db = require("../db"); // your mysql connection
const upload = require("../middleware/upload");

// Add product with image
router.post("/add", upload.single("image"), (req, res) => {
  const { title, description, category, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO products (title, description, category, price, image) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, description, category, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Product added successfully" });
  });
});

// Get all products
router.get("/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
