import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const OwnerSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

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
  <main className="container d-flex justify-content-center py-5">
  <div className="card shadow p-4 w-100" style={{ maxWidth: "800px" }}>
    <h3 className="text-center text-primary mb-3">📞 Contact Support</h3>
    <p className="text-center text-muted mb-4">
      Need help with your account, orders, or product listings? Reach out to us using the details below.
    </p>

    {/* Contact Details */}
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item">
        <strong>📧 Email:</strong> support@toletservkart.com
      </li>
      <li className="list-group-item">
        <strong>📱 WhatsApp:</strong> +91 98765 43210
      </li>
      <li className="list-group-item">
        <strong>🕒 Support Hours:</strong> Mon - Sat (10 AM - 6 PM)
      </li>
      <li className="list-group-item">
        <strong>📍 Address:</strong> ToletServKart, Block B, Sector 12, Noida, UP
      </li>
    </ul>

    {/* Support Note */}
    <div className="alert alert-info text-center" role="alert">
      We usually respond within 24 hours. For urgent issues, contact via WhatsApp.
    </div>

    {/* FAQ Section */}
    <div className="mt-4">
      <h4 className="text-secondary mb-3">💬 Frequently Asked Questions</h4>
      <ul className="list-unstyled">
        <li className="mb-2">👉 How can I withdraw my wallet balance?</li>
        <li className="mb-2">👉 How do I track my order or return status?</li>
        <li className="mb-2">👉 Can I list both rental and sale items?</li>
        <li className="mb-2">👉 Why was my product rejected during approval?</li>
      </ul>
      <p className="text-muted small text-center mt-3">
        Still confused? Our support team is just a message away!
      </p>
    </div>
  </div>
</main>


    </div>
  );
};

export default OwnerSupport;
