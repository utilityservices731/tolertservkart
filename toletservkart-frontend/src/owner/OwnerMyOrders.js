import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";


const OwnerMyOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("My Orders fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

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
          <h2>{storedInfo?.name || "Owner"}</h2>
          <p>{storedInfo?.email}</p>
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
          {/* <li className={isActive("/wallet") ? "active" : ""} onClick={() => navigate("/wallet")}>
            Wallet
          </li> */}
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
        <div className="my-orders-container">
          <h2 className="section-title">📦 My Orders</h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.product?.title}</td>
                    <td>{order.product?.category}</td>
                    <td>₹{order.product?.price}</td>
                    <td>{order.product?.type}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default OwnerMyOrders;
