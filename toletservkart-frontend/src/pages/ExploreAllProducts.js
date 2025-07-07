import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationContext from '../context/LocationContext'; // ✅ Import context
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExploreAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);

  // ✅ URL params
  const [searchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlPincode = searchParams.get('pincode') || '';

  // ✅ Location context
  const { city: contextCity, pincode: contextPincode } = useContext(LocationContext);

  // ✅ Choose params: URL > Context
  const selectedCity = urlCity || contextCity;
  const selectedPincode = urlPincode || contextPincode;

  useEffect(() => {
    const params = {};
    if (selectedCity) params.city = selectedCity;
    if (selectedPincode) params.pincode = selectedPincode;

    axios
      .get('http://localhost:5000/api/all-products', { params })
      .then(res => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);

        const max = Math.max(...data.map(p => p.price || 0), 10000);
        setPriceRange([0, max]);
        setMaxPrice(max);
      })
      .catch(err => console.error('Product fetch error:', err));
  }, [selectedCity, selectedPincode]); // 🔑 dependencies

  useEffect(() => {
    const result = products.filter(item => {
      const inCategory = categoryFilter ? item.category === categoryFilter : true;
      const inPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      return inCategory && inPrice;
    });
    setFiltered(result);
  }, [categoryFilter, priceRange, products]);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="fw-bold mb-4">Explore All Products</h2>

        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="priceRange" className="form-label">
              Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxPrice}
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              id="priceRange"
            />
          </div>
        </div>

        {/* Products */}
        <div className="row g-4">
          {filtered.map(item => (
            <div key={item._id} className="col-md-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image || 'https://via.placeholder.com/300x200'}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-success">₹{item.price}</p>
                 <Link
  to={
    item.source === 'products'
      ? `/product/${item.id}`
      : `/listing/${item.id}`
  }
  className="btn btn-primary w-100"
>
  View Details
</Link>

                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-12 text-center text-muted">
              No products found.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreAllProducts;
