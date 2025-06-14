import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Keep sidebar & layout CSS here

const OwnerProfileSettings = () => {
  const token = localStorage.getItem("token");
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  const [name, setName] = useState(storedInfo?.name || "");
  const [email, setEmail] = useState(storedInfo?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    axios
      .put(
        "http://localhost:5000/api/owner/profile",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        localStorage.setItem("ownerInfo", JSON.stringify(res.data));
        setMessage("✅ Profile updated successfully.");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error updating profile.");
      })
      .finally(() => setLoading(false));
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
        <div className="profile-settings-container">
          <h2 className="section-title">👤 Edit Profile</h2>
          <form onSubmit={handleUpdate} className="profile-form">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Leave blank to keep same"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="save-profile-btn" disabled={loading}>
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>

            {message && <p className="profile-message">{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default OwnerProfileSettings;
