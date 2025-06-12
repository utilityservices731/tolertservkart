import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

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
        alert('Login successful!');
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page-bg">
      <section className="about-company">
        <h1>Welcome Back to <span className="highlight">ToletServKart</span>!</h1>
        <p>
          Your one-stop platform to rent verified <strong>properties</strong>, <strong>home appliances</strong>, and <strong>fashion dresses</strong>.
          Enjoy a seamless rental experience across India. Log in now to manage your listings, track responses, and discover personalized offers just for you!
        </p>
      </section>

      <div className="login-container">
        <h2 className="login-title">Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
         <div className="input-group">
  <i className="fas fa-envelope"></i>
  <input
    type="email"
    name="email"
    placeholder="Email Address"
    required
    className="input-field"
    onChange={handleChange}
  />
</div>

<div className="input-group">
  <i className="fas fa-lock"></i>
  <input
    type="password"
    name="password"
    placeholder="Password"
    required
    className="input-field"
    onChange={handleChange}
  />
</div>


          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          New here? <a href="/register" className="signup-link">Create your free account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;