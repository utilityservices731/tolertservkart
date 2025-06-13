import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const OwnerProfileSettings = () => {
  const token = localStorage.getItem("token");
  const storedInfo = JSON.parse(localStorage.getItem("ownerInfo"));

  const [name, setName] = useState(storedInfo?.name || "");
  const [email, setEmail] = useState(storedInfo?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    axios
      .put(
        "http://localhost:5000/api/owner/profile",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("ownerInfo", JSON.stringify(res.data));
        setMessage("✅ Profile updated successfully.");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error updating profile.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="profile-page">
      <div className="profile-settings-container">
        <h2 className="section-title">👤 Edit Profile</h2>

        <form onSubmit={handleUpdate} className="profile-form">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Leave blank to keep same"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="save-profile-btn" disabled={loading}>
            {loading ? "Saving..." : "💾 Save Changes"}
          </button>

          {message && <p className="profile-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default OwnerProfileSettings;
