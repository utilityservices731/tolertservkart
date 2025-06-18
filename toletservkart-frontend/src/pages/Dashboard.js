import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';

function Dashboard() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [activeTab, setActiveTab] = useState('profile');

  const userAds = [
    { id: 1, title: '1BHK Apartment for Rent', price: '₹8000/month', status: 'Active' },
    { id: 2, title: 'Designer Dress on Rent', price: '₹1500', status: 'Pending Approval' },
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <Header />
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>{user.name.split(' ')[0]}</h2>
            <p>{user.email}</p>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
              <li className={activeTab === 'ads' ? 'active' : ''} onClick={() => setActiveTab('ads')}>My Ads</li>
              <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>My Orders</li>
              <li className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favorites</li>
              <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>Messages</li>
              <li className={activeTab === 'post' ? 'active' : ''} onClick={() => setActiveTab('post')}>Post New Ad</li>
              <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
              <li style={{ color: 'red', cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <h2 className="dashboard-title">Welcome back, {user.name} 👋</h2>

          {activeTab === 'profile' && (
            <section className="profile-section">
              <h3>Profile Information</h3>
              <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <p className="profile-note">
                You can manage your account, view orders, and edit your ads here. Keep your details up-to-date for a better experience.
              </p>
            </section>
          )}

          {activeTab === 'ads' && (
            <section className="ads-section">
              <h3>My Ads</h3>
              {userAds.length > 0 ? (
                <>
                  <div className="ads-list">
                    {userAds.map(ad => (
                      <div key={ad.id} className="ad-card">
                        <h4>{ad.title}</h4>
                        <p className="ad-price">{ad.price}</p>
                        <p className={`ad-status ${ad.status === 'Active' ? 'active' : 'pending'}`}>
                          Status: {ad.status}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="ad-info-box">
                    <p><strong>Note:</strong> Ads marked as "Pending Approval" are under review and will be visible once approved by the admin.</p>
                  </div>
                </>
              ) : (
                <div className="no-ads-box">
                  <p>You haven’t posted any ads yet.</p>
                  <button className="post-ad-btn">Post Your First Ad</button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'orders' && <p>No orders yet.</p>}
          {activeTab === 'favorites' && <p>No favorites yet.</p>}
          {activeTab === 'messages' && <p>No messages yet.</p>}
          {activeTab === 'post' && <p>Click <a href="/upload">here</a> to post a new ad.</p>}
          {activeTab === 'settings' && <p>Settings section coming soon.</p>}

        </main>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
