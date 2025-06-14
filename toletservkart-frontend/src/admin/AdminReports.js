import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/reports')
      .then((res) => setReports(res.data || []))
      .catch((err) => console.error('Error fetching reports:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      console.log(`Deleted report ${id}`);
      setReports(prev => prev.filter(report => report.id !== id));
    }
  };

  const handleIgnore = (id) => {
    console.log(`Ignored report ${id}`);
    setReports(prev => prev.filter(report => report.id !== id));
  };

  return (
    <div className="admin-reports-container">
      <h2 className="admin-section-title">🚩 Reported Items</h2>
      {loading ? (
        <p className="loading-text">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="no-data-text">No reports available.</p>
      ) : (
        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Reported By</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.type}</td>
                  <td>{report.reporter}</td>
                  <td>{report.reason}</td>
                  <td>{report.date}</td>
                  <td>
                    <button className="btn-view">View</button>
                    <button className="btn-delete" onClick={() => handleDelete(report.id)}>Delete</button>
                    <button className="btn-ignore" onClick={() => handleIgnore(report.id)}>Ignore</button>
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

export default AdminReports;
