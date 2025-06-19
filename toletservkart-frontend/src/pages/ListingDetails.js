import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Rental duration

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching listing:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find((item) => item.id === String(listing._id));

    if (!exists) {
      cart.push({
        id: String(listing._id),
        title: listing.title,
        image: listing.image,
        price: listing.price,
        months: quantity,
        total: listing.price * quantity,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`✔️ Added to cart for ${quantity} month(s)`);
      navigate('/cart');
    } else {
      alert('⚠️ Already in cart');
    }
  };

  const handleAddToWishlist = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return alert("⚠️ Please login to use wishlist");

    try {
      const res = await axios.post("http://localhost:5000/api/wishlist", {
        user_id: userData.id,
      product_id: String(listing?.id || listing?._id),  // ✅ correct this line

        title: listing.title,
        image: listing.image,
        price: listing.price,
        location: listing.location,
         source: "listings"
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

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading listing details...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <>
        <Header />
        <div className="container text-center py-5">
          <h4 className="text-danger">❌ Listing not found</h4>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row g-5 align-items-start">
          {/* Image */}
          <div className="col-md-6">
            <img
              src={listing.image || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={listing.title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
            />
          </div>

          {/* Details */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">{listing.title}</h2>
            <p className="fs-4 text-success mb-2">₹{parseInt(listing.price).toLocaleString('en-IN')} / month</p>
            <p className="text-muted">📍 {listing.location || 'Location not specified'}</p>

            <hr />
            <p className="mb-4">{listing.description || 'No description provided by the seller.'}</p>

            {/* Rent Duration Controls */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <strong>📅 Rent Duration:</strong>
              <button className="btn btn-outline-dark" onClick={decrement}>−</button>
              <span className="fs-5">{quantity} month(s)</span>
              <button className="btn btn-outline-dark" onClick={increment}>+</button>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <button className="btn btn-warning btn-lg" onClick={handleAddToCart}>
                🛒 Rent Now
              </button>
              <button className="btn btn-outline-danger btn-lg" onClick={handleAddToWishlist}>
                ❤️ Add to Wishlist
              </button>
              <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>
                ⬅ Back
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4">
              <h5 className="fw-bold mb-3">📞 Contact Seller</h5>
              <p><strong>Name:</strong> {listing.sellerName || 'Ranjana Chaursiya'}</p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${listing.sellerPhone || '+919876543210'}`} className="text-decoration-none">
                  {listing.sellerPhone || '+91-9876543210'}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${listing.sellerEmail || 'seller@example.com'}`} className="text-decoration-none">
                  {listing.sellerEmail || 'seller@example.com'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListingDetails;
