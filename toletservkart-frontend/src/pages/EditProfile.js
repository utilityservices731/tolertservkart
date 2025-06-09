import React, { useState } from 'react';
import '../App.css';

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const [updated, setUpdated] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setUpdated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdated(true);
  };

  return (
  <div className="profile-container">
    <h2 className="profile-title">Edit Profile</h2>
    <p className="profile-subtitle">Keep your profile updated to get better responses and trust!</p>

   
    <div className="profile-info-section">
      <h3>About This Section</h3>
      <p>
        In this section, you can update your personal details like name, email, password, and a short bio.
        Keeping your profile information up-to-date helps others know you better and increases trust when
        you interact on the platform. Your password can be changed here for security purposes.
      </p>
    </div>

    {updated && <div className="profile-success">✅ Your profile has been updated successfully!</div>}

    
    <form className="profile-form" onSubmit={handleSubmit}>
      <input
        className="profile-input"
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className="profile-input"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="profile-input"
        type="password"
        name="password"
        placeholder="Change password (optional)"
        value={formData.password}
        onChange={handleChange}
      />
      <textarea
        className="profile-textarea"
        name="bio"
        placeholder="Write a short bio about yourself (optional)"
        value={formData.bio}
        onChange={handleChange}
      ></textarea>

      <button className="profile-btn" type="submit">Update</button>
    </form>
  </div>
);

}

export default EditProfile;
