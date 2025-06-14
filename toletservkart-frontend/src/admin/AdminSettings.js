import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    adminEmail: '',
    darkMode: false,
    notificationsEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/settings')
      .then(res => setSettings(res.data || settings))
      .catch(err => console.error('Error loading settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/admin/settings', settings)
      .then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Hide after 3 sec
      })
      .catch(err => console.error('Error saving settings:', err));
  };

  return (
    <div className="admin-settings-container">
      <h2 className="admin-section-title">⚙️ Application Settings</h2>

      {loading ? (
        <p className="loading-text">Loading settings...</p>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="siteTitle">Site Title:</label>
            <input
              type="text"
              name="siteTitle"
              id="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminEmail">Admin Email:</label>
            <input
              type="email"
              name="adminEmail"
              id="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group toggle-group">
            <label htmlFor="notificationsEnabled">Enable Notifications:</label>
            <input
              type="checkbox"
              name="notificationsEnabled"
              id="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
            />
          </div>

          <div className="form-group toggle-group">
            <label htmlFor="darkMode">Dark Mode:</label>
            <input
              type="checkbox"
              name="darkMode"
              id="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
          </div>

          <button className="save-btn" type="submit">Save Settings</button>

          {saved && <p className="save-confirmation">✅ Settings saved successfully!</p>}
        </form>
      )}
    </div>
  );
}

export default AdminSettings;
