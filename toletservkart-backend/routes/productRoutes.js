const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../middleware/upload");
const { protectOwner } = require("../middleware/authMiddleware");

// 🟢 Add product with image (Owner Only)
router.post("/add", protectOwner, upload.single("image"), (req, res) => {
  const { title, description, category, price } = req.body;
  const image = req.file ? req.file.filename : null;
  const ownerId = req.user.id;

  const sql = `
    INSERT INTO products (title, description, category, price, image, owner_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, description, category, price, image, ownerId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
});

// 🟢 Get all products (Public or Admin)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 🟢 Get only products uploaded by owner
router.get("/my", protectOwner, (req, res) => {
  const sql = "SELECT * FROM products WHERE owner_id = ? ORDER BY id DESC";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
