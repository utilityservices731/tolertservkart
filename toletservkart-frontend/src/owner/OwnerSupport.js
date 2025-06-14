import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";


const OwnerSupport = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support submitted:", { subject, message });

    setStatus("✅ Your support request has been sent successfully!");
    setSubject("");
    setMessage("");
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
        <div className="support-page">
          <div className="support-container">
            <h2 className="section-title">🛠️ Need Help? Contact Support</h2>
            <p className="dashboard-subtext">
              Facing issues with product upload, orders, or payments? Fill the form below. Our support team will respond within 24 hours.
            </p>

            <form className="support-form" onSubmit={handleSubmit}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue..."
                rows={5}
              ></textarea>

              <button type="submit" className="send-support-btn">
                📩 Send Message
              </button>

              {status && <p className="support-success-msg">{status}</p>}
            </form>
          </div>

          <div className="faq-section">
            <h3>💬 Frequently Asked Questions</h3>
            <ul>
              <li>How can I withdraw my wallet balance?</li>
              <li>How do I track my order or return status?</li>
              <li>Can I list both rental and sale items?</li>
              <li>Why was my product rejected during approval?</li>
            </ul>
            <p className="note">Still confused? Our support team is just a message away!</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerSupport;
