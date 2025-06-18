const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Listing = require('../models/Listing');

// Upload product with image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, owner_id } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newListing = new Listing({
      title,
      description,
      price,
      owner_id,
      image
    });

    await newListing.save();

    res.status(201).json({ message: 'Product uploaded successfully', listing: newListing });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: 'Something went wrong while uploading' });
  }
});

module.exports = router;
