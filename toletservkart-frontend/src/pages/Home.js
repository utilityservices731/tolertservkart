import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const categoryProducts = {
  property: [
    { name: '1 BHK Flat', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' },
    { name: '2 BHK Apartment', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' },
    { name: 'PG for Boys', image: 'https://images.unsplash.com/photo-1590879096524-d77b7c5d7d50' },
    { name: 'PG for Girls', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' },
    { name: 'Shop for Rent', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' },
    { name: 'Commercial Space', image: 'https://images.unsplash.com/photo-1529603992223-418b25c3e7a2' },
    { name: 'Shared Room', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { name: 'Office Space', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0' },
  ],
  appliances: [
    { name: 'Refrigerator', image: 'https://images.unsplash.com/photo-1573883430021-facb3c87f724' },
    { name: 'Washing Machine', image: 'https://images.unsplash.com/photo-1592928302194-22442b2cd1c1' },
    { name: 'Microwave Oven', image: 'https://images.unsplash.com/photo-1616627560598-c89537a40e4a' },
    { name: 'Air Conditioner', image: 'https://images.unsplash.com/photo-1622815336180-5c7330b5c502' },
    { name: 'Water Purifier', image: 'https://images.unsplash.com/photo-1604081592481-37f1231c18c2' },
    { name: 'Geyser', image: 'https://images.unsplash.com/photo-1617957740630-80d3d3e3b96a' },
    { name: 'Vacuum Cleaner', image: 'https://images.unsplash.com/photo-1616628182505-3657aa3e4bb5' },
    { name: 'TV', image: 'https://images.unsplash.com/photo-1589987607627-7f9d6c6c169f' },
  ],
  dresses: [
    { name: 'Wedding Lehenga', image: 'https://images.unsplash.com/photo-1603572657034-4a93c0f34fd4' },
    { name: 'Sherwani', image: 'https://images.unsplash.com/photo-1613648788759-139c6f7a34d3' },
    { name: 'Party Gown', image: 'https://images.unsplash.com/photo-1603572657034-4a93c0f34fd4' },
    { name: 'Tuxedo Suit', image: 'https://images.unsplash.com/photo-1618641986557-10c3c45c7cc2' },
    { name: 'Designer Saree', image: 'https://images.unsplash.com/photo-1603572657034-4a93c0f34fd4' },
    { name: 'Blazer Set', image: 'https://images.unsplash.com/photo-1553528302-51b6ecfa0db9' },
    { name: 'Cocktail Dress', image: 'https://images.unsplash.com/photo-1616077168495-7f12e3a65ba1' },
    { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f' },
  ],
};

const Home = () => {
  return (
    <div className="container home-page">
      <div className="hero-section">
        <h1 className="home-title">Welcome to <span className="brand-highlight">ToletServKart</span></h1>
        <p className="home-subtitle">Your one-stop solution for renting & buying second-hand goods</p>
        <Link to="/category/property" className="explore-btn">Explore Now</Link>
      </div>

      <section className="category-section">
        <h2 className="section-heading">Browse Categories</h2>
        {Object.entries(categoryProducts).map(([category, items]) => (
          <div key={category} className="category-block">
            <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="category-list">
              {items.map((item, index) => (
                <Link key={index} to={`/category/${category}`} className="category-card">
                  <div className="category-content">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="category-image"
                      style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px' }}
                    />
                    <h4>{item.name}</h4>
                    <p>Best deals on {item.name.toLowerCase()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
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