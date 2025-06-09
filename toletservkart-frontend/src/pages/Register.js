import React, { useState } from 'react';
import '../App.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Company Info Section OUTSIDE the form container */}
      <section className="about-company register-about">
        <h2>Welcome to ToletServKart!</h2>
        <p>
          <strong>ToletServKart</strong> is your trusted platform for renting properties, appliances, and fashion dresses across India.
          We bring together verified sellers and genuine buyers, ensuring quality service and best deals for everyone.
        </p>
        <p>
          Create your account to manage your listings, track responses, and unlock personalized offers designed just for you.
        </p>
      </section>

      <div className="container register-container">
        <h2 className="register-title">Create Your Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="input-field"
            onChange={handleChange}
          />
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
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/login" className="login-link">Login here</a>
        </p>
      </div>
    </>
  );
}

export default Register;
