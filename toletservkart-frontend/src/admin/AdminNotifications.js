import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/notifications')
      .then((res) => setNotifications(res.data || []))
      .catch((err) => console.error('Error fetching notifications:', err))
      .finally(() => setLoading(false));
  }, []);

  const getTypeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return 'notification success';
      case 'warning':
        return 'notification warning';
      case 'error':
        return 'notification error';
      case 'info':
      default:
        return 'notification info';
    }
  };

  return (
    <div className="admin-notification-container">
      <h2>📢 System Notifications</h2>

      {loading ? (
        <p className="loading-text">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="no-data-text">No notifications found.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((note) => (
            <li key={note.id} className={getTypeClass(note.type)}>
              <div className="notification-header">
                <strong className="notification-title">{note.title}</strong>
                <span className="notification-date">{note.date}</span>
              </div>
              <p className="notification-message">{note.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminNotifications;
