import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const sampleData = {
  property: [
    { id: 1, title: '1BHK for Rent', price: '₹8000/month', location: 'Mumbai' },
    { id: 2, title: '2BHK for Rent', price: '₹12000/month', location: 'Pune' },
  ],
  appliances: [
    { id: 3, title: 'Washing Machine', price: '₹5000', location: 'Delhi' },
    { id: 4, title: 'Refrigerator', price: '₹7000', location: 'Bangalore' },
  ],
  dresses: [
    { id: 5, title: 'Designer Dress', price: '₹2000', location: 'Kolkata' },
    { id: 6, title: 'Wedding Dress on Rent', price: '₹1500', location: 'Chennai' },
  ],
};

function CategoryPage() {
  const { name } = useParams();
  const listings = sampleData[name] || [];

  // Capitalize category name
  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <main className="container category-page">
      <section className="category-info-section">
        <h2 className="category-title">{categoryName} Listings</h2>
        <p className="category-description">
          Explore the latest {categoryName.toLowerCase()} options available for rent or purchase. All listings are posted by verified users. Click on any item to view full details and chat with the seller directly.
        </p>
      </section>

      <section className="listings-grid">
        {listings.length > 0 ? (
          listings.map((item) => (
            <Link to={`/listing/${item.id}`} key={item.id} className="listing-card" title={item.title}>
              <div className="listing-image">
                <img
                  src={`https://via.placeholder.com/250x150?text=${encodeURIComponent(item.title)}`}
                  alt={`${item.title} - ${categoryName}`}
                  loading="lazy"
                />
              </div>
              <div className="listing-info">
                <h3 className="listing-title">{item.title}</h3>
                <p className="listing-price">{item.price}</p>
                <p className="listing-location">{item.location}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-listings">No listings found in this category.</p>
        )}
      </section>
    </main>
  );
}

export default CategoryPage;
