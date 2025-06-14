import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/payments')
      .then(res => setPayments(res.data || []))
      .catch(err => console.error('Error fetching payments:', err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'status-label success';
      case 'pending':
        return 'status-label pending';
      case 'failed':
        return 'status-label failed';
      default:
        return 'status-label';
    }
  };

  return (
    <div className="admin-payment-container">
      <h2 className="admin-section-title">💳 Payment History</h2>

      {loading ? (
        <p className="loading-text">Loading payment data...</p>
      ) : payments.length === 0 ? (
        <p className="no-data-text">No payment records found.</p>
      ) : (
        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.txnId}</td>
                  <td>{payment.userName}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.purpose}</td>
                  <td>{payment.method}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={getStatusClass(payment.status)}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPaymentHistory;
