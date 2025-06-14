import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css"; 

const OwnerMyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const ownerInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
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
        <h2 className="section-title">📦 My Uploaded Products</h2>

        {loading ? (
          <p>Loading your products...</p>
        ) : products.length === 0 ? (
          <p className="no-products">You haven’t uploaded any products yet.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="product-card-img"
                />
                <div className="product-card-info">
                  <h3>{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-tags">
                    <span>{product.category}</span> | <span>{product.type}</span> | <span>{product.condition}</span>
                  </p>
                </div>
                <div className="product-card-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerMyProducts;
