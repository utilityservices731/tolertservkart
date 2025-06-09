import React, { useState } from 'react';
import '../App.css';

const users = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit@example.com', role: 'Seller' },
  { id: 2, name: 'Pooja Mehta', email: 'pooja@example.com', role: 'Buyer' },
];

const listings = [
  { id: 101, title: '1BHK Flat in Mumbai', status: 'Pending' },
  { id: 102, title: 'LG Washing Machine', status: 'Approved' },
];

function AdminPanel() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page-wrapper">

      {/* ✅ Section 1: Admin Dashboard Info */}
      <div className="admin-info-wrapper">
  <h1 className="section-heading">Admin Overview</h1> 
  
  <div className="admin-info-section">
    <h2>Welcome to the Admin Dashboard</h2>
    <p>
      This dashboard allows administrators to manage user accounts, monitor listings, and maintain platform quality.
      Use the tools below to approve/reject listings, search users, and analyze platform activity.
    </p>
  </div>
</div>


      {/* ✅ Section 2: Data Management Area */}
      <div className="admin-data-section">

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card-box">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="card-box">
            <h3>Total Listings</h3>
            <p>{listings.length}</p>
          </div>
          <div className="card-box">
            <h3>Pending Approvals</h3>
            <p>{listings.filter(l => l.status === 'Pending').length}</p>
          </div>
        </div>

        {/* User Management */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h3>Users</h3>
            <input
              type="text"
              placeholder="Search by name..."
              className="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length ? filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              )) : (
                <tr><td colSpan="3">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Listing Management */}
        <section className="admin-section">
          <h3>Listings</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.length ? listings.map((l) => (
                <tr key={l.id}>
                  <td>{l.title}</td>
                  <td>{l.status}</td>
                  <td>
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="3">No listings available.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;
