import React from 'react';
import '../App.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard container">
      <h2 className="dashboard-title">Welcome to Admin Dashboard</h2>

      <div className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>1,250</p>
        </div>
        <div className="card">
          <h3>Active Listings</h3>
          <p>435</p>
        </div>
        <div className="card">
          <h3>Pending Requests</h3>
          <p>23</p>
        </div>
        <div className="card">
          <h3>New Messages</h3>
          <p>7</p>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          <li>User JohnDoe registered</li>
          <li>New property listing uploaded</li>
          <li>Owner request approved</li>
          <li>Admin updated system settings</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
