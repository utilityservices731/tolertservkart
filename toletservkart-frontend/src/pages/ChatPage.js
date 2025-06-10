import React, { useState } from 'react';
import '../App.css';

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'seller', text: 'Hi! The washing machine is still available.' },
    { id: 2, sender: 'buyer', text: 'Great! Can I visit tomorrow?' },
    { id: 3, sender: 'seller', text: 'Sure, what time works for you?' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (newMsg.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'buyer', text: newMsg }]);
      setNewMsg('');
    }
  };

  return (
    <div className="chat-page-wrapper">
      <section className="chat-info-section">
        <h1 className="chat-intro-heading">Messaging Center</h1>
        <p>
          Communicate directly with the seller or buyer regarding any listing.
          Ask about availability, pricing, pickup, or rental terms.
          Keep conversations respectful and avoid sharing personal details.
          <br /><br />
          All chats are securely stored for reference. For issues, contact our support via the Help section.
        </p>
      </section>

      <div className="chat-container">
        <h2 className="chat-header">Chat with Seller</h2>
        <div className="chat-box">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
