import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

const totalPrice = cart.reduce(
  (acc, item) => acc + parseFloat(item.total || item.price),
  0
);

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-4 text-center">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Your cart is currently empty.</h4>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
              ⬅ Continue Shopping
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price (₹)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: '140px' }}>
                      <img
                        src={item.image || item.imageUrl || 'https://via.placeholder.com/150'}
                        alt={item.title}
                        style={{
                          width: '100px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.location || 'N/A'}</td>
                    <td className="text-success fw-bold">₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">
                    Total
                  </td>
                  <td className="text-success fw-bold">₹{totalPrice.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>

            <div className="d-flex justify-content-between mt-4">
              <button onClick={() => navigate(-1)} className="btn btn-secondary">
                ⬅ Continue Shopping
              </button>
              <button
                className="btn btn-warning"
                onClick={() => navigate('/checkout')}
              >
                🚀 Proceed to Rent
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
