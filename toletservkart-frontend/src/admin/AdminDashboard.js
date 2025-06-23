import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminManageUsers from './AdminManageUsers';
import AdminManageOwners from './AdminManageOwners';
import AdminManageProducts from './AdminManageProducts';
import AdminManageListings from './AdminManageListings';
import AdminMessages from './AdminMessages';
import AdminOrders from './AdminOrders';
import AdminSettings from './AdminSettings';
import '../App.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalProducts: 0,
    totalListings: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admins/summary');
        setStats(res.data);
        setActivities(res.data.recentActivities || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    window.location.href = '/admin-login';
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Users', icon: '👤' },
    { name: 'Owners', icon: '🧑‍💼' },
    { name: 'Products', icon: '📦' },
    { name: 'Listings', icon: '📋' },
    { name: 'Messages', icon: '💬' },
    { name: 'Orders', icon: '🛒' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const renderSection = () => {
    if (loading) return <p>Loading {activeSection.toLowerCase()}...</p>;

    switch (activeSection) {
      case 'Dashboard':
        return (
          <div className="container">
            <div className="row g-4">
              {/* Cards */}
              {[
                { title: 'Total Users', icon: '👤', color: 'info', value: stats.totalUsers },
                { title: 'Total Owners', icon: '🧑‍💼', color: 'primary', value: stats.totalOwners },
                { title: 'Total Products', icon: '📦', color: 'success', value: stats.totalProducts },
                { title: 'Total Listings', icon: '📃', color: 'warning text-dark', value: stats.totalListings },
                { title: 'Total Orders', icon: '🛒', color: 'secondary', value: stats.totalOrders },
                { title: 'Pending Orders', icon: '⏳', color: 'danger', value: stats.pendingOrders },
                { title: 'Unread Messages', icon: '📬', color: 'dark', value: stats.unreadMessages },
              ].map((card, i) => (
                <div className="col-sm-6 col-lg-4" key={i}>
                  <div className={`card shadow-sm bg-${card.color} text-white h-100`}>
                    <div className="card-body text-center">
                      <div className="fs-1 mb-2">{card.icon}</div>
                      <h5 className="card-title">{card.title}</h5>
                      <p className="fs-3 fw-bold">{card.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activities */}
            <div className="mt-5">
              <h4 className="mb-3">📊 Recent Activities</h4>
              <ul className="list-group">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <li key={index} className="list-group-item">{activity}</li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No recent activity.</li>
                )}
              </ul>
            </div>
          </div>
        );

      case 'Users':
        return <AdminManageUsers />;
      case 'Owners':
        return <AdminManageOwners />;
      case 'Products':
        return <AdminManageProducts />;
      case 'Listings':
        return <AdminManageListings />;
      case 'Messages':
        return <AdminMessages />;
      case 'Orders':
        return <AdminOrders />;
      case 'Settings':
        return <AdminSettings />;
      default:
        return <p>Section "{activeSection}" not found.</p>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 admin-sidebar bg-dark text-white p-0">
          <div className="admin-sidebar-header p-3 border-bottom border-secondary">
            <h5 className="text-warning mb-1">{adminInfo?.name || "Admin"}</h5>
            <p className="small text-light mb-0">{adminInfo?.email || "admin@example.com"}</p>
          </div>
          <ul className="nav flex-column px-2 py-3">
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                className={`nav-link text-white px-3 py-2 ${activeSection === item.name ? 'bg-warning text-dark fw-bold' : ''}`}
                onClick={() => setActiveSection(item.name)}
                style={{ cursor: 'pointer' }}
              >
                {item.icon} {item.name}
              </li>
            ))}
            <li
              className="nav-link text-danger px-3 py-2 mt-3 border-top"
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
            >
              🚪 Logout
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 admin-main-content p-4 bg-light">
          {/* <h2 className="mb-4">{activeSection}</h2> */}
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
