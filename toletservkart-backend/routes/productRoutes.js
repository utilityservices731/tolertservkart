const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', getProducts);


router.post('/', protect, createProduct);


router.get('/my', protect, async (req, res) => {
  const db = require('../config/db');
  try {
    const [products] = await db.query('SELECT * FROM products WHERE owner_id = ?', [req.user.userId]);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
