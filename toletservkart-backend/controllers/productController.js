const db = require('../config/db');

// ✅ 1. Get all products (Admin or Public View)
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

// ✅ 2. Get logged-in owner's products
exports.getOwnerProducts = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'owner') {
      return res.status(401).json({ message: 'Only owners can access their products' });
    }

    const ownerId = req.user.id;

    const [products] = await db.query(
      `SELECT * FROM products WHERE owner_id = ? ORDER BY created_at DESC`,
      [ownerId]
    );

    // Parse image JSON for each product
    const parsedProducts = products.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));

    res.json(parsedProducts);
  } catch (error) {
    console.error("Error fetching owner's products:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ 3. Create product (Owner only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, images } = req.body;

    if (!req.user || !req.user.id || req.user.role !== 'owner') {
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

// ✅ 4. Delete a product (Owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const ownerId = req.user.id;

    // Check if the product belongs to this owner
    const [existing] = await db.query(
      `SELECT * FROM products WHERE id = ? AND owner_id = ?`,
      [productId, ownerId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    await db.query(`DELETE FROM products WHERE id = ?`, [productId]);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
