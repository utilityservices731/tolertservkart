import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        fetchSimilar(res.data.category || res.data.title);
      })
      .catch((err) => {
        console.error('Product fetch failed:', err);
        setLoading(false);
      });
  }, [id]);

  const fetchSimilar = (key) => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        const filtered = res.data.filter((p) => p._id !== id && p.title.includes(key));
        setSimilarProducts(filtered.slice(0, 3));
      })
      .catch((err) => console.log('Similar fetch failed:', err));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemToAdd = {
      id: product._id,
        product_id: String(product?.id || product?._id),
      title: product.title,
      price: product.price,
      image: product.image,
      location: product.location,
       source: "products"
    };
    const exists = cart.find((item) => item.id === itemToAdd.id);
    if (!exists) {
      cart.push(itemToAdd);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('✔️ Product added to cart!');
    } else {
      alert('⚠️ Already in cart.');
    }
    navigate('/cart');
  };

   const handleAddToWishlist = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return alert("⚠️ Please login to use wishlist");

    try {
      const res = await axios.post("http://localhost:5000/api/wishlist", {
        user_id: userData.id,
      product_id: String(product?.id || product?._id),  // ✅ correct this line

        title: product.title,
        image: product.image,
        price: product.price,
        location: product.location,
         source: "products"
      });

      if (res.status === 201) {
        alert("❤️ Added to wishlist!");
      } else {
        alert("❌ Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Wishlist add error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  if (loading) return <div className="container text-center mt-5">Loading...</div>;

  if (!product) {
    return (
      <>
        <Header />
        <div className="container text-center mt-5">
          <h2 className="text-danger">❌ Product not found</h2>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row g-5 align-items-start">
          {/* Product Image */}
          <div className="col-md-6">
            <img
              src={product.image || 'https://via.placeholder.com/500x600?text=No+Image'}
              alt={product.title}
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: 'cover', maxHeight: '500px' }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-2">{product.title}</h2>
            <h4 className="text-success mb-3">₹{product.price}</h4>
            <p className="text-muted">📍 {product.location || 'Not specified'}</p>
            <p className="mb-4">{product.description || 'No description available.'}</p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <button className="btn btn-warning btn-lg" onClick={handleAddToCart}>🛒 Rent Now</button>
                  <button className="btn btn-outline-danger btn-lg" onClick={handleAddToWishlist}>
                ❤️ Add to Wishlist
              </button>
              <button className="btn btn-outline-primary btn-lg" onClick={handleAddToCart}>➕ Add to Cart</button>
              <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>⬅ Back</button>
            </div>

            {/* Delivery Info */}
            <div className="mb-4">
              <h5 className="fw-bold">📦 Delivery Info</h5>
              <p>Free delivery by <strong>Thu, 20 June</strong></p>
              <p className="text-muted">10-days return | Pay on delivery available</p>
            </div>

            {/* Size Options */}
            <div>
              <h5 className="fw-bold">📐 Available Sizes</h5>
              {['M', 'L', 'XL'].map((size) => (
                <span key={size} className="badge bg-light text-dark border me-2 px-3 py-2">{size}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-5 p-4 bg-light rounded shadow-sm">
          <h4 className="fw-bold mb-3">📞 Contact Seller</h4>
          <p><strong>Name:</strong> Ranjana Chaursiya</p>
          <p><strong>Email:</strong> <a href="mailto:seller@example.com">seller@example.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919876543210">+91-9876543210</a></p>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-5">
            <h4 className="fw-bold mb-4">🛍️ Similar Products</h4>
            <div className="row g-4">
              {similarProducts.map((item) => (
                <div className="col-md-4" key={item._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={item.image || 'https://via.placeholder.com/300x200'}
                      className="card-img-top"
                      alt={item.title}
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-success">₹{item.price}</p>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/listing/${item._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
