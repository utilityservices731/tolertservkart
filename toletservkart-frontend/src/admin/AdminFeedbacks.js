import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/feedbacks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data || []);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Error deleting feedback:', err);
    }
  };

  const renderStars = (count) => {
    return (
      <span className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < count ? '#fbbf24' : '#d1d5db' }}>★</span>
        ))}
      </span>
    );
  };

  const averageRating = () => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  return (
    <div className="admin-main">
      <h1 className="admin-main-title">User Feedbacks</h1>

      <div className="feedback-summary-boxes">
        <div className="summary-card">
          <h4>Total Feedbacks</h4>
          <p>{feedbacks.length}</p>
        </div>
        <div className="summary-card">
          <h4>Average Rating</h4>
          <p>{averageRating()} / 5</p>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <div className="no-data-message">No feedbacks available.</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id}>
                  <td>{fb.userName}</td>
                  <td>{fb.message}</td>
                  <td>{renderStars(fb.rating)}</td>
                  <td>{fb.date}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(fb.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminFeedbacks;
