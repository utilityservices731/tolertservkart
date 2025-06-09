import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const OwnerLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");  // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.email || !form.password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/Owners/login", form);
      localStorage.setItem("token", res.data.token);  // JWT token saved in localStorage
      alert("Owner logged in successfully!");
      navigate("/Owner-dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Owner-login-page">
      <div className="Owner-login-container">
        <div className="login-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="Owner Login"
          />
        </div>

        <form className="Owner-login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back, Owner!</h2>
          <p className="form-subtext">Please login to access your dashboard.</p>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login as Owner"}
          </button>

          <p className="redirect-text">
            New Owner? <a href="/Owner-register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OwnerLogin;
