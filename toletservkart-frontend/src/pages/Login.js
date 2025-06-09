import React, { useState } from 'react';
import '../App.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Company About Section OUTSIDE container */}
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

      {/* Login Form INSIDE container */}
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
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/register" className="signup-link">Register here</a>
        </p>
      </div>
    </>
  );
}

export default Login;
