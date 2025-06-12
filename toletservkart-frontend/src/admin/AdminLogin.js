import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Add this line
import '../App.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/admins/login", {
        email,
        password,
      });

      alert(response.data.message || "Login successful");

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(response.data.admin));

      // ✅ Redirect to Admin Dashboard
      navigate('/admin-dashboard'); // 👈 Redirect here

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
  <div className="admin-login-page">
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="login-title">Welcome Back, Admin</h2>
        <p className="login-subtext">Sign in to access your dashboard</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <div className="input-icon-wrapper">
            <input 
              id="email"
              type="email"
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <span className="input-icon">@</span>
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-icon-wrapper">
            <input 
              id="password"
              type="password"
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <span className="input-icon">🔒</span>
          </div>

          <div className="forgot-password">
            <a href="/admin-forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  </div>
);

}

export default AdminLogin;
