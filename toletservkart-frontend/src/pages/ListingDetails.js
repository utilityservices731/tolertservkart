import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const dummyData = {
  1: {
    title: '1BHK for Rent',
    description: 'Well maintained 1BHK flat with good ventilation, water supply, and security.',
    price: '₹8000/month',
    location: 'Mumbai',
    highlights: ['650 sq.ft', 'Semi-furnished', '2nd Floor', 'Near metro station'],
    image: 'https://via.placeholder.com/600x350?text=1BHK+Flat+in+Mumbai'
  },
  2: {
    title: '2BHK for Rent',
    description: 'Spacious 2BHK in a gated society with parking and balcony.',
    price: '₹12000/month',
    location: 'Pune',
    highlights: ['950 sq.ft', 'Fully-furnished', '4th Floor', '24x7 Security'],
    image: 'https://via.placeholder.com/600x350?text=2BHK+in+Pune'
  },
  3: {
    title: 'Washing Machine',
    description: 'LG 6kg washing machine in excellent condition. Hardly used.',
    price: '₹5000',
    location: 'Delhi',
    highlights: ['Top Load', '6kg Capacity', 'Energy Efficient', '1-Year Warranty'],
    image: 'https://via.placeholder.com/600x350?text=Washing+Machine'
  },
  4: {
    title: 'Refrigerator',
    description: 'Double door fridge, 300L, frost-free, 2 years old, clean and working perfectly.',
    price: '₹7000',
    location: 'Bangalore',
    highlights: ['300 Litres', 'Double Door', 'Power Saving', 'Silent Operation'],
    image: 'https://via.placeholder.com/600x350?text=Fridge'
  },
  5: {
    title: 'Designer Dress',
    description: 'Stylish party wear gown, worn once. Available in excellent condition.',
    price: '₹2000',
    location: 'Kolkata',
    highlights: ['Size: M', 'Only Worn Once', 'Dry Cleaned', 'Premium Quality'],
    image: 'https://via.placeholder.com/600x350?text=Designer+Dress'
  },
  6: {
    title: 'Wedding Dress on Rent',
    description: 'Bridal lehenga available on rent for 3 days. Looks like new!',
    price: '₹1500',
    location: 'Chennai',
    highlights: ['Fits Size M–L', '3-Day Rent', 'Dry Cleaned', 'Gold Embroidery'],
    image: 'https://via.placeholder.com/600x350?text=Wedding+Dress'
  }
};

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = dummyData[id];

  if (!data) {
    return <div className="container"><h2 className="not-found">Listing not found</h2></div>;
  }

  return (
    <div className="listing-details">
      <img className="listing-image" src={data.image} alt={data.title} />

      <h2 className="listing-title">{data.title}</h2>

      <div className="listing-info">
        <p className="price">💰 <strong>{data.price}</strong></p>
        <p className="location">📍 <strong>{data.location}</strong></p>
      </div>

      <p className="listing-description">{data.description}</p>

      <ul className="listing-highlights">
        {data.highlights.map((point, index) => (
          <li key={index}>✅ {point}</li>
        ))}
      </ul>

      <div className="contact-section">
        <button className="contact-btn">📞 Contact Seller</button>
        <p className="contact-note">You’ll be redirected to seller's contact page.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back to Listings</button>
      </div>
    </div>
  );
}

export default ListingDetails;
