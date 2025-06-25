// ✅ Updated CategoryPage.js with city-based filtering and layout improvements

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryPage = () => {
  const { name } = useParams();
const normalizedName = name.toLowerCase(); // 🔁 normalize

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Latest');
  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);
  const selectedCity = localStorage.getItem('selectedCity');

  useEffect(() => {
    const fetchListings = async () => {
      try {
      let url = `http://localhost:5000/api/listings?category=${normalizedName}`;

        if (selectedCity) url += `&city=${selectedCity}`;

        const response = await fetch(url);
        const data = await response.json();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [name]);

  useEffect(() => {
    const filtered = listings.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [searchTerm, listings]);

  useEffect(() => {
    let sorted = [...filteredListings];
    if (sortOption === 'Price: Low to High') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...listings];
    }
    setFilteredListings(sorted);
  }, [sortOption]);

  return (
    <>
      <Header />

      <main className="container py-4">
        <section className="mb-4">
          <h2 className="fw-bold">{categoryName} Listings</h2>
          <p className="text-muted">
            Explore the best {categoryName.toLowerCase()} listings{selectedCity ? ` in ${selectedCity}` : ''} from verified users.
          </p>
        </section>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select w-auto ms-3"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <div className="row g-4">
  {filteredListings.length > 0 ? (
    filteredListings.map(item => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
    <Link
  to={item.source === 'products' ? `/product/${item.id}` : `/listing/${item.id}`}
  className="text-decoration-none text-dark"
>

          <div className="card h-100 border-0 shadow rounded-4">
            
            {/* 🖼️ Image Container */}
            <div className="position-relative">
              <div
                style={{
                  height: '260px',
                  backgroundColor: '#f8f9fa',
                  overflow: 'hidden',
                  borderTopLeftRadius: '1rem',
                  borderTopRightRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/300x180?text=No+Image'}
                  alt={item.title}
                  className="img-fluid w-100"
                  
                />
              </div>

              {/* ❤️ Wishlist Icon */}
              <FaHeart
                className="position-absolute top-0 end-0 m-2 text-danger"
                style={{
                  fontSize: '1.2rem',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  padding: '5px',
                }}
              />

              {/* ✅ Verified Badge */}
              <span className="position-absolute top-0 start-0 m-2 badge bg-success d-flex align-items-center gap-1 px-2 py-1 rounded-pill">
                <FaCheckCircle style={{ fontSize: '0.9rem' }} /> Verified
              </span>
            </div>

            {/* 📄 Card Body */}
            <div className="card-body text-center">
              <h6 className="card-title mb-1 fw-semibold text-truncate">{item.title}</h6>
              <p className="text-muted small mb-1">{item.location}</p>
              <p className="fw-bold text-primary fs-6 mb-0">₹{item.price}</p>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <div className="col-12">
      <div className="alert alert-warning text-center">
        No listings found in this category.
      </div>
    </div>
  )}
</div>

        )}
      </main>

      <Footer />
    </>
  );
};

export default CategoryPage;