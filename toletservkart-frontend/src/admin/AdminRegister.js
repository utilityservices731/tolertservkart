import React, { useState } from 'react';
import '../App.css';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call for admin registration
    alert(`Registering admin: ${name}`);
  };

  return (
    <div className="admin-register container">
      <h2 className="register-title">Admin Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>

        <label htmlFor="name">Full Name</label>
        <input 
          id="name"
          type="text" 
          placeholder="Enter your full name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />

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
          placeholder="Enter a strong password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;
