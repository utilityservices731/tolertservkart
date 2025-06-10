import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

// Sample data with fixed location: Lucknow
const sampleData = {
  property: [
    { id: 1, title: '1BHK Flat', price: '₹8000/month', location: 'Lucknow', image: 'flat' },
    { id: 2, title: '2BHK Apartment', price: '₹12000/month', location: 'Lucknow', image: 'apartment' },
    { id: 3, title: 'PG for Girls', price: '₹5000/month', location: 'Lucknow', image: 'pg' },
    { id: 4, title: 'PG for Boys', price: '₹4500/month', location: 'Lucknow', image: 'hostel' },
    { id: 5, title: 'Commercial Shop', price: '₹15000/month', location: 'Lucknow', image: 'shop' },
    { id: 6, title: 'Office Space', price: '₹20000/month', location: 'Lucknow', image: 'office' },
    { id: 7, title: 'Shared Room', price: '₹3000/month', location: 'Lucknow', image: 'room' },
    { id: 8, title: 'Studio Apartment', price: '₹7000/month', location: 'Lucknow', image: 'studio' },
  ],
  appliances: [
    { id: 9, title: 'Refrigerator (200L)', price: '₹7000', location: 'Lucknow', image: 'fridge' },
    { id: 10, title: 'Washing Machine (LG)', price: '₹5000', location: 'Lucknow', image: 'washingmachine' },
    { id: 11, title: 'Microwave Oven', price: '₹3000', location: 'Lucknow', image: 'microwave' },
    { id: 12, title: 'AC 1.5 Ton', price: '₹12000', location: 'Lucknow', image: 'airconditioner' },
    { id: 13, title: 'Water Purifier', price: '₹2000', location: 'Lucknow', image: 'purifier' },
    { id: 14, title: 'Vacuum Cleaner', price: '₹2500', location: 'Lucknow', image: 'vacuum' },
    { id: 15, title: 'Smart TV 32 inch', price: '₹8000', location: 'Lucknow', image: 'tv' },
    { id: 16, title: 'Geyser', price: '₹3000', location: 'Lucknow', image: 'geyser' },
  ],
  dresses: [
    { id: 17, title: 'Designer Lehenga', price: '₹2500', location: 'Lucknow', image: 'lehenga' },
    { id: 18, title: 'Wedding Sherwani', price: '₹2000', location: 'Lucknow', image: 'sherwani' },
    { id: 19, title: 'Party Wear Gown', price: '₹1800', location: 'Lucknow', image: 'gown' },
    { id: 20, title: 'Blazer on Rent', price: '₹1200', location: 'Lucknow', image: 'blazer' },
    { id: 21, title: 'Cocktail Dress', price: '₹1700', location: 'Lucknow', image: 'cocktaildress' },
    { id: 22, title: 'Ethnic Kurta Set', price: '₹1000', location: 'Lucknow', image: 'kurta' },
    { id: 23, title: 'Designer Saree', price: '₹1500', location: 'Lucknow', image: 'saree' },
    { id: 24, title: 'Tuxedo Suit', price: '₹2200', location: 'Lucknow', image: 'tuxedo' },
  ],
};

function CategoryPage() {
  const { name } = useParams();
  const listings = sampleData[name] || [];

  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <main className="container category-page">
      <section className="category-info-section">
        <h2 className="category-title">{categoryName} Listings</h2>
        <p className="category-description">
          Explore the latest {categoryName.toLowerCase()} options available for rent or purchase in Lucknow. All listings are posted by verified users.
        </p>
      </section>

      <section className="listings-grid">
        {listings.length > 0 ? (
          listings.map((item) => (
            <Link to={`/listing/${item.id}`} key={item.id} className="listing-card" title={item.title}>
              <div className="listing-image">
                <img
                  src={`https://source.unsplash.com/250x150/?${item.image},product`}
                  alt={`${item.title} - ${categoryName}`}
                  loading="lazy"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
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
