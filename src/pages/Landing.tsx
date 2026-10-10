import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import './Landing.css';

const Landing: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Users,
      title: 'Seamless Onboarding',
      description: 'Guide new hires through every step with personalized task lists and progress tracking',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      description: 'Track team progress, identify bottlenecks, and optimize your onboarding process',
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Send automated reminders and notifications to keep everyone on track',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Keep all employee data safe and ensure compliance with company policies',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Employees Onboarded' },
    { value: '95%', label: 'Completion Rate' },
    { value: '60%', label: 'Time Saved' },
    { value: '4.9', label: 'User Rating', icon: Star },
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'HR Director',
      company: 'TechCorp',
      avatar: '👩‍💼',
      quote: 'Onboard Flow transformed our hiring process. New employees are productive 40% faster.',
    },
    {
      name: 'James Chen',
      role: 'VP of Operations',
      company: 'StartupXYZ',
      avatar: '👨‍💻',
      quote: 'The analytics dashboard gave us insights we never had before. A game changer!',
    },
    {
      name: 'Maria Garcia',
      role: 'People Operations Lead',
      company: 'GlobalCo',
      avatar: '👩‍⚕️',
      quote: 'Best onboarding platform we have used. Our team loves it and new hires feel welcomed.',
    },
  ];

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="liquid-background">
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
        <div className="liquid-blob"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav glass-card-strong">
        <div className="nav-container">
          <div className="nav-logo">
            <Sparkles className="logo-icon" />
            <span className="gradient-text">Onboard Flow</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <Link to="/dashboard" className="btn-primary-landing">
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge glass-card">
              <Sparkles size={16} />
              <span>Trusted by 500+ companies worldwide</span>
            </div>
            
            <h1 className="hero-title">
              Welcome new hires with a{' '}
              <span className="gradient-text-pink">seamless</span> onboarding experience
            </h1>
            
            <p className="hero-subtitle">
              Transform your employee onboarding with automated workflows, real-time progress tracking,
              and beautiful dashboards that make new hires feel right at home.
            </p>
            
            <div className="hero-actions">
              <Link to="/dashboard" className="btn-hero-primary">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <button className="btn-hero-secondary">
                Watch Demo
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar glass-card">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="stat-value">
                    {stat.value}
                    {stat.icon && <stat.icon size={20} className="stat-icon" />}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image - Dashboard Preview */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dashboard-preview glass-card-strong">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="preview-title">Onboard Flow Dashboard</span>
              </div>
              <div className="preview-content">
                <div className="preview-card">
                  <div className="card-header">
                    <Users size={24} color="var(--accent-cyan)" />
                    <span>8 Active Employees</span>
                  </div>
                  <div className="progress-preview">
                    <div className="progress-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="card-header">
                    <TrendingUp size={24} color="var(--accent-pink)" />
                    <span>92% Avg Progress</span>
                  </div>
                  <div className="progress-preview">
                    <div className="progress-bar" style={{ width: '92%' }}></div>
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
            <h2>
              Everything you need to{' '}
              <span className="gradient-text">streamline onboarding</span>
            </h2>
            <p>Powerful features designed to make employee onboarding effortless</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`feature-card glass-card ${activeFeature === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">
                  <feature.icon size={32} />
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
            <h2>
              How it <span className="gradient-text">works</span>
            </h2>
            <p>Get started in minutes with our simple three-step process</p>
          </motion.div>

          <div className="steps-container">
            {[
              {
                step: '01',
                title: 'Create Tasks',
                description: 'Set up onboarding tasks across categories like Documents, Training, and Equipment',
                icon: CheckCircle2,
              },
              {
                step: '02',
                title: 'Invite Employees',
                description: 'Add new hires and assign personalized task lists with due dates',
                icon: Users,
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor completion rates in real-time and send automated reminders',
                icon: Clock,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="step-card glass-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-icon">
                  <step.icon size={40} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>
              Loved by <span className="gradient-text-pink">teams</span> everywhere
            </h2>
            <p>See what HR leaders are saying about Onboard Flow</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="testimonial-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="quote-icon">"</div>
                <p className="quote-text">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container glass-card-strong">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to transform your onboarding?</h2>
            <p>Join hundreds of companies creating better first-day experiences</p>
            <Link to="/dashboard" className="btn-cta">
              Get Started Now
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
              <Sparkles size={24} />
              <span className="gradient-text">Onboard Flow</span>
            </div>
            <p>Make every first day extraordinary</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#testimonials">Testimonials</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Blog</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Onboard Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
