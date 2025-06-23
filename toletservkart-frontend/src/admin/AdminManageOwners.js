import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminManageOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOwner, setEditingOwner] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/owners');
      setOwners(res.data);
    } catch (err) {
      console.error('Error fetching owners:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ownerId) => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/owners/${ownerId}`);
        setOwners((prev) => prev.filter((o) => o.id !== ownerId));
      } catch (err) {
        console.error('Error deleting owner:', err);
        alert('Failed to delete owner.');
      }
    }
  };

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setEditName(owner.name);
    setEditEmail(owner.email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/owners/${editingOwner.id}`, {
        name: editName,
        email: editEmail,
      });

      setOwners((prev) =>
        prev.map((o) =>
          o.id === editingOwner.id ? { ...o, name: editName, email: editEmail } : o
        )
      );

      setEditingOwner(null);
    } catch (err) {
      console.error('Error updating owner:', err);
      alert('Update failed.');
    }
  };

  return (
    <div className="admin-main-content p-3 bg-light min-vh-100">
      <h3 className="mb-4">All Registered Owners ({owners.length})</h3>

      {loading ? (
        <p>Loading owners...</p>
      ) : owners.length === 0 ? (
        <p>No owners found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) =>
                editingOwner?.id === owner.id ? (
                  <tr key={owner.id} className="table-info">
                    <td>{owner.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </td>
                    <td colSpan={4}>
                      <button className="btn btn-sm btn-success me-2" onClick={handleUpdate}>
                        <FaCheck /> Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditingOwner(null)}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={owner.id}>
                    <td>{owner.id}</td>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>
                      <span
                        className={`status ${
                          owner.status === 'active' ? 'bg-success' : 'bg-secondary'
                        }`}
                      >
                        {owner.status ? owner.status.charAt(0).toUpperCase() + owner.status.slice(1) : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${owner.verified ? 'bg-info' : 'bg-warning text-dark'}`}>
                        {owner.verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>{new Date(owner.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(owner)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(owner.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManageOwners;
