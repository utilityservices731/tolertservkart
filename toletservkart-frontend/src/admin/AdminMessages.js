import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import axios from 'axios';

function AdminMessages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);

  // ✅ Load all users who have messaged
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/messages/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Load messages for selected user with auto-refresh
  useEffect(() => {
    let interval;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/messages/${selectedUser.id}`);
        setMessages(res.data);

        // ✅ Mark all unread as read
        await axios.put(`http://localhost:5000/api/admin/messages/${selectedUser.id}/mark-read`);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    if (selectedUser?.id) {
      fetchMessages();
      interval = setInterval(fetchMessages, 5000); // ⏱ Refresh every 5 sec
    }

    return () => clearInterval(interval);
  }, [selectedUser]);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Send message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`http://localhost:5000/api/admin/messages/${selectedUser.id}`, newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
const handleClearChat = async () => {
  if (!window.confirm("Are you sure you want to delete the entire chat?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/admin/messages/${selectedUser.id}`);
    setMessages([]);
    alert("Chat cleared successfully.");
  } catch (err) {
    console.error("❌ Error clearing chat:", err);
    alert("Failed to clear chat. Try again.");
  }
};

  return (
    <div className="admin-messages-layout">
      {/* Left Panel */}
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
              {user.unread_count > 0 && (
                <span className="badge bg-danger ms-1">{user.unread_count}</span>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Panel */}
      <main className="admin-chat-main">
        {selectedUser ? (
          <>
         <div className="chat-header d-flex justify-content-between align-items-center">
  <h3>Chat with {selectedUser.name || 'User'}</h3>
  <button
    className="btn btn-sm btn-danger"
    onClick={handleClearChat}
    title="Clear entire chat"
  >
    🧹 Clear Chat
  </button>
</div>

            <div ref={chatBoxRef} className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.sender === 'admin' ? 'admin-msg' : 'user-msg'}`}
                >
                  <p>{msg.text}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
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
