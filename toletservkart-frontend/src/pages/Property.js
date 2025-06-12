import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const fallbackData = [
  { id: 1, title: "2BHK Flat in Mumbai", price: 18000, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 2, title: "3BHK Villa in Delhi", price: 45000, imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
  { id: 3, title: "Studio Apartment in Pune", price: 12000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
  { id: 4, title: "1BHK in Bangalore", price: 15000, imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
  { id: 5, title: "2BHK Semi-furnished in Noida", price: 17000, imageUrl: "https://images.unsplash.com/photo-1599423300746-b62533397364" },
  { id: 6, title: "Luxury Penthouse in Gurgaon", price: 75000, imageUrl: "https://images.unsplash.com/photo-1600607681848-e386cc2a3fa3" },
  { id: 7, title: "1RK in Ahmedabad", price: 8500, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 8, title: "Independent Floor in Jaipur", price: 20000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
  { id: 9, title: "3BHK Flat in Hyderabad", price: 22000, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 10, title: "2BHK in Chandigarh", price: 16000, imageUrl: "https://images.unsplash.com/photo-1599423300746-b62533397364" },
  { id: 11, title: "1BHK near IT Park", price: 10000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
  { id: 12, title: "Guest House in Manali", price: 2500, imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
  { id: 13, title: "Farmhouse near Lonavala", price: 3200, imageUrl: "https://images.unsplash.com/photo-1600607681848-e386cc2a3fa3" },
  { id: 14, title: "PG in Kota", price: 6500, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 15, title: "Single Room in Patna", price: 5500, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
  { id: 16, title: "2BHK in Bhopal", price: 14000, imageUrl: "https://images.unsplash.com/photo-1599423300746-b62533397364" },
  { id: 17, title: "3BHK near Airport", price: 27000, imageUrl: "https://images.unsplash.com/photo-1600607681848-e386cc2a3fa3" },
  { id: 18, title: "Rental Villa in Goa", price: 5000, imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
  { id: 19, title: "Flat for Rent in Ranchi", price: 9000, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 20, title: "Office Space in Nagpur", price: 20000, imageUrl: "https://images.unsplash.com/photo-1578898887932-0c35e7e9e46f" },
];

const Property = () => {
  const [properties, setProperties] = useState(fallbackData);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
