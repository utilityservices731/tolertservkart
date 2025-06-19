import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
const [wishlist, setWishlist] = useState([]);
const [wishlistLoading, setWishlistLoading] = useState(true);

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === 'orders') {
        setLoadingOrders(true);
        try {
          const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
          setOrders(res.data);
        } catch (error) {
          console.error('❌ Failed to fetch orders:', error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };
    fetchOrders();
  }, [activeTab, user.id]);

  useEffect(() => {
  const fetchWishlist = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData?.id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${userData.id}`);
      const data = await res.json();
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  fetchWishlist();
}, []);

const handleRemoveWishlist = async (wishlistId) => {
  if (!window.confirm("Are you sure you want to remove this item?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/wishlist/${wishlistId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setWishlist((prev) => prev.filter((item) => item.wishlist_id !== wishlistId));
      alert("❌ Removed from wishlist");
    } else {
      alert("Failed to remove item");
    }
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    alert("Server error");
  }
};




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
              <li className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>Wishlist</li>
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

          {/* Profile */}
          {activeTab === 'profile' && (
            <section className="profile-section">
              <h3>Profile Information</h3>
              <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <p className="profile-note">
                You can manage your account, view orders, and edit your ads here.
              </p>
            </section>
          )}

          {/* My Ads */}
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
                    <p><strong>Note:</strong> Pending ads are under admin review.</p>
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

          {/* My Orders */}
        {activeTab === 'orders' && (
  <section className="orders-section">
    <h3>🛒 My Orders</h3>
    {loadingOrders ? (
      <p>Loading orders...</p>
    ) : orders.length === 0 ? (
      <div className="alert alert-info">No orders placed yet.</div>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.flatMap((order, orderIndex) => {
              let items = [];
              try {
                items = JSON.parse(order.cart_items || '[]');
              } catch (e) {
                console.error("Invalid cart_items JSON:", e);
              }

              return items.map((item, i) => (
                <tr key={`${order.order_id}-${i}`}>
                  <td>{orderIndex + 1}</td>
                  <td>{item.title || 'N/A'}</td>
                  <td>₹{item.price || 0}</td>
                  <td>{order.payment_method}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                 <td>{order.status || 'Confirmed'}</td>

                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
)}


          {/* Other Tabs */}
{activeTab === 'wishlist' && (
  <section className="wishlist-section">
    <h3 className="mb-4">My Wishlist</h3>

    {wishlistLoading ? (
      <p>Loading wishlist...</p>
    ) : wishlist.length === 0 ? (
      <p className="text-muted">No wishlist items yet.</p>
    ) : (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {wishlist.map((item) => {
          console.log("🧾 Wishlist item:", item); // ✅ Debug: Check if product_id & source are OK

          const detailPath =
            item.source === "listing"
              ? `/listing/${item.product_id}`
              : `/product/${item.product_id}`;

          return (
            <div className="col" key={item.wishlist_id}>
              <div className="card h-100 shadow-sm position-relative">
                <Link
                  to={detailPath}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-success fw-bold">
                      ₹{item.price}
                    </p>
                    <p className="text-muted mb-4">
                      📍 {item.location || "N/A"}
                    </p>
                  </div>
                </Link>

                <button
                  className="btn btn-outline-danger position-absolute bottom-0 start-50 translate-middle-x mb-3"
                  onClick={() => handleRemoveWishlist(item.wishlist_id)}
                  style={{ width: "90%" }}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </section>
)}


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
