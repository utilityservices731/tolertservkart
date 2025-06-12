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
    setErrorMsg(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/owners/login", form); // ✅ endpoint corrected

      // ✅ Store token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("ownerInfo", JSON.stringify(res.data.owner));

      alert("Owner logged in successfully!");
      navigate("/owner-dashboard"); // ✅ path lowercase & consistent
    } catch (err) {
      console.error("Login error:", err);
      const backendMsg = err.response?.data?.message;
      setErrorMsg(backendMsg || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="owner-login-page">
    <div className="owner-login-card">
      <div className="owner-login-left">
        <h1 className="brand-heading">Ambiki Rentals</h1>
        <p className="brand-tagline">Seamless renting for modern owners</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          alt="Login Illustration"
          className="owner-illustration"
        />
      </div>

      <form className="owner-login-form" onSubmit={handleSubmit}>
        <h2>Welcome, Owner 👋</h2>
        <p className="form-subtext">Log in to manage your listings and rentals.</p>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <span className="input-icon">@</span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span className="input-icon">🔒</span>
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="redirect-text">
          New here? <a href="/owner-register">Register your account</a>
        </p>
      </form>
    </div>
  </div>
);

};

export default OwnerLogin;
