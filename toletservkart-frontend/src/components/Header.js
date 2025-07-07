import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import categories from '../utils/categories';
import LocationContext from '../context/LocationContext';

const Header = () => {
  const navigate = useNavigate();

  // ✅ Get city & pincode from Context
  const { city, setCity, pincode, setPincode } = useContext(LocationContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) setUser(JSON.parse(storedUser));
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchQuery.trim()) query.set('query', searchQuery.trim());
    // Optionally include city/pincode in search URL for SEO or filtering
    if (city) query.set('city', city);
    if (pincode) query.set('pincode', pincode);
    navigate(`/search?${query.toString()}`);
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-bottom shadow-sm py-2">
      <div className="container-fluid">
        <div className="row align-items-center gy-2">

          {/* 🔰 Logo */}
          <div className="col-auto">
            <Link to="/" className="navbar-brand fw-bold fs-4 text-primary text-decoration-none">
              ToletServKart
            </Link>
          </div>

          {/* 📍 City Select */}
          <div className="col-auto">
            <select
              className="form-select form-select-sm"
              style={{ width: '140px' }}
              value={city}
              onChange={handleCityChange}
            >
              <option value="Lucknow">Lucknow</option>
              {/* Add more cities here */}
            </select>
          </div>

          {/* 📍 Pincode Input */}
          <div className="col-auto">
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: "120px" }}
              placeholder="Pincode"
              value={pincode}
              onChange={handlePincodeChange}
            />
          </div>

          {/* 🔍 Search Bar */}
          <div className="col-md">
            <form onSubmit={handleSearchSubmit} className="d-flex">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-sm btn-outline-primary ms-2" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* 🔗 Navigation Links */}
          <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
            <Link to="/" className="text-dark small text-decoration-none">Home</Link>
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/category/${cat.slug}`}
                className="text-dark small text-decoration-none"
              >
                {cat.label}
              </Link>
            ))}
            <Link to="/upload" className="btn btn-sm btn-success">Post Ad</Link>
          </div>

          {/* 🛒 Cart + 👤 User */}
          <div className="col-auto d-flex align-items-center gap-3">
            <Link to="/cart" className="position-relative text-dark">
              <i className="fas fa-shopping-cart fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 👤 User Dropdown or Login Dropdown */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle me-1"></i>
                  {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-primary dropdown-toggle"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                  <li>
                    <Link className="dropdown-item" to="/login">User Login</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/owner-login">Owner Login</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
