import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">ToletServKart</Link>
        </div>

        <div className="location-input">
          <input
            type="text"
            placeholder="Enter area or pincode in Lucknow"
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/category/property">Property (Rent)</Link>
          <Link to="/category/appliances">Home Appliances</Link>
          <Link to="/category/dresses">Dresses</Link>
          <Link to="/upload">Post Ad</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
