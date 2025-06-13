import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const OwnerMyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

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

  return (
    <div className="owner-products-page">
      <div className="owner-myproducts-container">
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
                    <span>{product.category}</span> | <span>{product.type}</span> |{" "}
                    <span>{product.condition}</span>
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
      </div>
    </div>
  );
};

export default OwnerMyProducts;
