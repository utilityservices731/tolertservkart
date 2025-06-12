import React, { useEffect, useState } from "react";
import "../App.css";

const Dresses = () => {
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
        const res = await fetch("http://localhost:5000/api/products?category=dresses");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            id: item._id || index,
            title: item.title || `Dress ${index + 1}`,
            price: item.price || "Price Not Available",
            image: item.image || `https://source.unsplash.com/random/500x600?fashion&sig=${index}`,
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch products. Showing default list.", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dresses-page">
      <h2 className="dresses-heading">Discover Trendy Dresses</h2>
      <p className="dresses-subtext">Explore stunning outfits perfect for parties, weddings, and events.</p>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
            <button className="product-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dresses;
