import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully! (Payment gateway not connected)');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-intro">
        <h2 className="checkout-title">Checkout</h2>
        <p className="checkout-description">
          Please fill out the details below to complete your order. Make sure your delivery address is correct. You can choose from multiple payment options including UPI, cards, and Cash on Delivery.
        </p>
      </div>

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
          placeholder="Address"
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
        <button type="submit" className="pay-btn">
          Place Order
        </button>
      </form>

      <div className="checkout-note">
        <p><strong>Note:</strong> This is a demo checkout. Payment gateway is not connected. For any issues or queries, contact support via the Contact Us page.</p>
      </div>
    </div>
  );
}

export default Checkout;
