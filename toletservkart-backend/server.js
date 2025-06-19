const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
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
app.get('/api/listings', async (req, res) => {
  try {
    const results = await query('SELECT * FROM listings');
    res.json(results);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: 'Database error' });
  }
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
  const query = `
    SELECT 
      category,
      id,
      title AS name,
      image,
      price
    FROM listings
    WHERE verified = 1
    ORDER BY id DESC
  `;

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
  const query = `
    SELECT 
      id, title, description, image, price, location
    FROM listings
    WHERE verified = 1
    ORDER BY id DESC
    LIMIT 8
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching latest listings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

// backend index.js or server.js
app.get('/api/all-products', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products WHERE available = true');
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

app.get('/api/products', async (req, res) => {
  const products = await Product.find(); // or filter by category etc.
  res.json(products);
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


// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
