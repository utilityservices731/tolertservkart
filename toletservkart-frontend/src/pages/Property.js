import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// Fallback static data
const fallbackData = [
  { id: 1, title: "2BHK Flat in Mumbai", price: 18000, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 2, title: "3BHK Villa in Delhi", price: 45000, imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
  { id: 3, title: "Studio Apartment in Pune", price: 12000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
];

const Property = () => {
  const [properties, setProperties] = useState(fallbackData);
  const navigate = useNavigate();

  const selectedCity = localStorage.getItem("selectedCity") || "";
  const selectedPincode = localStorage.getItem("selectedPincode") || "";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = {};
        if (selectedCity) params.city = selectedCity;
        if (selectedPincode) params.pincode = selectedPincode;

        const res = await axios.get("http://localhost:5000/api/properties", { params });

        if (Array.isArray(res.data) && res.data.length > 0) {
          setProperties(res.data);
        } else {
          console.log("No properties found for selected location.");
        }
      } catch (err) {
        console.error("API fetch failed, using fallback data:", err);
      }
    };

    fetchProperties();
  }, [selectedCity, selectedPincode]);

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
    <>
      <Header />

      <div className="dresses-page">
        <h2>Explore Properties for Rent & Sale</h2>
        <p className="page-subtext">
          Browse properties listed by verified owners. Find homes, offices, and more for rent or purchase.
        </p>

        <div className="product-grid">
          {properties.map((item) => (
            <div className="product-card shadow rounded" key={item.id}>
              <div
                style={{
                  height: "250px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                }}
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/250x250?text=No+Image"}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h4 className="mt-2">{item.title}</h4>
              <p className="text-muted">₹{item.price} / month</p>
              <button
                className="product-btn btn btn-sm btn-success w-100 mt-2"
                onClick={() => handleAddToCart(item)}
              >
                🏠 Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Property;
