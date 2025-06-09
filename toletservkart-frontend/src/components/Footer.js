import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <h3>ToletServKart</h3>
          <p>Your trusted platform for renting and buying Property, Home Appliances, and Dresses.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/property">Property</Link></li>
            <li><Link to="/category/appliances">Home Appliances</Link></li>
            <li><Link to="/category/dresses">Dresses</Link></li>
            <li><Link to="/upload">Post Ad</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/edit-profile">Edit Profile</Link></li>
            <li><Link to="/order-history">Order History</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/admin-login">Admin Login</Link></li>
            <li><Link to="/admin-register">Admin Register</Link></li>
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/owner-login">Owner Login</Link></li>
            <li><Link to="/owner-register">Owner Register</Link></li>
            <li><Link to="/owner-dashboard">Owner Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@toletservkart.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, Main Street, Your City</p>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2025 ToletServKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
