import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const OwnerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setProducts([]);
      return;
    }

    axios
      .get("http://localhost:5000/api/products/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          // Dummy data if none found
          setProducts([
            {
              id: 1,
              title: "Stylish Kurti",
              price: 499,
              imageUrl: "https://via.placeholder.com/100",
            },
            {
              id: 2,
              title: "Wedding Saree",
              price: 1199,
              imageUrl: "https://via.placeholder.com/100",
            },
          ]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        // Show dummy products on error too
        setProducts([
          {
            id: 1,
            title: "Stylish Kurti",
            price: 499,
            imageUrl: "https://via.placeholder.com/100",
          },
          {
            id: 2,
            title: "Wedding Saree",
            price: 1199,
            imageUrl: "https://via.placeholder.com/100",
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="Owner-dashboard">
      <h2>Your Uploaded Products</h2>
      <p className="dashboard-subtext">
        Here are the items you've listed for rent or sale.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products uploaded yet.</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img
                src={product.imageUrl || "https://via.placeholder.com/100"}
                alt={product.title}
                className="product-img"
              />
              <div>
                <strong>{product.title}</strong>
                <p>₹{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerDashboard;
