import React from 'react';
import '../App.css';

function Dashboard() {
  const user = {
    name: "Ranjana Chaursiya",
    email: "ranjana@example.com",
  };

  const userAds = [
    { id: 1, title: '1BHK Apartment for Rent', price: '₹8000/month', status: 'Active' },
    { id: 2, title: 'Designer Dress on Rent', price: '₹1500', status: 'Pending Approval' },
  ];

  return (
    <div className="container dashboard-page">
      <h2 className="dashboard-title">Welcome back, {user.name} 👋</h2>

      <section className="profile-section">
        <h3>Profile Information</h3>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <p className="profile-note">
          You can manage your account and view your ads here. Keep your information updated to receive better responses.
        </p>
      </section>

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
    </div>
  );
}

export default Dashboard;
