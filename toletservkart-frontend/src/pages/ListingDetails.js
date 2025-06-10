import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual backend API
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        product.location = 'Lucknow'; // Force location to Lucknow
        setData(product);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setData(null);
      });
  }, [id]);

  if (!data) {
    return (
      <div className="container">
        <h2 className="not-found">Listing not found</h2>
      </div>
    );
  }

  return (
    <div className="listing-details container">
      <img
        className="listing-image"
        src={
          data.image
            ? `http://localhost:5000/uploads/${data.image}`
            : 'https://via.placeholder.com/600x350?text=No+Image'
        }
        alt={data.title}
      />

      <h2 className="listing-title">{data.title}</h2>

      <div className="listing-info">
        <p className="price">💰 <strong>{data.price}</strong></p>
        <p className="location">📍 <strong>{data.location}</strong></p>
      </div>

      <p className="listing-description">{data.description}</p>

      {data.highlights && data.highlights.length > 0 && (
        <ul className="listing-highlights">
          {data.highlights.map((point, index) => (
            <li key={index}>✅ {point}</li>
          ))}
        </ul>
      )}

      <div className="contact-section">
        <button className="contact-btn">📞 Contact Seller</button>
        <p className="contact-note">You’ll be redirected to seller's contact page.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back to Listings</button>
      </div>
    </div>
  );
}

export default ListingDetails;
