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
      <div className="chat-info-section">
        <h1 className="chat-intro-heading">Messaging Center</h1>
      <p>
  You can use this chat to communicate directly with the seller or buyer regarding any listing on the platform.
  Feel free to ask about product availability, price negotiation, pickup details, or rental duration. Be clear and respectful 
  while messaging, and avoid sharing any personal sensitive information. This chat helps streamline the communication process 
  and builds trust between both parties. <br /><br />
  Please note: All messages are stored securely for your future reference and support. If you face any issues, 
  contact our support team through the Help section.
</p>

      </div>

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
            placeholder="Type a message..."
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
