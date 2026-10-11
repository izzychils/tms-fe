import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, KeyRound, UserPlus } from 'lucide-react';
import './Auth.css';

type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: SignUpErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Use at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Demo workspace - go straight to the dashboard
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof SignUpErrors]) {
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
              <h2>Your team's first weeks, finally organised</h2>
              <p>
                Create a workspace, pick a template for the role you are hiring, and Onboad
                gives every new hire a clear plan with owners and due dates.
              </p>

              <ul className="auth-feature-list">
                <li>✓ A checklist ready before day one</li>
                <li>✓ Owners and due dates set automatically</li>
                <li>✓ Progress you can show leadership</li>
                <li>✓ Free for 14 days, no card needed</li>
              </ul>
            </div>

            <p className="auth-brand-footer">Join 500+ companies onboarding with Onboad</p>
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
                <UserPlus size={24} />
              </div>
              <h1>Create your workspace</h1>
              <p>Start onboarding your next hire in under ten minutes</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Israel Iraoya"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="company">Company (optional)</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Northwind"
                />
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
                    placeholder="At least 8 characters"
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
                  <input type="checkbox" defaultChecked />
                  <span>Email me onboarding tips</span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Create account
                <UserPlus size={18} />
              </button>

              <div className="auth-divider">
                <span>Already have an account?</span>
              </div>

              <Link to="/signin" className="btn-secondary-link">
                Sign in instead
              </Link>
            </form>

            <div className="demo-notice">
              <KeyRound size={16} />
              <p>
                <strong>Demo Mode:</strong> No data leaves your machine. Creating an account takes
                you straight to the example workspace.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
