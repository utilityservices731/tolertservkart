import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import categories from '../utils/categories'; // ✅ Import categories

const Header = () => {
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) setUser(JSON.parse(storedUser));

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);

    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) setCity(storedCity);
  }, []);

  const handleCityChange = (e) => {
    const selected = e.target.value;
    setCity(selected);
    localStorage.setItem('selectedCity', selected);
    window.location.reload(); // To re-fetch listings
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) queryParams.append('query', searchQuery.trim());
    if (city) queryParams.append('city', city);
    navigate(`/search?${queryParams.toString()}`);
    setSearchQuery('');
  };

  const handleUserClick = () => navigate('/dashboard');

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
              {/* Add more if needed */}
            </select>
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

            {user ? (
              <div
                className="d-flex align-items-center text-dark"
                style={{ cursor: 'pointer' }}
                onClick={handleUserClick}
              >
                <i className="fas fa-user-circle fs-5 me-1"></i>
                <span className="small">{user.name}</span>
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
