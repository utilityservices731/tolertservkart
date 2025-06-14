import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminApproveRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/requests/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/requests/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="admin-main">
      <h1 className="admin-main-title">Pending Approval Requests ({requests.length})</h1>

      {loading ? (
        <p className="loading-text">Loading requests...</p>
      ) : requests.length === 0 ? (
        <div className="no-requests">
          <p>No pending requests found.</p>
        </div>
      ) : (
        <div className="admin-requests-grid">
          {requests.map((req) => (
            <div className="admin-request-card" key={req.id}>
              <img
                src={req.image || 'https://via.placeholder.com/300x200'}
                alt="Request"
                className="request-img"
              />
              <div className="request-details">
                <h3>{req.title || 'Untitled'}</h3>
                <p><strong>Owner:</strong> {req.ownerName || 'Unknown'}</p>
                <p><strong>Type:</strong> {req.type || 'N/A'}</p>
                <p><strong>Posted On:</strong> {req.date || 'N/A'}</p>
                <div className="request-buttons">
                  <button className="btn-approve" onClick={() => handleApprove(req.id)}>Approve</button>
                  <button className="btn-reject" onClick={() => handleReject(req.id)}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminApproveRequests;
