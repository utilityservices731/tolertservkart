import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/admins/register", {
        name,
        email,
        password,
      });

      alert(response.data.message || "Admin registered successfully");
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="admin-register-page">
      <div className="admin-info-box">
        <h1>Welcome to Admin Panel</h1>
        <p>Register as an admin to manage users, products, and orders from a central dashboard. Ensure all fields are correctly filled.</p>
      </div>

      <div className="admin-register-form">
        <h2 className="register-title">Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
