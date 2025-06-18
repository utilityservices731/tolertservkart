import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔹 Load cart items on component mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const payload = {
    ...formData,
    cartItems,
  };

  console.log("📦 Sending order to backend:", payload);
  console.log("👤 With user header:", userData);

  if (!userData) {
    setMessage("❌ You must be logged in to place an order.");
    setLoading(false);
    return;
  }

  if (cartItems.length === 0) {
    setMessage("❌ Your cart is empty.");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:5000/api/orders',
      payload,
      {
        headers: {
          'x-user': JSON.stringify(userData),
          'Content-Type': 'application/json', // ✅ Add this!
        },
      }
    );

    console.log("✅ Order response:", response.data);

    if (response.status === 201) {
      setMessage('✅ Order placed successfully!');
      localStorage.removeItem('cart');
      setCartItems([]);
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
    console.error('❌ Order submission error:', error.response?.data || error.message);
    setMessage('❌ Failed to place order. Please try again.');
  } finally {
    setLoading(false);
  }
};



  // 🔸 Return early if cart is empty
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container my-5 text-center">
          <h4 className="text-muted">🛒 Your cart is empty.</h4>
          <a href="/" className="btn btn-primary mt-3">⬅ Go Back</a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card shadow p-4">
              <h3 className="text-center mb-3 fw-bold">🔒 Secure Checkout</h3>
              <p className="text-center text-muted mb-4">
                Fill in your details below to complete your order.
              </p>

              {/* 🛒 Cart Items Display */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold">🛍️ Items You’re Renting:</h5>
                <ul className="list-group mb-3">
                  {cartItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.title}</span>
                      <span className="text-success fw-bold">₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-end fw-bold">
                  Total: ₹{cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}
                </div>
              </div>

              {/* 📝 Checkout Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>

              {message && (
                <div
                  className={`alert mt-4 ${
                    message.includes('✅') ? 'alert-success' : 'alert-danger'
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <div className="mt-4 small text-muted">
                <p>
                  <strong>Note:</strong> This is a demo checkout. No real payment will be processed.
                </p>
              </div>

              {/* 🔑 Login/Register Prompt if not logged in */}
              {!localStorage.getItem('userData') && (
                <div className="mt-3 text-center">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary">Login here</a>
                  </p>
                  <p className="text-muted">
                    New here?{' '}
                    <a href="/register" className="text-success">Register now</a>
                  </p>
                </div>
                
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
