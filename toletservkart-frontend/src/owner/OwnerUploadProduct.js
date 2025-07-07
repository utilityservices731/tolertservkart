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
    description: "",
    price: "",
    rent_price: "",
    category: "",
    image: null,
    condition: "new",
    available: true,
    is_rentable: true,
    location: "Lucknow",
    pincode: "",
    color: "",
    type: "rent",
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
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

      alert("✅ Product uploaded successfully!");
      navigate("/my-products");
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload product");
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
          <p>{storedInfo?.email || "owner@example.com"}</p>
        </div>
        <ul className="owner-nav">
          <li className={isActive("/owner-dashboard") ? "active" : ""} onClick={() => navigate("/owner-dashboard")}>Dashboard</li>
          <li className={isActive("/upload-product") ? "active" : ""} onClick={() => navigate("/upload-product")}>Upload Product</li>
          <li className={isActive("/my-products") ? "active" : ""} onClick={() => navigate("/my-products")}>My Products</li>
          <li className={isActive("/order-requests") ? "active" : ""} onClick={() => navigate("/order-requests")}>Order Requests</li>
          <li className={isActive("/profile-settings") ? "active" : ""} onClick={() => navigate("/profile-settings")}>Profile Settings</li>
          <li className={isActive("/support") ? "active" : ""} onClick={() => navigate("/support")}>Support</li>
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="container py-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">📤 Upload New Product</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Rent Price (₹)</label>
                  <input
                    type="number"
                    name="rent_price"
                    className="form-control"
                    value={formData.rent_price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Color</label>
                  <input
                    type="text"
                    name="color"
                    className="form-control"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="property">Property</option>
                    <option value="dress">Dress</option>
                    <option value="appliance">Appliance</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Condition</label>
                  <select
                    name="condition"
                    className="form-select"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Available</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="available"
                      className="form-check-input"
                      checked={formData.available}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Available for Sale/Rent</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Is Rentable</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="is_rentable"
                      className="form-check-input"
                      checked={formData.is_rentable}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Allow Renting</label>
                  </div>
                </div>
              </div>

              <div className="text-end mt-4">
                <button type="submit" className="btn btn-success px-4">
                  Upload Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerUploadProduct;
