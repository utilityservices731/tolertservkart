// src/pages/EditProfile.js
import React, { useState } from 'react';
import '../App.css';


const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully! (Backend integration needed)');
    console.log(formData);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Edit Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          className="profile-input"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          className="profile-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="profile-input"
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="profile-input"
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          className="profile-textarea"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit" className="profile-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
