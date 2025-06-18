import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fallbackData = [
  { id: 1, title: "2BHK Flat in Mumbai", price: 18000, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 2, title: "3BHK Villa in Delhi", price: 45000, imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
  { id: 3, title: "Studio Apartment in Pune", price: 12000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
  // ... rest of the fallback properties
];

const Property = () => {
  const [properties, setProperties] = useState(fallbackData);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProperties(res.data);
        }
      })
      .catch((err) => {
        console.error("API fetch failed, using fallback data", err);
      });
  }, []);

  const handleAddToCart = (property) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === property.id);
    if (!exists) {
      cart.push(property);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✔️ Property added to cart!");
    } else {
      alert("⚠️ Property already in cart.");
    }
    navigate("/cart");
  };

  return (
    <div className="dresses-page">
      <h2>Explore Properties for Rent & Sale</h2>
      <p className="page-subtext">
        Browse properties listed by verified owners. Find homes, offices, and more for rent or purchase.
      </p>
      <div className="product-grid">
        {properties.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.imageUrl} alt={item.title} className="product-image" />
            <h4>{item.title}</h4>
            <p>₹{item.price} / month</p>
            <button className="product-btn" onClick={() => handleAddToCart(item)}>
              🏠 Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
