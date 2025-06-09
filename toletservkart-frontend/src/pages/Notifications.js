// src/pages/Notifications.js
import React from 'react';
import '../App.css';

const notifications = [
  { id: 1, message: 'Your ad "2BHK in Pune" has been approved!', type: 'success', time: '2 hours ago' },
  { id: 2, message: 'New message from Rohan about your "Wedding Dress".', type: 'message', time: '4 hours ago' },
  { id: 3, message: 'Reminder: Return rental by tomorrow.', type: 'reminder', time: '1 day ago' },
  { id: 4, message: 'Your profile was updated successfully.', type: 'info', time: '2 days ago' },
];

function Notifications() {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <ul className="notifications-list">
        {notifications.map((n) => (
          <li key={n.id} className={`notification-item ${n.type}`}>
            <p className="notification-message">{n.message}</p>
            <span className="notification-time">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
