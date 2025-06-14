import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../App.css';

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      // 🔒 Optionally call delete API here
    }
  };

  return (
    <div className="admin-main-content" style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h2 className="dashboard-header" style={{ marginBottom: '20px' }}>
        All Registered Users ({users.length})
      </h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <div className="no-data-message">No users found.</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="btn-edit">
                      <FaEdit style={{ marginRight: '5px' }} />
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                      <FaTrash style={{ marginRight: '5px' }} />
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

export default AdminManageUsers;

