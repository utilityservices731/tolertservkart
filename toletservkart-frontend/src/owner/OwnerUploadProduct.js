import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";


const OwnerUploadProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
    category: "",
    condition: "new",
    type: "rent",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post("http://localhost:5000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product uploaded successfully!");
      navigate("/my-products");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload product");
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
        <div className="upload-form-container">
          <h2 className="upload-title">Upload New Product</h2>
          <form className="upload-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (INR)"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Saree, Kurti)"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <select name="condition" value={formData.condition} onChange={handleChange}>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <button type="submit">Upload Product</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OwnerUploadProduct;
