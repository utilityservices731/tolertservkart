import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const OwnerWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBalance(res.data.balance || 0);
        setTransactions(res.data.transactions || []);
      })
      .catch((err) => {
        console.error("Wallet fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="wallet-container">
      <h2 className="section-title">💰 My Wallet</h2>

      {loading ? (
        <p>Loading wallet details...</p>
      ) : (
        <>
          <div className="wallet-sections">
            <div className="wallet-card balance-card">
              <h3>Available Balance</h3>
              <p className="wallet-amount">₹{balance.toFixed(2)}</p>
              <button className="withdraw-btn">Withdraw</button>
            </div>

            <div className="wallet-card info-card">
              <h4>💡 Tips</h4>
              <p>You can withdraw funds if balance exceeds ₹100.</p>
              <p>Withdrawals are processed within 24-48 hours.</p>
            </div>
          </div>

          <div className="wallet-transactions">
            <h3>📜 Transaction History</h3>
            {transactions.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr key={index}>
                      <td>{new Date(txn.date).toLocaleDateString()}</td>
                      <td>{txn.description}</td>
                      <td className={txn.type === "credit" ? "credit" : "debit"}>
                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                      </td>
                      <td>{txn.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerWallet;
