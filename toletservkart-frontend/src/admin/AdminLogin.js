import React, { useState } from 'react';
import '../App.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call for admin login
    alert(`Logging in with email: ${email}`);
  };

  return (
    <div className="admin-login container">
      <h2 className="login-title">Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input 
          id="email"
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <div className="forgot-password">
          <a href="/admin-forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
