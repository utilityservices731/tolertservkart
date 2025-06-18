import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleUserClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="header shadow-sm py-2 bg-white">
      <div className="container header-container d-flex justify-content-between align-items-center">
        {/* 🔰 Logo */}
        <div className="logo">
          <Link to="/" className="fs-4 fw-bold text-dark text-decoration-none">ToletServKart</Link>
        </div>

        {/* 📍 Location input */}
        <div className="location-input mx-3 flex-grow-1">
          <input
            type="text"
            className="form-control"
            placeholder="Enter area or pincode in Lucknow"
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        {/* 🔗 Navigation */}
        <nav className="nav-links d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none text-dark">Home</Link>
          <Link to="/category/property" className="text-decoration-none text-dark">Property</Link>
          <Link to="/category/appliances" className="text-decoration-none text-dark">Appliances</Link>
          <Link to="/category/dresses" className="text-decoration-none text-dark">Dresses</Link>
          <Link to="/upload" className="text-decoration-none text-dark">Post Ad</Link>

          {/* 🛒 Cart Link */}
          <Link to="/cart" className="position-relative text-decoration-none text-dark">
            <i className="fas fa-shopping-cart fs-5"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 👤 User */}
          {user ? (
            <div
              className="user-info d-flex align-items-center gap-1 ms-2"
              onClick={handleUserClick}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-user-circle fs-5"></i>
              <span>{user.name}</span>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-primary btn-sm ms-2">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
