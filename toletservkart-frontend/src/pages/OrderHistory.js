// src/pages/OrderHistory.js
import React from 'react';
import '../App.css';

const dummyOrders = [
  {
    id: 1,
    item: '1BHK Flat - Mumbai',
    type: 'Rent',
    price: '₹8000/month',
    date: '2025-05-01',
    status: 'Completed',
  },
  {
    id: 2,
    item: 'Designer Dress',
    type: 'Purchase',
    price: '₹2000',
    date: '2025-04-20',
    status: 'Delivered',
  },
  {
    id: 3,
    item: 'Washing Machine',
    type: 'Purchase',
    price: '₹5000',
    date: '2025-03-15',
    status: 'Returned',
  },
];

function OrderHistory() {
  return (
    <div className="order-container">
      <h2 className="order-title">Order History</h2>
      {dummyOrders.length === 0 ? (
        <p className="no-orders">No past orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Type</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.item}</td>
                <td>{order.type}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
