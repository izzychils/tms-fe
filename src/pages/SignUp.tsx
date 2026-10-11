import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, KeyRound, UserPlus } from 'lucide-react';
import './Auth.css';

type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type SignUpForm = {
  name: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
};

const EMPTY_FORM: SignUpForm = {
  name: '',
  email: '',
  company: '',
  password: '',
  confirmPassword: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Single source of truth for validation: run on submit, and (once the form has
 * been submitted) on every keystroke, so a field can only clear its own error
 * by actually being fixed.
 */
const validate = (form: SignUpForm): SignUpErrors => {
  const next: SignUpErrors = {};

  if (!form.name.trim()) next.name = 'Your name is required';

  if (!form.email.trim()) next.email = 'Email is required';
  else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email address';

  if (!form.password) next.password = 'Password is required';
  else if (form.password.length < 8) next.password = 'Use at least 8 characters';

  if (!form.confirmPassword) next.confirmPassword = 'Confirm your password';
  else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';

  return next;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<SignUpForm>(EMPTY_FORM);

  const errors = useMemo<SignUpErrors>(
    () => (submitted ? validate(formData) : {}),
    [submitted, formData]
  );

  const passwordsMatch =
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword &&
    !errors.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(validate(formData)).length === 0) {
      // Demo workspace - go straight to the dashboard
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
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

            <p className="auth-brand-footer">Join 200+ companies onboarding with Onboad</p>
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
              <h1>Create your workspace</h1>
              <p>Start onboarding your next hire in under ten minutes</p>
            </div>

            {/* noValidate: our own messages decide, not the browser tooltip */}
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Israel Iraoya"
                    autoComplete="name"
                    className={errors.name ? 'error' : ''}
                    aria-invalid={Boolean(errors.name)}
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
                    autoComplete="email"
                    className={errors.email ? 'error' : ''}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="8+ characters"
                      autoComplete="new-password"
                      className={errors.password ? 'error' : ''}
                      aria-invalid={Boolean(errors.password)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      className={errors.confirmPassword ? 'error' : ''}
                      aria-invalid={Boolean(errors.confirmPassword)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirm((visible) => !visible)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword ? (
                    <span className="error-message">{errors.confirmPassword}</span>
                  ) : (
                    passwordsMatch && <span className="match-message">Passwords match</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Create account
                <UserPlus size={18} />
              </button>

              <p className="auth-switch">
                Already have an account? <Link to="/signin">Sign in instead</Link>
              </p>

              {/* The opt-in sits under the action so it cannot push the primary
                  button down the panel. */}
              <div className="form-footer form-footer-center">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Email me onboarding tips</span>
                </label>
              </div>
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
