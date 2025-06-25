import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';
  const city = queryParams.get('city') || '';

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/search', { params: { query, city } })
      .then(res => setResults(res.data))
      .catch(err => console.error('Search error:', err));
  }, [query, city]);

  return (
    <>
      <Header />

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            🔍 Search Results for "<span className="text-primary">{query}</span>" 
            {city && <span> in <strong>{city}</strong></span>}
          </h2>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>

        {results.length === 0 ? (
          <div className="alert alert-warning text-center">No results found.</div>
        ) : (
          <div className="row g-4">
            {results.map((item) => (
              <div key={item.id} className="col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.title}
                    className="card-img-top rounded-top-4"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '14px' }}>
                      {item.description?.slice(0, 60)}...
                    </p>
                    <p className="fw-bold mb-1">₹{item.price}</p>
                    <p className="text-muted small">{item.location}</p>
                    <Link
                      to={`/${item.source === 'listing' ? 'listing' : 'product'}/${item.id}`}
                      className="btn btn-sm btn-primary mt-auto"
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

export default SearchResults;
