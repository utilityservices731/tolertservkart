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

  const [activeSection, setActiveSection] = useState('Dashboard'); // For dynamic section

  useEffect(() => {
    if (activeSection === 'Dashboard') {
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
    }
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // Dummy Components for Demo Purpose
  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return loading ? (
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
        );
      case 'Manage Users':
        return <p>Here you can manage all users.</p>;
      case 'Manage Listings':
        return <p>Here you can manage all listings.</p>;
      case 'Approve Requests':
        return <p>Approve or reject pending product requests.</p>;
      case 'Messages':
        return <p>View and respond to user messages.</p>;
      case 'Reports':
        return <p>View reports and flagged items.</p>;
      case 'Settings':
        return <p>Change application settings here.</p>;
      default:
        return <p>Invalid section</p>;
    }
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>admin@example.com</p>
        </div>
        <nav className="admin-nav">
          <ul>
            {[
              'Dashboard',
              'Manage Users',
              'Manage Listings',
              'Approve Requests',
              'Messages',
              'Reports',
              'Settings',
            ].map((item) => (
              <li
                key={item}
                className={activeSection === item ? 'active' : ''}
                onClick={() => setActiveSection(item)}
              >
                {item}
              </li>
            ))}
            <li className="logout-btn" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <h1 className="dashboard-header">{activeSection}</h1>
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminDashboard;
