const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Admin Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admins[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admins[0].id, email: admins[0].email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token, admin: admins[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Dashboard Data
router.get('/dashboard', async (req, res) => {
  try {
    const [[userCount]] = await db.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [[listingCount]] = await db.query('SELECT COUNT(*) AS activeListings FROM products WHERE status = "active"');
    const [[pendingCount]] = await db.query('SELECT COUNT(*) AS pendingRequests FROM owner_requests WHERE status = "pending"');
    const [[messageCount]] = await db.query('SELECT COUNT(*) AS newMessages FROM messages WHERE is_read = 0');

    const recentActivities = [
      'User JohnDoe registered',
      'New property listing uploaded',
      'Owner request approved',
      'Admin updated system settings',
    ]; // You can make this dynamic from a logs table if needed

    res.json({
      totalUsers: userCount.totalUsers,
      activeListings: listingCount.activeListings,
      pendingRequests: pendingCount.pendingRequests,
      newMessages: messageCount.newMessages,
      recentActivities,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
});

module.exports = router;
