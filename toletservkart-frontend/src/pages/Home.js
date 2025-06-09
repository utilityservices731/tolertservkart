import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const categories = [
  { name: 'property', label: 'Property' },
  { name: 'appliances', label: 'Home Appliances' },
  { name: 'dresses', label: 'Dresses' },
  // { name: 'furniture', label: 'Furniture' },
  // { name: 'electronics', label: 'Electronics' },
  // { name: 'wedding', label: 'Wedding Wear' },
];

const Home = () => {
  return (
    <div className="container home-page">
      <div className="hero-section">
        <h1 className="home-title">Welcome to ToletServKart</h1>
        <p className="home-subtitle">Your one-stop solution for renting & buying second-hand goods</p>
        <Link to="/category/property" className="explore-btn">Explore Now</Link>
      </div>

      <section className="category-section">
        <h2 className="section-heading">Browse Categories</h2>
        <div className="category-list">
          {categories.map(({ name, label }) => (
            <Link key={name} to={`/category/${name}`} className="category-card">
              <div className="category-content">
                <h3>{label}</h3>
                <p>Find best deals on {label.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-heading">How It Works</h2>
        <div className="steps">
          <div className="step">
            <h4>1. Browse</h4>
            <p>Explore categories and find what suits your need.</p>
          </div>
          <div className="step">
            <h4>2. Contact</h4>
            <p>Connect with the seller or renter instantly.</p>
          </div>
          <div className="step">
            <h4>3. Rent or Buy</h4>
            <p>Finalize the deal and enjoy the product/service.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
