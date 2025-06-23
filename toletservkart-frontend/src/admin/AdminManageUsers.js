// AdminManageUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

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

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${editUserId}`, editedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === editUserId ? { ...user, ...editedUser } : user))
      );
      setEditUserId(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Users ({users.length})</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
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
                  <td>
                    {editUserId === user.id ? (
                      <input
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
  <span className={`status ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
    {user.status === 'active' ? 'Active' : 'Inactive'}
  </span>
</td>

                  <td>
                    {editUserId === user.id ? (
                      <>
                        <button className="btn btn-sm btn-success me-2" onClick={handleSave}>Save</button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditUserId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(user)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id)}>
                          <FaTrash />
                        </button>
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

export default AdminManageUsers;
