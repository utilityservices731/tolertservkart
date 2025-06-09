import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const OwnerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation example
    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/Owners/register", form);
      alert("Owner registered successfully!");
      navigate("/Owner-login");
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Owner-register-page">
      <div className="Owner-register-container">
        <div className="register-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706797.png"
            alt="Register"
          />
        </div>

        <form className="Owner-register-form" onSubmit={handleSubmit}>
          <h2>Create Owner Account</h2>
          <p className="form-subtext">Join us to start uploading your fashion items.</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Owner"}
          </button>

          <p className="redirect-text">
            Already a Owner? <a href="/Owner-login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OwnerRegister;
