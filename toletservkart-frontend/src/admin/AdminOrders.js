import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">📦 All Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">No orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Items</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.name} <br />
                    <small className="text-muted">{order.email}</small>
                  </td>
                  <td>
                    {order.address}, {order.city} - {order.zip}
                  </td>
                  <td>{order.payment_method}</td>
                  <td>
                    <span className={`badge bg-${order.status === 'pending' ? 'warning' : order.status === 'approved' ? 'success' : 'secondary'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.cart_items && order.cart_items.length > 0 ? (
                      <ul className="small ps-3">
                        {order.cart_items.map((item, i) => (
                          <li key={i}>
                            {item.title} x {item.quantity} (₹{item.price})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted">No items</span>
                    )}
                  </td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
