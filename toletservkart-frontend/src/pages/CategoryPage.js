import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationContext from '../context/LocationContext';

const CategoryPage = () => {
  const { name } = useParams();
  const normalizedName = name.toLowerCase();

  const { city, pincode } = useContext(LocationContext);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Latest');

  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/listings?category=${normalizedName}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        if (pincode) url += `&pincode=${encodeURIComponent(pincode)}`;

        const response = await fetch(url);
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [name, city, pincode]);

  // ✅ Compute filteredListings *on every render* so it's always fresh
  const filteredListings = listings
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      return 0; // Latest or default: no sorting
    });

  if (loading) {
    return (
      <>
        <Header />
        <div className="container text-center my-5">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="mb-3">{categoryName}</h2>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search within this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '250px' }}
          />

          <select
            className="form-select form-select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ maxWidth: '200px' }}
          >
            <option value="Latest">Sort by: Latest</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-muted">No listings found for this category.</div>
        ) : (
          <div className="row g-3">
            {filteredListings.map((item) => (
              <div className="col-md-3" key={item._id || item.id}>
                <div className="card h-100 shadow-sm">
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={
                        item.image ||
                        'https://via.placeholder.com/300x200?text=No+Image'
                      }
                      className="card-img-top"
                      alt={item.title}
                      style={{ objectFit: 'cover', height: '100%' }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-success">₹{item.price}</p>
                    <p className="card-text small text-muted">
                      📍 {item.location || 'Not specified'}
                    </p>
                    <Link
                      to={
                        item.source === 'products'
                          ? `/product/${item._id || item.id}`
                          : `/listing/${item._id || item.id}`
                      }
                      className="btn btn-sm btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
