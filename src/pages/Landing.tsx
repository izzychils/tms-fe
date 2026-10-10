import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  FileText,
  Bell,
  ChevronRight,
  Menu,
  LogIn,
  UserPlus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import './Landing.css';

const Landing: React.FC = () => {

  const features = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Bring your whole team together with shared task lists and real-time progress updates',
    },
    {
      icon: BarChart3,
      title: 'Powerful Analytics',
      description: 'Track completion rates, identify bottlenecks, and optimize your onboarding workflow',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Automated reminders keep everyone on track without manual follow-ups',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance features to keep employee data safe',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Employees Onboarded' },
    { value: '95%', label: 'Completion Rate' },
    { value: '60%', label: 'Time Saved' },
    { value: '500+', label: 'Companies' },
  ];

  const steps = [
    {
      icon: FileText,
      title: 'Create your workflow',
      description: 'Set up onboarding tasks organized by category with custom due dates',
    },
    {
      icon: Users,
      title: 'Invite your team',
      description: 'Add new hires and assign personalized task lists in minutes',
    },
    {
      icon: TrendingUp,
      title: 'Track progress',
      description: 'Monitor completion in real-time with beautiful dashboards',
    },
  ];

  return (
    <div className="landing-page">
      {/* Subtle Background */}
      <div className="liquid-background">
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/logo.jpg" alt="LockedIn Logo" className="logo-image" />
            <span className="logo-text">LockedIn</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="nav-auth-desktop">
            <Link to="/signin" className="btn-signin">
              <LogIn size={16} />
              Sign in
            </Link>
            <Link to="/signup" className="btn-signup">
              <UserPlus size={16} />
              Get started
            </Link>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className="mobile-menu-dropdown">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="mobile-menu-btn-glass" aria-label="Toggle menu">
                  <Menu size={24} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent 
                className="mobile-menu-dropdown-content"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuItem asChild>
                  <a href="#features" className="dropdown-nav-link">
                    Features
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#how-it-works" className="dropdown-nav-link">
                    How it works
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" className="dropdown-nav-link">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact" className="dropdown-nav-link">
                    Contact
                  </Link>
                </DropdownMenuItem>
                <div className="dropdown-cta-buttons">
                  <Link to="/signin" className="btn-signin-dropdown">
                    <LogIn size={16} />
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn-signup-dropdown">
                    <UserPlus size={16} />
                    Get started
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <CheckCircle2 size={14} />
              <span>Trusted by 500+ companies worldwide</span>
            </div>
            
            <h1 className="hero-title">
              Where teams welcome new hires <span className="text-highlight">faster</span>
            </h1>
            
            <p className="hero-subtitle">
              LockedIn helps teams onboard new employees with clear task lists, real-time progress tracking, 
              and organized workflows. Keep everyone on track and give HR a complete view of who's ready.
            </p>
            
            <div className="hero-actions">
              <Link to="/signup" className="btn-hero-primary">
                Start free trial
                <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="btn-hero-secondary">
                See how it works
                <ChevronRight size={20} />
              </a>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual - Dashboard Preview */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
              <div className="preview-content">
                <div className="preview-card">
                  <div className="card-icon">
                    <Users size={20} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">Team Overview</div>
                    <div className="card-value">12 active employees</div>
                  </div>
                  <div className="card-chart">
                    <div className="mini-bar" style={{ height: '40%' }}></div>
                    <div className="mini-bar" style={{ height: '75%' }}></div>
                    <div className="mini-bar" style={{ height: '60%' }}></div>
                    <div className="mini-bar" style={{ height: '90%' }}></div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="card-icon green">
                    <TrendingUp size={20} />
                  </div>
                  <div className="card-info">
                    <div className="card-title">Progress Rate</div>
                    <div className="card-value">87% complete</div>
                  </div>
                  <div className="progress-indicator">
                    <div className="progress-fill" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Everything you need for seamless onboarding</h2>
            <p>Powerful features designed to make employee onboarding effortless and efficient</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>How it works</h2>
            <p>Get started in minutes with our simple three-step process</p>
          </motion.div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="step-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="step-icon">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to transform your onboarding?</h2>
            <p>Join hundreds of companies creating better first-day experiences for their employees</p>
            <Link to="/signup" className="btn-cta">
              Start your free trial
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="LockedIn Logo" className="logo-image" />
              <span className="logo-text">LockedIn</span>
            </div>
            <p>Make the first days clear, friendly, and well-organized</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About us</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LockedIn by MecurixTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
