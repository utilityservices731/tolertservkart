const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer"); 
const path = require("path");

const util = require("util");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ---------- MySQL Connection Pool ----------
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ranju@8482",
  database: "toletservkart",
  // connectionLimit: 10,
});

// ✅ Fixed this line:
const query = util.promisify(db.query).bind(db);

// ✅ Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage }); // ✅ This was missing in your code

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
      { id: user.id, email: user.email, role: "user" },
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
      { id: owner.id, email: owner.email, role: "owner" },
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
      { id: admin.id, email: admin.email, role: "admin" },
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

// .................. ADMINS SUMMARY ..................

// Admin Summary Endpoint using app.get
app.get("/api/admins/summary", async (req, res) => {
  try {
    const users = await query('SELECT COUNT(*) AS total FROM users');
    const owners = await query('SELECT COUNT(*) AS total FROM owners');
    const products = await query('SELECT COUNT(*) AS total FROM products');
    const listings = await query('SELECT COUNT(*) AS total FROM listings');
    const messages = await query('SELECT COUNT(*) AS total FROM messages');
    const unreadMessages = await query('SELECT COUNT(*) AS total FROM messages WHERE is_read = 0');
    const orders = await query('SELECT COUNT(*) AS total FROM orders');
    const pendingOrders = await query("SELECT COUNT(*) AS total FROM orders WHERE status = 'pending'");

    res.json({
      totalUsers: users[0].total,
      totalOwners: owners[0].total,
      totalProducts: products[0].total,
      totalListings: listings[0].total,
      totalMessages: messages[0].total,
      unreadMessages: unreadMessages[0].total,
      totalOrders: orders[0].total,
      pendingOrders: pendingOrders[0]?.total || 0,
    });
  } catch (err) {
    console.error('Summary Error:', err);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await query("SELECT id, name, email, role, created_at FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


app.delete("/api/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.put("/api/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    await query("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?", [name, email, role, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.get("/api/admin/owners", async (req, res) => {
  try {
    const owners = await query(`
      SELECT id, name, email, status, verified, created_at 
      FROM owners
    `);
    res.json(owners);
  } catch (err) {
    console.error("Error fetching owners:", err);
    res.status(500).json({ message: "Failed to fetch owners" });
  }
});

app.delete("/api/admin/owners/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await query("DELETE FROM owners WHERE id = ?", [id]);
    res.json({ message: "Owner deleted successfully" });
  } catch (err) {
    console.error("Error deleting owner:", err);
    res.status(500).json({ message: "Failed to delete owner" });
  }
});

app.put("/api/admin/owners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await query("UPDATE owners SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    res.json({ message: "Owner updated successfully" });
  } catch (err) {
    console.error("Error updating owner:", err);
    res.status(500).json({ message: "Failed to update owner" });
  }
});

app.patch("/api/admin/owners/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await query("UPDATE owners SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});
app.patch("/api/admin/owners/:id/verify", async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;

  try {
    await query("UPDATE owners SET verified = ? WHERE id = ?", [verified, id]);
    res.json({ message: "Verification status updated" });
  } catch (err) {
    console.error("Error updating verification:", err);
    res.status(500).json({ message: "Failed to update verification" });
  }
});

// GET all products
app.get("/api/admin/products", async (req, res) => {
  try {
    const products = await query(`
      SELECT id, title, price, rent_price, category, image, \`condition\`, location,
             available, is_rentable, owner_id, verified, created_at
      FROM products
      ORDER BY created_at DESC
    `);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


app.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    rent_price,
    category,
    image,
    condition,
    location,
    available,
    is_rentable,
    owner_id,
    verified
  } = req.body;

  try {
    await query(
      `UPDATE products 
       SET title = ?, 
           description = ?, 
           price = ?, 
           rent_price = ?, 
           category = ?, 
           image = ?, 
           \`condition\` = ?, 
           location = ?, 
           available = ?, 
           is_rentable = ?, 
           owner_id = ?, 
           verified = ? 
       WHERE id = ?`,
      [
        title,
        description,
        price,
        rent_price,
        category,
        image,
        condition,
        location,
        available,
        is_rentable,
        owner_id,
        verified,
        id
      ]
    );

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});



// DELETE a product
app.delete("/api/admin/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// GET all listings
app.get('/api/admin/listings', async (req, res) => {
  try {
    const rows = await query("SELECT * FROM listings ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error('GET listings error:', err.message);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});





// UPDATE a listing
app.put('/api/admin/listings/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title, description, price, location,
    category, subcategory, image, verified
  } = req.body;

  // Validation
  if (!title || !category) {
    return res.status(400).json({ message: "Title and Category are required" });
  }

  const validCategories = ['clothing', 'property', 'appliance'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    await query(
      `UPDATE listings SET title = ?, description = ?, price = ?, location = ?, category = ?, subcategory = ?, image = ?, verified = ? WHERE id = ?`,
      [
        title,
        description || null,
        price || null,
        location || null,
        category,
        subcategory || null,
        image || null,
        parseInt(verified) || 0,
        id
      ]
    );
    res.json({ message: "Listing updated successfully" });
  } catch (err) {
    console.error('PUT listings error:', err.message);
    res.status(500).json({ message: "Failed to update listing" });
  }
});



// DELETE a listing
app.delete('/api/admin/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query("DELETE FROM listings WHERE id = ?", [id]);
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error('DELETE listings error:', err.message);
    res.status(500).json({ message: "Failed to delete listing" });
  }
});


app.get('/api/admin/messages/users', async (req, res) => {
  try {
    const users = await query(`
      SELECT u.id, u.name, u.email,
        (SELECT COUNT(*) FROM messages m WHERE m.user_id = u.id AND m.sender = 'user' AND m.is_read = 0) AS unread_count
      FROM users u
      WHERE u.id IN (SELECT DISTINCT user_id FROM messages)
      ORDER BY unread_count DESC, u.name ASC;
    `);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/admin/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await query(
      `SELECT * FROM messages WHERE user_id = ? ORDER BY timestamp ASC`,
      [userId]
    );
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/admin/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  const { text, timestamp } = req.body;

  try {
    await query(
      `INSERT INTO messages (user_id, sender, text, timestamp, is_read) VALUES (?, 'admin', ?, ?, 1)`,
      [userId, text, timestamp]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.put('/api/admin/messages/:userId/mark-read', async (req, res) => {
  const { userId } = req.params;

  try {
    await query(
      `UPDATE messages SET is_read = 1 WHERE user_id = ? AND sender = 'user' AND is_read = 0`,
      [userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error marking messages as read:', err);
    res.status(500).json({ error: 'Failed to update read status' });
  }
});

app.get('/api/user/messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Admin ke messages read mark karo
    await query(
      "UPDATE messages SET is_read = 1 WHERE user_id = ? AND sender = 'admin'",
      [userId]
    );

    const messages = await query(
      "SELECT * FROM messages WHERE user_id = ? ORDER BY timestamp ASC",
      [userId]
    );

    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching user messages:', err);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// ✅ DELETE all messages of a specific user (admin-side)
app.delete('/api/admin/messages/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await query('DELETE FROM messages WHERE user_id = ?', [userId]);
    res.status(200).json({ message: 'Chat cleared', deleted: result.affectedRows });
  } catch (err) {
    console.error("❌ Error clearing chat:", err);
    res.status(500).json({ error: "Server error while clearing chat" });
  }
});


app.post('/api/user/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  const { text, timestamp } = req.body;

  try {
    const result = await query(
      "INSERT INTO messages (sender, text, timestamp, user_id, is_read, delivered) VALUES (?, ?, ?, ?, ?, ?)",
      ['user', text, timestamp, userId, 0, 1]
    );

    res.json({ insertedId: result.insertId });
  } catch (err) {
    console.error('❌ Error sending user message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ✅ DELETE API to clear all messages for a user
app.delete('/api/user/messages/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await query('DELETE FROM messages WHERE user_id = ?', [userId]);
    res.status(200).json({
      message: 'Chat cleared successfully',
      deleted: result.affectedRows
    });
  } catch (error) {
    console.error('❌ Error deleting messages:', error);
    res.status(500).json({ error: 'Server error while clearing chat' });
  }
});




// order 

app.post("/api/orders", async (req, res) => {
  const userHeader = req.headers['x-user'];
  if (!userHeader) return res.status(401).json({ message: "Login required" });

  let user;
  try {
    user = JSON.parse(userHeader);
    if (!user.id) throw new Error("Missing user id");
  } catch (err) {
    return res.status(400).json({ message: "Invalid user header" });
  }

  const { name, email, address, city, zip, paymentMethod, cartItems = [] } = req.body;

  if (!name || !email || !address || !city || !zip || !paymentMethod || !cartItems.length) {
    return res.status(400).json({ message: "Missing required fields or empty cart" });
  }

  try {
    await query(
      `INSERT INTO orders 
       (user_id, name, email, address, city, zip, payment_method, cart_items)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        name,
        email,
        address,
        city,
        zip,
        paymentMethod,
        JSON.stringify(cartItems)
      ]
    );

    res.status(201).json({ message: "✅ Order placed successfully!" });
  } catch (err) {
    console.error("❌ Order insert error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

app.get('/api/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await query("SELECT * FROM orders WHERE user_id = ?", [userId]);
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/wishlist", async (req, res) => {
  const { user_id, product_id, title, image, price, location, source } = req.body;

  if (!user_id || !product_id || !title) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    await query(
      "INSERT INTO wishlist (user_id, product_id, title, image, price, location, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, product_id, title, image, price, location, source] // ✅ source included here?
    );
    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("Wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await query("SELECT * FROM wishlist WHERE user_id = ?", [userId]);
    res.status(200).json(results);
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/wishlist/:wishlistId", async (req, res) => {
  const { wishlistId } = req.params;
  try {
    await query("DELETE FROM wishlist WHERE wishlist_id = ?", [wishlistId]);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Wishlist delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ---------- GET ALL LISTINGS ----------
app.get("/api/listings", (req, res) => {
  const { category, city } = req.query;
  let query = `SELECT * FROM listings WHERE verified = 1`;
  const params = [];

if (category) {
  query += ` AND LOWER(category) = ?`;
  params.push(category.toLowerCase());
}

  if (city) {
    query += ` AND LOWER(location) LIKE LOWER(?)`;
    params.push(`%${city}%`);
  }

  query += ` ORDER BY id DESC`;

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching listings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.get('/api/search', (req, res) => {
  const { query, city } = req.query;

  const values = [];
  const listingsSQL = `
    SELECT id, title, description, image, price, location, 'listing' AS source 
    FROM listings WHERE verified = 1
  `;
  const productsSQL = `
    SELECT id, title, description, image, price, location, 'product' AS source 
    FROM products WHERE verified = 1
  `;

  const conditions = [];
  if (query) {
    conditions.push("title LIKE ?");
    values.push(`%${query}%`);
  }
  if (city) {
    conditions.push("location = ?");
    values.push(city);
  }

  const conditionStr = conditions.length ? ` AND ${conditions.join(" AND ")}` : "";

  const finalListingsQuery = listingsSQL + conditionStr;
  const finalProductsQuery = productsSQL + conditionStr;

  const finalQuery = `${finalListingsQuery} UNION ${finalProductsQuery} ORDER BY id DESC`;

  db.query(finalQuery, values.concat(values), (err, results) => {
    if (err) {
      console.error('Search query error:', err);
      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
});


app.get('/api/admin/orders', (req, res) => {
  const query = `SELECT * FROM orders ORDER BY created_at DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Order fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Parse cart_items if JSON
    const parsedResults = results.map(order => {
      try {
        order.cart_items = JSON.parse(order.cart_items);
      } catch (e) {
        order.cart_items = [];
      }
      return order;
    });

    res.json(parsedResults);
  });
});


// ---------- ADMINS DASHBOARD DATA ----------
app.get("/api/admins/dashboard", async (req, res) => {
  try {
    const [userCount] = await query('SELECT COUNT(*) AS totalUsers FROM users');
    const [listingCount] = await query('SELECT COUNT(*) AS activeListings FROM products WHERE status = "active"');

    let pendingCount = { pendingRequests: 0 };
    try {
      [pendingCount] = await query('SELECT COUNT(*) AS pendingRequests FROM owner_requests WHERE status = "pending"');
    } catch (err) {
      console.warn('Skipping owner_requests query:', err.message);
    }

    let messageCount = { newMessages: 0 };
    try {
      [messageCount] = await query('SELECT COUNT(*) AS newMessages FROM messages WHERE is_read = 0');
    } catch (err) {
      console.warn('Skipping messages query:', err.message);
    }

    const recentActivities = [
      'User JohnDoe registered',
      'New property listing uploaded',
      'Owner request approved',
      'Admin updated system settings',
    ];

    res.json({
      totalUsers: userCount.totalUsers,
      activeListings: listingCount.activeListings,
      pendingRequests: pendingCount.pendingRequests,
      newMessages: messageCount.newMessages,
      recentActivities,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err.message });
  }
});


// ⚙️ Load settings
app.get('/api/admin/settings', (req, res) => {
  const sql = 'SELECT * FROM admin_settings';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Settings fetch error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const settings = {};
    results.forEach(row => {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    });

    res.json(settings);
  });
});

// 💾 Save/update settings
app.post('/api/admin/settings', (req, res) => {
  const settings = req.body;

  const promises = Object.entries(settings).map(([key, value]) => {
    const jsonValue = JSON.stringify(value);
    return new Promise((resolve, reject) => {
      const sql = 'REPLACE INTO admin_settings (`key`, `value`) VALUES (?, ?)';
      db.query(sql, [key, jsonValue], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  Promise.all(promises)
    .then(() => res.json({ message: 'Settings saved' }))
    .catch((err) => {
      console.error('Settings save error:', err);
      res.status(500).json({ message: 'Error saving settings' });
    });
});


// =======================
// In your server.js or routes file
// =======================
// ✅ Route: Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await query('SELECT id, name, email, role, status FROM users');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});


// ✅ GET: /api/category-wise-products
app.get("/api/category-wise-products", (req, res) => {
  const { city } = req.query;

  let query = `
    SELECT category, id, title AS name, image, price, location
    FROM listings
    WHERE verified = 1
  `;

  if (city) {
    query += ` AND location = ${db.escape(city)}`;
  }

  query += ` ORDER BY id DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching listings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const grouped = {};
    results.forEach(item => {
      const category = item.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }

      if (grouped[category].length < 4) {
        grouped[category].push({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price
        });
      }
    });

    res.json(grouped);
  });
});




// ✅ GET: /api/latest-listings
app.get("/api/latest-listings", (req, res) => {
  const { city } = req.query;

  let query = `
    SELECT id, title, description, image, price, location
    FROM listings
    WHERE verified = 1
  `;

  if (city) {
    query += ` AND location = ${db.escape(city)}`;
  }

  query += ` ORDER BY id DESC LIMIT 8`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching latest listings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});


// backend index.js or server.js
app.get("/api/all-products", (req, res) => {
  const { city } = req.query;

  const listingQuery = `
    SELECT id, title, description, image, price, category, location, 'listings' AS source
    FROM listings
    WHERE verified = 1
    ${city ? `AND location = ${db.escape(city)}` : ''}
  `;

  const productQuery = `
    SELECT id, title, description, image, price, category, location, 'products' AS source
    FROM products
    WHERE verified = 1
    ${city ? `AND location = ${db.escape(city)}` : ''}
  `;

  const finalQuery = `
    (${listingQuery})
    UNION
    (${productQuery})
    ORDER BY id DESC
  `;

  db.query(finalQuery, (err, results) => {
    if (err) {
      console.error("Error fetching all products:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.get('/api/category/:name', (req, res) => {
  const category = req.params.name;
  const city = req.query.city;

  const listingsQuery = `
    SELECT id, title, price, description, image, location, 'listings' AS source 
    FROM listings 
    WHERE category = ${db.escape(category)} AND verified = 1
    ${city ? `AND location = ${db.escape(city)}` : ''}
  `;

  const productsQuery = `
    SELECT id, title, price, description, image, location, 'products' AS source 
    FROM products 
    WHERE category = ${db.escape(category)} AND verified = 1
    ${city ? `AND location = ${db.escape(city)}` : ''}
  `;

  const finalQuery = `${listingsQuery} UNION ${productsQuery} ORDER BY id DESC`;

  db.query(finalQuery, (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});


// 👉 GET a product by ID
// Single product from `products` table by ID
app.get('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ? AND verified = 1';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});


app.get('/api/listings/:id', (req, res) => {
  const listingId = req.params.id;

  const query = 'SELECT * FROM listings WHERE id = ? AND verified = 1';
  db.query(query, [listingId], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(results[0]);
  });
});

app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


// ✅ Place Order API (Only if logged in)
// Protected Route - Place Order
app.post('/api/orders', (req, res) => {
  const userHeader = req.headers['x-user'];
  if (!userHeader) {
    console.log("❌ No user header received.");
    return res.status(401).json({ message: 'Unauthorized: Login required' });
  }

  let user;
  try {
    user = JSON.parse(userHeader);
    if (!user.id) throw new Error("Missing user id");
  } catch (error) {
    console.log("❌ Invalid user header:", error.message);
    return res.status(400).json({ message: 'Invalid user data in header' });
  }

  const { name, email, address, city, zip, paymentMethod, cartItems = [] } = req.body;

  console.log("📥 Order received from user:", user);
  console.log("📦 Order body:", req.body);

// 🛠 Debug logs for validation
console.log("🛠 name:", name);
console.log("🛠 email:", email);
console.log("🛠 address:", address);
console.log("🛠 city:", city);
console.log("🛠 zip:", zip);
console.log("🛠 paymentMethod:", paymentMethod);
console.log("🛠 cartItems:", cartItems);
console.log("🛠 cartItems.length:", cartItems.length);

  if (!name || !email || !address || !city || !zip || !paymentMethod || !cartItems.length) {
    console.log("❌ Missing fields in request body");
    return res.status(400).json({ message: 'Missing required fields or empty cart' });
  }

  const sql = `
    INSERT INTO orders 
    (user_id, name, email, address, city, zip, payment_method, cart_items)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user.id,
    name,
    email,
    address,
    city,
    zip,
    paymentMethod,
    JSON.stringify(cartItems)
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Order insertion error:', err);
      return res.status(500).json({ message: 'Failed to place order' });
    }

    console.log('✅ Order inserted with ID:', result.insertId);
    res.status(201).json({ message: '✅ Order placed successfully!', orderId: result.insertId });
  });
});

app.get("/api/products/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;

  try {
  
    const rows = await query(
      "SELECT * FROM products WHERE owner_id = ?",
      [ownerId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching products for owner:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await query("DELETE FROM products WHERE id = ?", [productId]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    rent_price,
    category,
    image,
    condition,
    location,
    available,
    is_rentable,
    verified,
  } = req.body;

  try {
    const [result] = await query(
      `UPDATE products SET 
        title = ?, 
        description = ?, 
        price = ?, 
        rent_price = ?, 
        category = ?, 
        image = ?, 
        \`condition\` = ?, 
        location = ?, 
        available = ?, 
        is_rentable = ?, 
        verified = ? 
      WHERE id = ?`,
      [
        title,
        description,
        price,
        rent_price,
        category,
        image,
        condition,
        location,
        available,
        is_rentable,
        verified,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ POST /api/products — Upload Product

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      const ownerId = decoded.id;
      const {
        title,
        price,
        description,
        rent_price,
        category,
        condition,
        type,
        location,
      } = req.body;

      const imagePath = req.file ? req.file.path : null;

      const sql = `
        INSERT INTO products 
        (title, description, price, rent_price, image, category, \`condition\`, location, available, is_rentable, owner_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await query(sql, [
        title,
        description,
        price,
        rent_price || null,
        imagePath,
        category,
        condition,
        location || null,
        1, // available by default
        type === "rent" ? 1 : 0,
        ownerId,
      ]);

      res.status(201).json({ message: "Product uploaded successfully" });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
});




// ✅ PUT /api/products/:id — Update Product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, rent_price, category, location, condition } = req.body;

    const [result] = await query(
      `UPDATE products SET 
        title = ?, 
        price = ?, 
        rent_price = ?, 
        category = ?, 
        location = ?, 
        \`condition\` = ? 
      WHERE id = ?`,
      [title, price, rent_price, category, location, condition, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// ✅ Get Orders of Specific Owner
app.get("/api/orders/owner/:ownerId", async (req, res) => {
  const ownerId = Number(req.params.ownerId);
  if (!ownerId) return res.status(400).json({ error: "Invalid owner ID" });

  try {
    const allOrders = await query("SELECT * FROM orders");
    const ownerOrderItems = [];

    for (let order of allOrders) {
      const cartItems = JSON.parse(order.cart_items || "[]");

      for (let item of cartItems) {
        // ✅ Only for products table
        if (item.source === "products") {
          const productResult = await query(
            "SELECT id, title, owner_id FROM products WHERE id = ?",
            [item.product_id]
          );

          const product = productResult?.[0];
          if (product && product.owner_id === ownerId) {
            ownerOrderItems.push({
              order_id: order.order_id,
              product_id: product.id,
              product_title: product.title,
              customer_name: order.name,
              customer_email: order.email,
              quantity: item.quantity || 1, // default quantity = 1
              total_amount: (item.quantity || 1) * parseFloat(item.price || 0),

              status: item.status || "Pending",
              created_at: order.created_at,
            });
          }
        }
      }
    }

    res.json(ownerOrderItems);
  } catch (err) {
    console.error("❌ Owner order fetch error:", err);
    res.status(500).json({ error: "Failed to fetch owner orders" });
  }
});

// 🔐 Middleware for token verification
const authenticateOwner = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.owner = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// 🔧 PUT /api/owner/profile

// PUT /api/owner/profile
app.put("/api/owner/profile", authenticateOwner, async (req, res) => {
  const ownerId = req.owner.id; // `authenticateOwner` middleware से आया
  const { name, email, password } = req.body;

  try {
    let updateFields = "name = ?, email = ?";
    let values = [name, email];

    if (password && password.trim() !== "") {
      updateFields += ", password = ?";
      values.push(password); // plain-text password
    }

    values.push(ownerId); // WHERE id = ?

    const result = await query(
      `UPDATE owners SET ${updateFields} WHERE id = ?`,
      values
    );

    // Updated owner info return करो (excluding password)
    const [updated] = await query(
      "SELECT id, name, email FROM owners WHERE id = ?",
      [ownerId]
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Owner update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});




// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
