import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/admins/register', {
        name,
        email,
        password,
      });

      alert(res.data.message || "Registration successful!");
      navigate('/admin-login');
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid  bg-gradient vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%", borderTop: "5px solid red" }}>
        <h3 className="text-center text-danger mb-3">Admin Register</h3>
        <p className="text-center text-muted mb-4">Create your admin account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="John Doe"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="admin@example.com"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="********"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-danger" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-center text-muted small mt-3">
          Already have an account?{' '}
          <Link to="/admin-login" className="text-decoration-none text-danger fw-bold">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
