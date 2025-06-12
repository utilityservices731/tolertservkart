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
    <div className="register-bg">
      <div className="glass-card">
        <h2 className="register-heading">🚀 Join ToletServKart</h2>
        <p className="register-subtext">
          Create your free account to explore listings, post ads, and unlock exciting features.
        </p>

        <form className="register-form-modern" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-modern">Register Now</button>
        </form>

        <p className="login-bottom-text">
          Already registered? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
