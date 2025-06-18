import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        alert('✅ Login successful!');
        navigate('/dashboard');
      } else {
        alert(data.message || '❌ Login failed');
      }
    } catch (err) {
      setLoading(false);
      alert("❌ Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className="login-wrapper">
        <section className="login-info">
          <h1>Welcome back to <span className="brand-highlight">ToletServKart</span>!</h1>
          <p>
            Your one-stop platform to rent verified <strong>properties</strong>, <strong>home appliances</strong>, and <strong>fashion dresses</strong>.
            Manage listings, track responses, and enjoy exclusive offers tailored for you.
          </p>
        </section>

        <div className="login-box">
          <h2 className="login-heading">Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="form-footer">
            <p>New user? <a href="/register">Create your free account</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
