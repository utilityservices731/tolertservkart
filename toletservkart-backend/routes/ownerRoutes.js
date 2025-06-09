const express = require('express');
const router = express.Router();
const { registerOwner, loginOwner } = require('../controllers/ownerController');

// Owner Register
router.post('/register', registerOwner);

// Owner Login
router.post('/login', loginOwner);

module.exports = router;
