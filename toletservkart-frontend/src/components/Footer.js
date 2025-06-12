import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
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

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/property">Property</Link></li>
            <li><Link to="/home-appliances">Home Appliances</Link></li>
            <li><Link to="/dresses">Dresses</Link></li>
            <li><Link to="/upload">Post Ad</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/edit-profile">Edit Profile</Link></li>
            <li><Link to="/order-history">Order History</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* <li><Link to="/owner-login">Owner Login</Link></li>
            <li><Link to="/owner-register">Owner Register</Link></li>
            <li><Link to="/owner-dashboard">Owner Dashboard</Link></li>
            <li><Link to="/admin-login">Admin Login</Link></li>
            <li><Link to="/admin-register">Admin Register</Link></li>
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@toletservkart.com">support@toletservkart.com</a></p>
          <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
          <p>Address: 123, Main Street, Your City, India</p>
        </div>

      </div>

      {/* Bottom Note */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ToletServKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
