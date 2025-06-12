import React, { useEffect, useState } from "react";
import "../App.css";

// Default static appliance list
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
  {
    id: 3,
    name: "Bajaj Microwave Oven",
    image: "https://m.media-amazon.com/images/I/61IpXUgZ7cL._SL1500_.jpg",
    price: "₹400/month"
  },
  {
    id: 4,
    name: "Air Cooler Symphony",
    image: "https://m.media-amazon.com/images/I/61Nf6YqBaML._SL1500_.jpg",
    price: "₹350/month"
  },
  {
    id: 5,
    name: "Philips Mixer Grinder",
    image: "https://m.media-amazon.com/images/I/71I6Ne2PseL._SL1500_.jpg",
    price: "₹200/month"
  },
  {
    id: 6,
    name: "Voltas Window AC",
    image: "https://m.media-amazon.com/images/I/51DJJ9kF+IL._SL1000_.jpg",
    price: "₹1,500/month"
  },
  {
    id: 7,
    name: "Electric Induction Stove",
    image: "https://m.media-amazon.com/images/I/71kWn3FdqNL._SL1500_.jpg",
    price: "₹250/month"
  },
  {
    id: 8,
    name: "Vacuum Cleaner",
    image: "https://m.media-amazon.com/images/I/61npckvqx7L._SL1500_.jpg",
    price: "₹300/month"
  },
  {
    id: 9,
    name: "Electric Kettle",
    image: "https://m.media-amazon.com/images/I/61HdYbci2bL._SL1500_.jpg",
    price: "₹100/month"
  },
  {
    id: 10,
    name: "Iron Box",
    image: "https://m.media-amazon.com/images/I/71XGql7C5mL._SL1500_.jpg",
    price: "₹150/month"
  },
  {
    id: 11,
    name: "Dishwasher Bosch",
    image: "https://m.media-amazon.com/images/I/81BTJkggv+L._SL1500_.jpg",
    price: "₹1,200/month"
  },
  {
    id: 12,
    name: "Electric Rice Cooker",
    image: "https://m.media-amazon.com/images/I/61l1SK4QATL._SL1500_.jpg",
    price: "₹180/month"
  },
  {
    id: 13,
    name: "Mini Fridge",
    image: "https://m.media-amazon.com/images/I/61K5+uFJLeL._SL1500_.jpg",
    price: "₹600/month"
  },
  {
    id: 14,
    name: "Water Purifier",
    image: "https://m.media-amazon.com/images/I/61LhYV3vUHL._SL1500_.jpg",
    price: "₹500/month"
  },
  {
    id: 15,
    name: "TCL Android Smart TV",
    image: "https://m.media-amazon.com/images/I/71vZypjNkPS._SL1500_.jpg",
    price: "₹1,000/month"
  },
  {
    id: 16,
    name: "Ceiling Fan Havells",
    image: "https://m.media-amazon.com/images/I/61J5S0Ep4qL._SL1500_.jpg",
    price: "₹200/month"
  },
  {
    id: 17,
    name: "Inverter Battery Combo",
    image: "https://m.media-amazon.com/images/I/61PNPXLZApL._SL1500_.jpg",
    price: "₹1,800/month"
  },
  {
    id: 18,
    name: "Hair Dryer Philips",
    image: "https://m.media-amazon.com/images/I/61nbK6UCbaL._SL1500_.jpg",
    price: "₹120/month"
  },
  {
    id: 19,
    name: "Water Heater (Geyser)",
    image: "https://m.media-amazon.com/images/I/61Z-Wf0Fy7L._SL1500_.jpg",
    price: "₹400/month"
  },
  {
    id: 20,
    name: "Bluetooth Home Speaker",
    image: "https://m.media-amazon.com/images/I/71MxX8Z8tZL._SL1500_.jpg",
    price: "₹350/month"
  }
];

const HomeAppliances = () => {
  const [appliances, setAppliances] = useState(defaultAppliances);

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

  return (
    <div className="dresses-page">
      <h2 className="dresses-heading">Home Appliances for Rent or Sale</h2>
      <p className="dresses-subtext">Choose from top appliances to make your daily life easier.</p>
      <div className="product-grid">
        {appliances.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-title">{item.name}</div>
            <div className="product-price">{item.price}</div>
            <button className="product-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAppliances;
