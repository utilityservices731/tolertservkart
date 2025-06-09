// src/pages/AboutUs.js
import React from "react";
import "../App.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
            alt="Rental Service"
          />
        </div>
        <div className="about-text">
          <h1>Welcome to ToletServKart</h1>
          <p>
            ToletServKart is your trusted digital platform to rent or lend daily-use items such as furniture, home appliances, dresses, and even property! Whether you want to save money or earn from your idle assets – this is your destination.
          </p>
          <p>
            We aim to reduce waste, promote sustainable choices, and make everyday life easier for students, families, and professionals alike.
          </p>
          <p>
            With verified users, secure transactions, and an easy-to-use platform, we ensure that renting is always a better alternative to buying.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-values">
        <h2>What Makes Us Different?</h2>
        <div className="value-cards">
          <div className="value-card">
            <i className="fas fa-rupee-sign"></i>
            <h3>Affordable Solutions</h3>
            <p>Access high-quality items without breaking the bank — rent smart, live better.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-user-shield"></i>
            <h3>Verified Listings</h3>
            <p>All users and products go through verification to maintain trust and safety.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-globe-asia"></i>
            <h3>Eco-Friendly</h3>
            <p>We support the planet by reducing consumerism and encouraging reuse.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
