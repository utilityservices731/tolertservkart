import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function AdminMessages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/messages/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/api/admin/messages/${selectedUser.id}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error('Error fetching messages:', err));
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await axios.post(`http://localhost:5000/api/admin/messages/${selectedUser.id}`, newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="admin-messages-layout">
      {/* Left Panel - Users */}
      <aside className="admin-messages-sidebar">
        <h3>Conversations</h3>
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user.id}
              className={selectedUser?.id === user.id ? 'active' : ''}
              onClick={() => setSelectedUser(user)}
            >
              <strong>{user.name || 'User'}</strong>
              <div className="user-email">{user.email}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Panel - Messages */}
      <main className="admin-chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h3>Chat with {selectedUser.name || 'User'}</h3>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.sender === 'admin' ? 'admin-msg' : 'user-msg'}`}
                >
                  <p>{msg.text}</p>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-user-selected">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminMessages;
