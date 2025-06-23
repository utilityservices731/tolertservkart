import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            password: '',
            bio: data.bio || ''
          });
        } else {
          setError(data.message || 'Failed to fetch user');
        }
      } catch (err) {
        setError('Error fetching user data.');
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUpdated(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setUpdated(true);
        setError('');
      } else {
        setError(data.message || 'Update failed.');
      }
    } catch (err) {
      setError('Something went wrong while updating.');
    }
  };

  return (
    <>
      <Header />

      <div className="profile-container">
        <h2 className="profile-title">Edit Profile</h2>
        <p className="profile-subtitle">
          Keep your profile updated to get better responses and trust!
        </p>

        <div className="profile-info-section">
          <h3>About This Section</h3>
          <p>
            In this section, you can update your personal details like name, email, password, and a short bio.
            Keeping your profile information up-to-date helps others know you better and increases trust when
            you interact on the platform.
          </p>
        </div>

        {updated && <div className="profile-success">✅ Your profile has been updated successfully!</div>}
        {error && <div className="profile-error">❌ {error}</div>}

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

      <Footer />
    </>
  );
}

export default EditProfile;
