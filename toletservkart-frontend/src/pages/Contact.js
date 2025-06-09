// src/pages/Contact.js
import React, { useState } from "react";
import "../App.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-top-info">
        <h1>Get in Touch with ToletServKart</h1>
        <p>
          We’re here to help you with all your rental needs – from home appliances and properties to party wear dresses.
          If you have questions, suggestions, or want to collaborate, just drop us a message or visit our office.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            />
            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info-section">
          <h3>Our Office</h3>
          <p><strong>ToletServKart Pvt. Ltd.</strong></p>
          <p>123 Urban Complex, Gomti Nagar, Lucknow, India</p>
          <p>Email: support@toletservkart.in</p>
          <p>Phone: +91-9876543210</p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="contact-map">
        <iframe
          title="ToletServKart Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.865223141103!2d80.999321!3d26.8489024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2b8500f5f1d%3A0x1c6e9e4df1cc4010!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1717572112222!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px", marginTop: "40px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
