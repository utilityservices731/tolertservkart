import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

// ✅ Dummy products (outside component)
const dummyProducts = [
  {
    id: 1,
    title: "Stylish Kurti",
    price: 499,
    imageUrl: "https://source.unsplash.com/150x150/?kurti,fashion",
    description: "Comfortable and elegant kurti suitable for everyday wear.",
  },
  {
    id: 2,
    title: "Wedding Saree",
    price: 1199,
    imageUrl: "https://source.unsplash.com/150x150/?saree,wedding",
    description: "Perfect for weddings and traditional functions.",
  },
  {
    id: 3,
    title: "Men’s Blazer",
    price: 1499,
    imageUrl: "https://source.unsplash.com/150x150/?blazer,men",
    description: "Sharp and classy blazer for formal occasions.",
  },
  {
    id: 4,
    title: "Party Gown",
    price: 999,
    imageUrl: "https://source.unsplash.com/150x150/?gown,women",
    description: "Elegant gown for evening and party wear.",
  },
  {
    id: 5,
    title: "Ethnic Dress",
    price: 799,
    imageUrl: "https://source.unsplash.com/150x150/?ethnic,fashion",
    description: "Traditional ethnic dress with modern touch.",
  },
  {
    id: 6,
    title: "Kids Lehenga",
    price: 599,
    imageUrl: "https://source.unsplash.com/150x150/?kids,lehenga",
    description: "Cute lehenga for little girls' festive look.",
  },
  {
    id: 7,
    title: "Formal Shirt",
    price: 699,
    imageUrl: "https://source.unsplash.com/150x150/?shirt,formal",
    description: "Smart and crisp shirt for office and meetings.",
  },
  {
    id: 8,
    title: "Silk Saree",
    price: 1399,
    imageUrl: "https://source.unsplash.com/150x150/?silk,saree",
    description: "Graceful silk saree with beautiful weaving.",
  },
  {
    id: 9,
    title: "Designer Dress",
    price: 1199,
    imageUrl: "https://source.unsplash.com/150x150/?designer,dress",
    description: "Trendy designer dress for modern women.",
  },
  {
    id: 10,
    title: "Wedding Sherwani",
    price: 1999,
    imageUrl: "https://source.unsplash.com/150x150/?sherwani,wedding",
    description: "Premium sherwani perfect for groom and ceremonies.",
  },
  {
    id: 11,
    title: "Lehenga Choli",
    price: 1699,
    imageUrl: "https://source.unsplash.com/150x150/?lehenga,choli",
    description: "Gorgeous lehenga choli for bridal and festive looks.",
  },
  {
    id: 12,
    title: "Casual T-shirt",
    price: 299,
    imageUrl: "https://source.unsplash.com/150x150/?casual,tshirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
  },
];

const OwnerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const ownerInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  useEffect(() => {
    if (!token) {
      setProducts([]);
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/products/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

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
          <li
            className={isActive("/owner-dashboard") ? "active" : ""}
            onClick={() => navigate("/owner-dashboard")}
          >
            Dashboard
          </li>
          <li
            className={isActive("/upload-product") ? "active" : ""}
            onClick={() => navigate("/upload-product")}
          >
            Upload Product
          </li>
          <li
            className={isActive("/my-products") ? "active" : ""}
            onClick={() => navigate("/my-products")}
          >
            My Products
          </li>
          <li
            className={isActive("/order-requests") ? "active" : ""}
            onClick={() => navigate("/order-requests")}
          >
            Order Requests
          </li>
          <li
            className={isActive("/my-orders") ? "active" : ""}
            onClick={() => navigate("/my-orders")}
          >
            My Orders
          </li>
          <li
            className={isActive("/wallet") ? "active" : ""}
            onClick={() => navigate("/wallet")}
          >
            Wallet
          </li>
          <li
            className={isActive("/profile-settings") ? "active" : ""}
            onClick={() => navigate("/profile-settings")}
          >
            Profile Settings
          </li>
          <li
            className={isActive("/support") ? "active" : ""}
            onClick={() => navigate("/support")}
          >
            Support
          </li>
          <li
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="owner-main-content">
        <h2 className="section-title">Your Uploaded Products</h2>
        <p className="dashboard-subtext">
          Here are the items you've listed for rent or sale.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <>
            <p className="no-products">No products uploaded yet.</p>
            <p className="no-products-subtext">Showing demo items:</p>
            <ul className="product-list">
              {dummyProducts.map((product) => (
                <li key={product.id} className="product-item">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="product-img"
                  />
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="product-list">
            {products.map((product, index) => (
              <li key={product.id || index} className="product-item">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="product-img"
                />
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.price}</p>
                  <div className="product-buttons">
                    <button className="view-details-btn">View Details</button>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
