import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const OwnerMyProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));
    setOwnerInfo(storedInfo);
  }, []);

  useEffect(() => {
    if (!ownerInfo?.id) return;

    axios
      .get(`http://localhost:5000/api/products/owner/${ownerInfo.id}`)
      .then((res) => setProducts(res.data || []))
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [ownerInfo]);

  const handleLogout = () => {
    localStorage.removeItem("ownerInfo");
    navigate("/owner-login");
  };

  const isActive = (path) => location.pathname === path;

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleInputChange = (e, field) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingId}`, editedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? editedProduct : p))
      );
      setEditingId(null);
      setEditedProduct({});
    } catch (err) {
      console.error("❌ Failed to update:", err);
      alert("Failed to save changes.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
        .catch((err) => alert("Failed to delete product."));
    }
  };

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
 

  {loading ? (
    <p>⏳ Loading your product list...</p>
  ) : products.length === 0 ? (
    <div className="no-products">
      <p style={{ fontSize: "16px", marginTop: "20px", color: "#888" }}>
        You haven’t uploaded any products yet.
      </p>
      <button
        className="upload-btn"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/upload-product")}
      >
        + Upload First Product
      </button>
    </div>
  ) : (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Rent Price</th>
          <th>Category</th>
          <th>Location</th>
          <th>Condition</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>
              <img
                src={p.image}
                alt="img"
                width={70}
                style={{ borderRadius: "5px" }}
              />
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.title} onChange={(e) => handleInputChange(e, "title")} />
              ) : (
                <strong>{p.title}</strong>
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.price} onChange={(e) => handleInputChange(e, "price")} />
              ) : (
                `₹${p.price}`
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.rent_price} onChange={(e) => handleInputChange(e, "rent_price")} />
              ) : (
                p.rent_price ? `₹${p.rent_price}` : "-"
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.category} onChange={(e) => handleInputChange(e, "category")} />
              ) : (
                p.category
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.location} onChange={(e) => handleInputChange(e, "location")} />
              ) : (
                p.location
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <input value={editedProduct.condition} onChange={(e) => handleInputChange(e, "condition")} />
              ) : (
                p.condition
              )}
            </td>
            <td>
              {editingId === p.id ? (
                <>
                  <button
                    onClick={handleSave}
                    style={{ color: "#28a745", fontWeight: "bold" }}
                  >
                    💾 Save
                  </button>{" "}
                  <button
                    onClick={handleCancel}
                    style={{ color: "#dc3545", fontWeight: "bold" }}
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(p)}
                    style={{ color: "#007bff", fontWeight: "bold" }}
                  >
                    ✏️ Edit
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</main>

    </div>
  );
};

export default OwnerMyProducts;
