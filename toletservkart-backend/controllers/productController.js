const db = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, u.name AS ownerName FROM products p
      LEFT JOIN users u ON p.owner_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, images } = req.body;
    const ownerId = req.user.userId;

    // Images stored as JSON string
    const imagesString = JSON.stringify(images);

    const [result] = await db.query(
      'INSERT INTO products (title, description, category, price, images, owner_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, category, price, imagesString, ownerId]
    );

    const newProduct = {
      id: result.insertId,
      title,
      description,
      category,
      price,
      images,
      owner_id: ownerId,
      created_at: new Date()
    };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
