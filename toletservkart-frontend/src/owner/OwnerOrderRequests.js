import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";

const OwnerOrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const ownerInfo = JSON.parse(localStorage.getItem("ownerInfo"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ownerInfo?.id) return;

    axios
      .get(`http://localhost:5000/api/orders/owner/${ownerInfo.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch((err) => {
        console.error("Order fetch error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [token, ownerInfo]);

  const handleAccept = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === orderId ? { ...order, status: "Accepted" } : order
        )
      );
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === orderId ? { ...order, status: "Rejected" } : order
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
          <li className={isActive("/owner-dashboard") ? "active" : ""} onClick={() => navigate("/owner-dashboard")}>Dashboard</li>
          <li className={isActive("/upload-product") ? "active" : ""} onClick={() => navigate("/upload-product")}>Upload Product</li>
          <li className={isActive("/my-products") ? "active" : ""} onClick={() => navigate("/my-products")}>My Products</li>
          <li className={isActive("/order-requests") ? "active" : ""} onClick={() => navigate("/order-requests")}>Order Requests</li>
         
          {/* <li className={isActive("/wallet") ? "active" : ""} onClick={() => navigate("/wallet")}>Wallet</li> */}
          <li className={isActive("/profile-settings") ? "active" : ""} onClick={() => navigate("/profile-settings")}>Profile Settings</li>
          <li className={isActive("/support") ? "active" : ""} onClick={() => navigate("/support")}>Support</li>
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>Logout</li>
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
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Total ₹</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.product_title}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <span
                      className={
                        order.status === "Accepted"
                          ? "badge bg-success"
                          : order.status === "Rejected"
                          ? "badge bg-danger"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "Pending" ? (
                      <>
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleAccept(order.order_id)}>Accept</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleReject(order.order_id)}>Reject</button>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default OwnerOrderRequests;
