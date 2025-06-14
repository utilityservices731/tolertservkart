import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Reuse your sidebar and layout CSS

const OwnerOrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const ownerInfo = JSON.parse(localStorage.getItem("ownerInfo"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/requests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Accepted" } : order
        )
      );
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Rejected" } : order
        )
      );
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerInfo");
    navigate("/owner-login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="owner-dashboard-layout">
      {/* Sidebar */}
      <aside className="owner-sidebar">
        <div className="owner-profile">
          <h2>{ownerInfo?.name || "Owner"}</h2>
          <p>{ownerInfo?.email || "owner@example.com"}</p>
        </div>
        <ul className="owner-nav">
          <li className={isActive("/owner-dashboard") ? "active" : ""} onClick={() => navigate("/owner-dashboard")}>
            Dashboard
          </li>
          <li className={isActive("/upload-product") ? "active" : ""} onClick={() => navigate("/upload-product")}>
            Upload Product
          </li>
          <li className={isActive("/my-products") ? "active" : ""} onClick={() => navigate("/my-products")}>
            My Products
          </li>
          <li className={isActive("/order-requests") ? "active" : ""} onClick={() => navigate("/order-requests")}>
            Order Requests
          </li>
          <li className={isActive("/my-orders") ? "active" : ""} onClick={() => navigate("/my-orders")}>
            My Orders
          </li>
          <li className={isActive("/wallet") ? "active" : ""} onClick={() => navigate("/wallet")}>
            Wallet
          </li>
          <li className={isActive("/profile-settings") ? "active" : ""} onClick={() => navigate("/profile-settings")}>
            Profile Settings
          </li>
          <li className={isActive("/support") ? "active" : ""} onClick={() => navigate("/support")}>
            Support
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="owner-main-content">
        <h2 className="section-title">📨 Order Requests</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No order requests found.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-info">
                  <h3>{order.productTitle}</h3>
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        order.status === "Accepted"
                          ? "status-accepted"
                          : order.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                {order.status === "Pending" && (
                  <div className="order-actions">
                    <button className="accept-btn" onClick={() => handleAccept(order._id)}>Accept</button>
                    <button className="reject-btn" onClick={() => handleReject(order._id)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerOrderRequests;
