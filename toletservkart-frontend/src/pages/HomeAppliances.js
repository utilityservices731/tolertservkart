import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  },
  // Add more default items if needed
];

const HomeAppliances = () => {
  const [appliances, setAppliances] = useState(defaultAppliances);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products?category=appliances");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            id: item._id || index,
            name: item.name || `Appliance ${index + 1}`,
            price: item.price || "Price not available",
            image: item.image || `https://source.unsplash.com/random/500x600?appliance&sig=${index}`,
          }));
          setAppliances(formatted);
        }
      } catch (err) {
        console.error("API fetch failed. Using default appliance list.", err);
      }
    };

    fetchAppliances();
  }, []);

  // ✅ Add to Cart handler
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
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-title">{item.name}</div>
              <div className="product-price">{item.price}</div>
              <button className="product-btn" onClick={() => handleAddToCart(item)}>
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
