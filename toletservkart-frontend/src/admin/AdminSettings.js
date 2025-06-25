import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    adminEmail: '',
    supportEmail: '',
    contactNumber: '',
    darkMode: false,
    notificationsEnabled: true,
    maintenanceMode: false,
    itemsPerPage: 9,
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
        setTimeout(() => setSaved(false), 3000);
      })
      .catch(err => console.error('Error saving settings:', err));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="text-primary mb-4 text-center">⚙️ Admin Settings Panel</h2>

            {loading ? (
              <p className="text-center text-muted">Loading settings...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Site Title */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Site Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="siteTitle"
                    value={settings.siteTitle}
                    onChange={handleChange}
                    required
                    placeholder="Your Website Name"
                  />
                </div>

                {/* Admin Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Admin Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="adminEmail"
                    value={settings.adminEmail}
                    onChange={handleChange}
                    required
                    placeholder="admin@example.com"
                  />
                </div>

                {/* Support Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Support Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="supportEmail"
                    value={settings.supportEmail}
                    onChange={handleChange}
                    placeholder="support@example.com"
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactNumber"
                    value={settings.contactNumber}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Items Per Page */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Items Per Page</label>
                  <input
                    type="number"
                    className="form-control"
                    name="itemsPerPage"
                    min={1}
                    value={settings.itemsPerPage}
                    onChange={handleChange}
                    placeholder="e.g. 9"
                  />
                </div>

                {/* Toggles */}
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="notificationsEnabled"
                    id="notificationsEnabled"
                    checked={settings.notificationsEnabled}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="notificationsEnabled">
                    Enable Email Notifications
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="darkMode"
                    id="darkMode"
                    checked={settings.darkMode}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="darkMode">
                    Enable Dark Mode for Admin
                  </label>
                </div>

                <div className="form-check form-switch mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="maintenanceMode"
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="maintenanceMode">
                    Enable Maintenance Mode
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  💾 Save Settings
                </button>

                {saved && (
                  <div className="alert alert-success mt-3 text-center">
                    ✅ Settings saved successfully!
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
 