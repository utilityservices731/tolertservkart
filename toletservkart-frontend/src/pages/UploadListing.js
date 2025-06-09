import React, { useState } from 'react';
import '../App.css';

function UploadListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ad submitted! (Backend connection needed)');
  };

  return (
    <div className="container upload-page-wrapper">
      {/* Page Intro Content */}
      <section className="upload-intro">
        <h1>Post Your Rental Ad Easily</h1>
        <p>
          Use this form to quickly post your rental listings for properties, appliances, or dresses. Make sure to fill all fields carefully to attract interested buyers or renters. Your ad will be visible to verified users on the platform.
        </p>
      </section>

      {/* Main Upload Container */}
      <div className="upload-container">
        <h2 className="upload-title">Post Your Rental Ad</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input-field"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="textarea-field"
            rows={4}
          />
          <input
            type="text"
            name="price"
            placeholder="Price (e.g., ₹8000/month)"
            value={form.price}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="input-field"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="select-field"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="property">Property</option>
            <option value="appliances">Appliances</option>
            <option value="dresses">Dresses</option>
          </select>
          <button type="submit" className="submit-btn">Submit Ad</button>
        </form>
      </div>

      {/* Extra info below form */}
      <section className="upload-info">
        <h3>Tips for a Successful Ad</h3>
        <ul>
          <li>Write a clear and catchy title.</li>
          <li>Provide detailed description including features and condition.</li>
          <li>Set a reasonable price to attract buyers.</li>
          <li>Mention the exact location for better reach.</li>
          <li>Select the correct category to help users find your ad.</li>
        </ul>
      </section>
    </div>
  );
}

export default UploadListing;
