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
  const [activeSection, setActiveSection] = useState('Dashboard');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (activeSection === 'Dashboard') {
      const fetchDashboardData = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/admins/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = res.data;
          setStats({
            totalUsers: data.totalUsers,
            activeListings: data.activeListings,
            pendingRequests: data.pendingRequests,
            newMessages: data.newMessages,
          });
          setActivities(data.recentActivities || []);
        } catch (err) {
          console.error('Dashboard fetch error:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [activeSection, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return loading ? (
          <p className="loading-text">Loading dashboard...</p>
        ) : (
          <>
            <div className="admin-stats-grid">
              <div className="admin-card">
                <h4>Total Users</h4>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="admin-card">
                <h4>Active Listings</h4>
                <p>{stats.activeListings}</p>
              </div>
              <div className="admin-card">
                <h4>Pending Requests</h4>
                <p>{stats.pendingRequests}</p>
              </div>
              <div className="admin-card">
                <h4>New Messages</h4>
                <p>{stats.newMessages}</p>
              </div>
            </div>

            <div className="admin-activities">
              <h3>📝 Recent Activities</h3>
              {activities.length > 0 ? (
                <ul className="activity-list">
                  {activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              ) : (
                <p>No recent activity</p>
              )}
            </div>
          </>
        );

      default:
        return <p>This section is under construction: {activeSection}</p>;
    }
  };

  const sidebarItems = [
    'Dashboard',
    'Manage Users',
    'Manage Listings',
    'Approve Requests',
    'Messages',
    'Reports',
    'Payment History',
    'Feedbacks',
    'Notifications',
    'Settings',
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>admin@example.com</p>
        </div>
        <nav className="admin-nav">
          {sidebarItems.map((item) => (
            <div
              key={item}
              className={`admin-nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </div>
          ))}
          <div className="admin-nav-link logout" onClick={handleLogout}>
            🚪 Logout
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <h1 className="admin-main-title">{activeSection}</h1>
        <div className="admin-main-section">{renderSection()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
