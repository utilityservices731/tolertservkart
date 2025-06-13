import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const OwnerOrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

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

  return (
    <div className="owner-orders-container">
      <h2 className="section-title">Order Requests</h2>
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
                <p>
                  <strong>Customer:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
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
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(order._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(order._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerOrderRequests;
