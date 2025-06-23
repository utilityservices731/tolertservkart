import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure your CSS is updated as below

const Header = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) setUser(JSON.parse(storedUser));

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, []);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleUserClick = () => navigate('/dashboard');

  return (
    <header className="header">
      <div className="container header-container">
        {/* 🔰 Logo */}
        <div className="logo">
          <Link to="/">ToletServKart</Link>
        </div>

        {/* 📍 Location */}
        <div className="location-input">
          <input
            type="text"
            placeholder="Enter area or pincode in Lucknow"
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        {/* 🔍 Search */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search products or listings..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit"><i className="fas fa-search"></i></button>
        </form>

        {/* 🔗 Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/category/property">Property</Link>
          <Link to="/category/appliances">Appliances</Link>
          <Link to="/category/dresses">Dresses</Link>
          <Link to="/upload">Post Ad</Link>

          {/* 🛒 Cart */}
          <Link to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* 👤 User */}
          {user ? (
            <div className="user-info" onClick={handleUserClick}>
              <i className="fas fa-user-circle"></i>
              <span>{user.name}</span>
            </div>
          ) : (
            <Link to="/login" className="btn-login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
