import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminManageListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingListingId, setEditingListingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/listings');
      setListings(res.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/listings/${id}`);
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      } catch (err) {
        console.error('Error deleting listing:', err);
        alert("Failed to delete listing.");
      }
    }
  };

  const handleEdit = (listing) => {
    setEditingListingId(listing.id);
    setEditedData({ ...listing });
  };

  const handleCancel = () => {
    setEditingListingId(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/listings/${editingListingId}`, editedData);
      setListings((prev) =>
        prev.map((l) => (l.id === editingListingId ? { ...l, ...editedData } : l))
      );
      setEditingListingId(null);
      setEditedData({});
    } catch (err) {
      console.error('Error saving listing:', err);
      alert("Failed to update listing.");
    }
  };

  return (
    <div className="admin-main-content p-3 bg-light min-vh-100">
      <h3 className="mb-4">All Listings ({listings.length})</h3>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
  <tr>
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Price</th>
    <th>Location</th>
    <th>Category</th>
    <th>Subcategory</th>
    <th>Image</th>
    <th>Verified</th>
    {/* <th>Created At</th> */}
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {listings.map((l) => (
    <tr key={l.id}>
      <td>{l.id}</td>
      <td>{editingListingId === l.id ? <input className="form-control" value={editedData.title || ''} onChange={(e) => handleChange('title', e.target.value)} /> : l.title}</td>
      <td>{editingListingId === l.id ? <textarea className="form-control" value={editedData.description || ''} onChange={(e) => handleChange('description', e.target.value)} /> : l.description}</td>
      <td>{editingListingId === l.id ? <input type="number" className="form-control" value={editedData.price || ''} onChange={(e) => handleChange('price', e.target.value)} /> : `₹${l.price}`}</td>
      <td>{editingListingId === l.id ? <input className="form-control" value={editedData.location || ''} onChange={(e) => handleChange('location', e.target.value)} /> : l.location}</td>
      <td>{editingListingId === l.id ? (
        <select className="form-select" value={editedData.category} onChange={(e) => handleChange('category', e.target.value)}>
          <option value="clothing">Clothing</option>
          <option value="property">Property</option>
          <option value="appliance">Appliance</option>
        </select>
      ) : l.category}</td>
      <td>{editingListingId === l.id ? <input className="form-control" value={editedData.subcategory || ''} onChange={(e) => handleChange('subcategory', e.target.value)} /> : l.subcategory || 'N/A'}</td>
      <td>{editingListingId === l.id ? <input className="form-control" value={editedData.image || ''} onChange={(e) => handleChange('image', e.target.value)} /> : l.image ? <img src={l.image} alt="img" width="60" height="60" style={{ objectFit: 'cover' }} /> : 'No Image'}</td>
      <td>{editingListingId === l.id ? (
        <select className="form-select" value={editedData.verified} onChange={(e) => handleChange('verified', e.target.value)}>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
      ) : (
        <span className={`status ${l.verified ? 'bg-success' : 'bg-secondary'}`}>{l.verified ? 'Yes' : 'No'}</span>
      )}</td>
      {/* <td>{new Date(l.created_at).toLocaleDateString()}</td> */}
      <td>
        {editingListingId === l.id ? (
          <>
            <button className="btn btn-sm btn-success me-2" onClick={handleSave}>💾 Save</button>
            <button className="btn btn-sm btn-secondary" onClick={handleCancel}>❌ Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(l)}>✏️ Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(l.id)}>🗑️ Delete</button>
          </>
        )}
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

export default AdminManageListings;
