import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const conversationId = "abc123"; // Replace with actual ID (from params or props)
  const sender = "buyer"; // Or "seller", based on login info

  // Fetch chat messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Send message handler
  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMsg.trim()) return;

    const msgData = {
      conversationId,
      sender,
      text: newMsg,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/messages", msgData);
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
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

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="chat-box">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        )}

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
