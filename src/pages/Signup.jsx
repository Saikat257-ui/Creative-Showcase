import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/storage.js';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    try {
      signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Signup</h2>
        
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-item">
            <label>Username</label>
            <div className="input-wrapper">
              <span className="input-icon left">
                <User size={18} />
              </span>
              <input 
                name="username" 
                placeholder="Username" 
                value={form.username} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="input-item">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon left">
                <Mail size={18} />
              </span>
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="input-item">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon left">
                <Lock size={18} />
              </span>
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={form.password} 
                onChange={handleChange} 
              />
              <span 
                className="input-icon right clickable"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">Sign Up</button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
