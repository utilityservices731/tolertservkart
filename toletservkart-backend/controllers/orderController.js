const db = require('../config/db');

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
