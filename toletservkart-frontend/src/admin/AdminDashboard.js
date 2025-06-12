import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeListings: 0,
    pendingRequests: 0,
    newMessages: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard');
        const data = response.data;

        setStats({
          totalUsers: data.totalUsers,
          activeListings: data.activeListings,
          pendingRequests: data.pendingRequests,
          newMessages: data.newMessages,
        });

        setActivities(data.recentActivities || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // or sessionStorage
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul className="admin-nav">
          <li className="active">Dashboard</li>
          <li>Users</li>
          <li>Listings</li>
          <li>Requests</li>
          <li>Messages</li>
        </ul>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main-content">
        <h1 className="dashboard-header">Welcome, Admin 👋</h1>

        {loading ? (
          <p className="loading">Loading dashboard data...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Listings</h3>
                <p>{stats.activeListings}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p>{stats.pendingRequests}</p>
              </div>
              <div className="stat-card">
                <h3>New Messages</h3>
                <p>{stats.newMessages}</p>
              </div>
            </div>

            <div className="recent-activities">
              <h2>Recent Activities</h2>
              <ul>
                {activities.length > 0 ? (
                  activities.map((activity, i) => <li key={i}>{activity}</li>)
                ) : (
                  <li>No recent activities</li>
                )}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
