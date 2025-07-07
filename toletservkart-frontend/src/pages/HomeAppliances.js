import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultAppliances = [
  {
    id: 1,
    name: "Samsung Washing Machine",
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/ww70t502dax-tl/gallery/in-front-loading-ww70t502dax-tl-530229926?$720_576_PNG$",
    price: "₹800/month"
  },
  {
    id: 2,
    name: "LG Refrigerator Double Door",
    image: "https://www.lg.com/in/images/refrigerators/md07519642/gallery/GL-I292RPZX-Refrigerators-Front-View-D-01.jpg",
    price: "₹1000/month"
  }
];

const HomeAppliances = () => {
  const [appliances, setAppliances] = useState(defaultAppliances);
  const navigate = useNavigate();
  const location = useLocation(); // so it re-runs on route change

  const selectedCity = localStorage.getItem("selectedCity") || "";
  const selectedPincode = localStorage.getItem("selectedPincode") || "";

  useEffect(() => {
    const fetchAppliances = async () => {
      let url = `http://localhost:5000/api/products?category=appliances`;
      const params = [];
      if (selectedCity) params.push(`city=${encodeURIComponent(selectedCity)}`);
      if (selectedPincode) params.push(`pincode=${encodeURIComponent(selectedPincode)}`);
      if (params.length > 0) url += `&${params.join("&")}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            id: item._id || index,
            name: item.name || `Appliance ${index + 1}`,
            price: item.price ? `₹${item.price}/month` : "Price not available",
            image: item.image || `https://source.unsplash.com/random/500x600?appliance&sig=${index}`
          }));
          setAppliances(formatted);
        } else {
          setAppliances(defaultAppliances);
        }
      } catch (err) {
        console.error("API fetch failed. Using default appliance list.", err);
        setAppliances(defaultAppliances);
      }
    };

    fetchAppliances();
  }, [selectedCity, selectedPincode, location.pathname]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✔️ Added to cart!");
    } else {
      alert("⚠️ Already in cart.");
    }
    navigate("/cart");
  };

  return (
    <>
      <Header />

      <div className="dresses-page">
        <h2 className="dresses-heading">Home Appliances for Rent or Sale</h2>
        <p className="dresses-subtext">Choose from top appliances to make your daily life easier.</p>

        <div className="product-grid">
          {appliances.map((item) => (
            <div className="product-card shadow rounded" key={item.id}>
              <div
                style={{
                  height: '250px',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '0.5rem'
                }}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/250x250?text=No+Image'}
                  alt={item.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="mt-2 fw-bold">{item.name}</div>
              <div className="text-muted">{item.price}</div>
              <button
                className="product-btn btn btn-sm btn-primary w-100 mt-2"
                onClick={() => handleAddToCart(item)}
              >
                🛒 Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomeAppliances;
