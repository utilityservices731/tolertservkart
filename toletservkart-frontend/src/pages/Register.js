import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate('/login');
      }
    } catch (err) {
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0 p-4 rounded-4">
              <h2 className="text-center mb-3 text-primary">🚀 Join ToletServKart</h2>
              <p className="text-center text-muted">
                Create your free account to explore listings, post ads, and unlock exciting features.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="you@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Create Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="********"
                    required
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">Register Now</button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already registered? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
