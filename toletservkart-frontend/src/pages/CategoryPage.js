import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import '../App.css';

const CategoryPage = () => {
  const { name } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();

        // Filter listings by category name (case-insensitive)
        const filtered = data.filter(item =>
          item.category.toLowerCase() === name.toLowerCase()
        );

        setListings(filtered);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [name]);

  return (
    <main className="container category-page">
      <section className="category-info-section">
        <h2 className="category-title">{categoryName} Listings</h2>
        <p className="category-description">
          Explore the best {categoryName.toLowerCase()} listings available in Lucknow from verified users.
        </p>
      </section>

      <div className="filters-container">
        <input type="text" placeholder="Search listings..." className="search-bar" />
        <select className="filter-select">
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="listings-grid">
          {listings.length > 0 ? (
            listings.map(item => (
              <Link to={`/listing/${item.id}`} key={item.id} className="listing-card">
                <div className="listing-image">
                  <img
                    src={`https://source.unsplash.com/300x180/?${item.image},product`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <FaHeart className="wishlist-icon" />
                  <span className="badge">
                    <FaCheckCircle /> Verified
                  </span>
                </div>
                <div className="listing-info">
                  <h3 className="listing-title">{item.title}</h3>
                  <p className="listing-price">₹ {item.price}</p>
                  <p className="listing-location">{item.location}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-listings">No listings found in this category.</p>
          )}
        </section>
      )}
    </main>
  );
};

export default CategoryPage;
