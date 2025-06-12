const db = require('../config/db');

// ✅ Get all products (Admin or Public View)
exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, u.name AS ownerName FROM products p
      LEFT JOIN users u ON p.owner_id = u.id
      ORDER BY p.created_at DESC
    `);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Create product (Owner only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, images } = req.body;

    // ✅ Ensure user is logged in
    if (!req.user || !req.user.id || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // ✅ Only owners allowed to create product
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can create products' });
    }

    const ownerId = req.user.id;
    const imagesString = JSON.stringify(images || []);

    const [result] = await db.query(
      `INSERT INTO products (title, description, category, price, images, owner_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, category, price, imagesString, ownerId]
    );

    const newProduct = {
      id: result.insertId,
      title,
      description,
      category,
      price,
      images: images || [],
      owner_id: ownerId,
      created_at: new Date()
    };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
