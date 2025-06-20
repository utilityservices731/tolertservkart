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
        condition = ?, 
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

    await query(
      `UPDATE products SET title=?, price=?, rent_price=?, category=?, location=?, condition=? WHERE id=?`,
      [title, price, rent_price, category, location, condition, id]
    );

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product" });
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
