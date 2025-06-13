import React, { useState } from "react";
import "../App.css";

const OwnerSupport = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend integration can be added here
    console.log("Support submitted:", { subject, message });

    setStatus("✅ Your support request has been sent successfully!");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="support-page">
      <div className="support-container">
        <h2 className="section-title">🛠️ Need Help? Contact Support</h2>
        <p className="dashboard-subtext">
          Facing issues with product upload, orders, or payments? Fill the form below. Our support team will respond within 24 hours.
        </p>

        <form className="support-form" onSubmit={handleSubmit}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject..."
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            rows={5}
          ></textarea>

          <button type="submit" className="send-support-btn">
            📩 Send Message
          </button>

          {status && <p className="support-success-msg">{status}</p>}
        </form>
      </div>

      <div className="faq-section">
        <h3>💬 Frequently Asked Questions</h3>
        <ul>
          <li>How can I withdraw my wallet balance?</li>
          <li>How do I track my order or return status?</li>
          <li>Can I list both rental and sale items?</li>
          <li>Why was my product rejected during approval?</li>
        </ul>
        <p className="note">Still confused? Our support team is just a message away!</p>
      </div>
    </div>
  );
};

export default OwnerSupport;
