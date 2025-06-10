import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for redirect after login
import '../App.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // Save token in localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));

        alert('Login successful!');
        navigate('/'); // Navigate to home or user dashboard
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Company About Section */}
      <section className="about-company">
        <p>
          <strong>ToletServKart</strong> is your one-stop platform to rent properties,
          appliances, and fashion dresses easily. We connect verified sellers with genuine buyers across India,
          helping people save money while getting quality service.
        </p>
        <p>
          Login to manage your ads, track responses, and explore personalized deals.
        </p>
      </section>

      {/* Login Form */}
      <div className="container login-container">
        <h2 className="login-title">Login to ToletServKart</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input-field"
            onChange={handleChange}
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/register" className="signup-link">Register here</a>
        </p>
      </div>
    </>
  );
}

export default Login;
