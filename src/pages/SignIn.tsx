import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LogIn, KeyRound } from 'lucide-react';
import './Auth.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate successful login - navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Panel - Branding */}
        <aside className="auth-brand-panel">
          <div className="auth-brand-content">
            <Link to="/" className="auth-brand-logo">
              <img src="/logo.jpg" alt="Onboad Logo" className="auth-logo-image" />
              <span className="auth-logo-text">Onboad</span>
            </Link>

            <div className="auth-brand-info">
              <h2>Welcome to employee onboarding made simple</h2>
              <p>
                Onboad helps teams onboard new employees with clear task lists, real-time 
                progress tracking, and organized workflows.
              </p>
              
              <ul className="auth-feature-list">
                <li>✓ Streamlined onboarding workflows</li>
                <li>✓ Real-time progress tracking</li>
                <li>✓ Team collaboration tools</li>
                <li>✓ Automated notifications</li>
              </ul>
            </div>

            <p className="auth-brand-footer">Trusted by 500+ companies worldwide</p>
          </div>
        </aside>

        {/* Right Panel - Form */}
        <main className="auth-form-panel">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-back-link">
              <ArrowLeft size={18} />
              Back to home
            </Link>

            <div className="auth-form-header">
              <div className="auth-icon-wrapper">
                <LogIn size={24} />
              </div>
              <h1>Welcome back</h1>
              <p>Sign in to your account to continue</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-footer">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn-submit">
                Sign in
                <LogIn size={18} />
              </button>

              <div className="auth-divider">
                <span>Don't have an account?</span>
              </div>

              <Link to="/signup" className="btn-secondary-link">
                Create an account
              </Link>
            </form>

            <div className="demo-notice">
              <KeyRound size={16} />
              <p>
                <strong>Demo Mode:</strong> Use any email and password to sign in and explore the dashboard.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignIn;
