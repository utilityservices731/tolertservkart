import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocationContext from "../context/LocationContext";

const Dresses = () => {
  const navigate = useNavigate();
  const location = useLocation(); // track path changes
  const { city, pincode } = useContext(LocationContext);

  const defaultProducts = [
    {
      id: 1,
      title: "Red Bridal Lehenga",
      price: "₹1500 (Rent) / ₹9500 (Buy)",
      image:
        "https://images.unsplash.com/photo-1613545325784-b40ba4d2488a?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Elegant Evening Gown",
      price: "₹1200 (Rent) / ₹6200 (Buy)",
      image:
        "https://images.unsplash.com/photo-1520975922203-8c77f0f05a96?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Floral Anarkali Suit",
      price: "₹800 (Rent) / ₹4800 (Buy)",
      image:
        "https://images.unsplash.com/photo-1621832274611-b99703a36d68?auto=format&fit=crop&w=500&q=80",
    },
  ];

  while (defaultProducts.length < 20) {
    const i = defaultProducts.length + 1;
    defaultProducts.push({
      id: i,
      title: `Stylish Dress ${i}`,
      price: `₹${500 + i * 10} (Rent) / ₹${2000 + i * 100} (Buy)`,
      image: `https://source.unsplash.com/random/500x600?fashion&sig=${i}`,
    });
  }

  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:5000/api/products?category=dresses`;

        const params = [];
        if (city) params.push(`city=${encodeURIComponent(city)}`);
        if (pincode) params.push(`pincode=${encodeURIComponent(pincode)}`);
        if (params.length > 0) url += `&${params.join("&")}`;

        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            id: item._id || index,
            title: item.title || `Dress ${index + 1}`,
            price:
              item.price !== undefined
                ? `₹${item.price} (Rent)`
                : "Price Not Available",
            image:
              item.image ||
              `https://source.unsplash.com/random/500x600?fashion&sig=${index}`,
          }));
          setProducts(formatted);
        } else {
          setProducts(defaultProducts); // fallback if empty
        }
      } catch (err) {
        console.error("Failed to fetch products. Showing default list.", err);
        setProducts(defaultProducts);
      }
    };

    fetchProducts();
  }, [city, pincode, location.pathname]); // re-run on URL change

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
        <h2 className="dresses-heading">Discover Trendy Dresses</h2>
        <p className="dresses-subtext">
          Explore stunning outfits perfect for parties, weddings, and events.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card shadow rounded">
              <div
                style={{
                  height: "250px",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                }}
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/250x250?text=No+Image"
                  }
                  alt={product.title}
                />
              </div>
              <h3 className="product-title mt-2">{product.title}</h3>
              <p className="product-price text-muted">{product.price}</p>
              <button
                className="product-btn btn btn-sm btn-primary w-100 mt-2"
                onClick={() => handleAddToCart(product)}
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

export default Dresses;
