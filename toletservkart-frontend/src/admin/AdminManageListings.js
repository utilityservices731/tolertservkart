import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminManageListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:5000/api/admin/listings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings(res.data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings((prev) => prev.filter((item) => item.id !== id));
      alert('Listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing.');
    }
  };

  return (
    <div className="admin-main-content" style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h2 className="dashboard-header" style={{ marginBottom: '20px' }}>
        Manage All Listings ({listings.length})
      </h2>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <div className="no-data-message">No listings found.</div>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div className="listing-card" key={listing.id}>
              <img
                src={listing.image || 'https://via.placeholder.com/300x200'}
                alt="Listing"
                className="listing-img"
              />
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p><strong>Price:</strong> ₹{listing.price}</p>
                <p><strong>Location:</strong> {listing.location}</p>
                <div className="listing-actions">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(listing.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminManageListings;
