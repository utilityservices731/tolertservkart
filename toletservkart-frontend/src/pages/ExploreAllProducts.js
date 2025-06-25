import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExploreAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000); // dynamic max price

 useEffect(() => {
  const selectedCity = localStorage.getItem('selectedCity');

  axios
    .get('http://localhost:5000/api/all-products', {
      params: selectedCity ? { city: selectedCity } : {},
    })
    .then(res => {
      const data = res.data || [];
      setProducts(data);
      setFiltered(data);

      const max = Math.max(...data.map(p => p.price || 0), 10000);
      setPriceRange([0, max]);
      setMaxPrice(max);
    })
    .catch(err => console.error('Product fetch error:', err));
}, []);


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

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <aside className="col-md-3 mb-4">
            <div className="card shadow-sm p-3">
              <h4 className="mb-3">Filters</h4>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max={maxPrice}
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <p className="text-muted">Under ₹{priceRange[1]}</p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="col-md-9">
            <h2 className="mb-4">All Products</h2>
            <div className="row g-4">
              {filtered.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filtered.map((product) => (
                  <div key={product.id} className="col-sm-6 col-md-4">
                   <Link
  to={
    product.source === 'products'
      ? `/product/${product.id}`
      : `/listing/${product.id}`
  }
  className="text-decoration-none text-dark"
>
  <div className="card h-100 shadow-sm">
    <img
      src={product.image}
      className="card-img-top"
      alt={product.title}
     
    />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text text-muted" style={{ fontSize: '14px' }}>
        {product.description?.slice(0, 60)}...
      </p>
      <p className="fw-bold mb-1">₹{product.price}</p>
      <span className="btn btn-primary mt-auto w-100">View Details</span>
    </div>
  </div>
</Link>

                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ExploreAllProducts;
