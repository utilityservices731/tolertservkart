const db = require('../config/db');

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      isRent,
      rentDuration,
      condition,
      images,
      location,
    } = req.body;

    const ownerId = req.user.id;

    const [result] = await db.query(
      `INSERT INTO products 
       (title, description, category, price, is_rent, rent_duration, \`condition\`, images, location, status, owner_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
      [
        title,
        description || '',
        category,
        price,
        isRent || false,
        rentDuration || '',
        condition || 'Used',
        JSON.stringify(images || []),
        location || 'Lucknow',
        ownerId
      ]
    );

    res.status(201).json({ message: "Product created", productId: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
