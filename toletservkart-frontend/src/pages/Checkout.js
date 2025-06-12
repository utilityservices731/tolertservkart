import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);

      if (response.status === 201) {
        setMessage('✅ Order placed successfully!');
        setFormData({
          name: '',
          email: '',
          address: '',
          city: '',
          zip: '',
          paymentMethod: 'card',
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setMessage('❌ Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        {/* Info Section */}
        <div className="checkout-intro">
          <h2 className="checkout-title">🔒 Secure Checkout</h2>
          <p className="checkout-description">
            Please fill out the details below to complete your order.
            Ensure your delivery address is correct. We offer UPI, card, and cash on delivery options.
          </p>
        </div>

        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Full Address"
            required
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            required
            value={formData.zip}
            onChange={handleChange}
          />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <button type="submit" className="pay-btn" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        {/* Response Message */}
        {message && <p className="checkout-message">{message}</p>}

        {/* Note Section */}
        <div className="checkout-note">
          <p><strong>Note:</strong> This is a demo checkout. Payment gateway is not connected. For any issues, contact us via the Contact page.</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
