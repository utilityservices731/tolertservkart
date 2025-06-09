import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
  const [selectedLocation, setSelectedLocation] = useState('Select Location');

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">ToletServKart</Link>
        </div>

        <div className="location-select">
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option disabled>Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
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