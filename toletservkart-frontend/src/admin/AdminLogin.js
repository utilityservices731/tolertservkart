import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admins/login", {
        email,
        password,
      });

      alert(res.data.message || "Login successful");
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));
      navigate('/admin-dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid  bg-gradient vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderTop: "5px solid orange" }}>
        <h3 className="text-center mb-3 text-danger">Admin Login</h3>
        <p className="text-center text-muted mb-4">Access your admin dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text bg-light">📧</span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">🔒</span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <Link to="/forgot-password" className="text-decoration-none small text-primary">Forgot Password?</Link>
          </div>

          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-danger"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center text-muted small mt-3">
          Don’t have an account?{" "}
          <Link to="/admin-register" className="text-decoration-none text-danger fw-bold">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
