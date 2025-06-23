import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <>
      <Header />

      <div className="order-container">
        <h2 className="order-title">Order History</h2>

        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No past orders found.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Type</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.flatMap((order, orderIndex) => {
                let items = [];
                try {
                  items = JSON.parse(order.cart_items || '[]');
                } catch (e) {
                  console.error("Invalid cart_items JSON", e);
                }

                return items.map((item, i) => (
                  <tr key={`${order.order_id}-${i}`}>
                    <td>{orderIndex + 1}</td>
                    <td>{item.title || 'N/A'}</td>
                    <td>{item.type || 'N/A'}</td>
                    <td>₹{item.price || 0}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>Confirmed</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
}

export default OrderHistory;
