import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationContext from '../context/LocationContext';

const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [listings, setListings] = useState([]);

  // ✅ Get city and pincode from context
  const { city, pincode } = useContext(LocationContext);

  useEffect(() => {
    const params = {};
    if (city) params.city = city;
    if (pincode) params.pincode = pincode;

    axios
      .get("http://localhost:5000/api/category-wise-products", { params })
      .then(res => setCategoryProducts(res.data))
      .catch(err => console.error("Category fetch error", err));
  }, [city, pincode]);

  useEffect(() => {
    const params = {};
    if (city) params.city = city;
    if (pincode) params.pincode = pincode;

    axios
      .get("http://localhost:5000/api/latest-listings", { params })
      .then(res => setListings(res.data))
      .catch(err => console.error("Listings fetch error", err));
  }, [city, pincode]);

  return (
    <>
      <Header />

      <div className="container home-page">
        {/* Hero Section */}
        <div className="hero-section text-center my-5">
          <h1 className="home-title">
            Welcome to <span className="brand-highlight">ToletServKart</span>
          </h1>
          <p className="home-subtitle">
            Your one-stop solution for renting & buying second-hand goods
          </p>
          <Link to="/explore-all" className="explore-btn">Explore Now</Link>
        </div>

        {/* Category Section */}
        <section className="container my-5">
          <h2 className="mb-4 fw-bold text-center">🗂️ Browse Categories</h2>

          {Object.entries(categoryProducts).length === 0 ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading categories...</p>
            </div>
          ) : (
            Object.entries(categoryProducts).map(([category, items]) => (
              <div key={category} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                  <Link to={`/category/${category}`} className="text-decoration-none fw-medium text-primary">
                    View All →
                  </Link>
                </div>

                <div className="row g-4">
                  {items.slice(0, 4).map((item, index) => (
                    <div className="col-sm-6 col-md-3" key={index}>
                      <Link
                        to={`/listing/${item.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="card h-100 shadow-sm category-card-hover">
                          <img
                            src={item.image}
                            alt={item.name || category}
                            className="card-img-top"
                           
                          />
                          <div className="card-body text-center">
                            <h6 className="card-title">{item.name}</h6>
                            <p className="text-muted small mb-0">Best deals on {item.name?.toLowerCase()}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Latest Listings Section */}
        <section className="latest-listings my-5">
          <h2 className="section-heading text-center mb-4">📢 Latest Listings</h2>
          <div className="row g-4">
            {listings.length === 0 ? (
              <p className="text-center">No products listed yet.</p>
            ) : (
              listings.map((item) => (
                <div key={item.id} className="col-sm-6 col-md-3">
                  <Link to={`/listing/${item.id}`} className="text-decoration-none text-dark">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="card-img-top"
                        
                      />
                      <div className="card-body text-center">
                        <h5>{item.title}</h5>
                        <p className="text-muted small">{item.description}</p>
                        <p><strong>₹{item.price}</strong></p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works my-5">
          <h2 className="section-heading text-center">⚙️ How It Works</h2>
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <h4>1. Browse</h4>
              <p>Explore categories and find what suits your needs.</p>
            </div>
            <div className="col-md-4">
              <h4>2. Contact</h4>
              <p>Connect with the seller or renter directly through the platform.</p>
            </div>
            <div className="col-md-4">
              <h4>3. Rent or Buy</h4>
              <p>Finalize the deal and enjoy the product or service.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
