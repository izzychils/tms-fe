import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Lightbulb, Shield } from 'lucide-react';
import './StaticPage.css';

const About: React.FC = () => {
  return (
    <div className="static-page">
      <div className="static-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to home
        </Link>
      </div>

      <motion.div
        className="static-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About Us</h1>
        
        <div className="intro-text">
          <p>
            <strong>Onboad</strong> is a new-employee onboarding and task assignment and completion tool/portal that helps teams welcome people faster, keep every task on track and give HR a clear view of who is ready.
          </p>
        </div>

        <div className="section-block">
          <div className="block-icon">
            <Target size={32} />
          </div>
          <h2>Our mission</h2>
          <p>
            To make the first days at a company clear, friendly and well organised, so new hires feel confident and managers stop chasing paperwork.
          </p>
        </div>

        <div className="section-block">
          <div className="block-icon">
            <Lightbulb size={32} />
          </div>
          <h2>The problem we solve</h2>
          <p>
            Onboarding is often scattered across emails, spreadsheets and chat messages. New hires miss documents, equipment is not ready, and managers only learn about delays when it is too late.
          </p>
        </div>

        <div className="features-overview">
          <h2>What we offer</h2>
          
          <div className="feature-section">
            <h3>
              <Users size={24} />
              For new employees
            </h3>
            <ul>
              <li>A personalised dashboard with animated progress rings.</li>
              <li>A checklist of tasks by category: Documents, Orientation, Equipment and Training.</li>
              <li>A resource library with company policies, benefits guides and IT setup documents.</li>
              <li>A profile page with your onboarding timeline.</li>
            </ul>
          </div>

          <div className="feature-section">
            <h3>
              <Shield size={24} />
              For managers and admins
            </h3>
            <ul>
              <li>A team overview showing completion rates for every employee, filtered by department.</li>
              <li>Automated and custom nudges for people with pending tasks.</li>
              <li>Weekly reports with bottleneck analysis and department readiness.</li>
              <li>Tools to create tasks for all new hires and to upload, edit and manage resources such as PDFs, videos and links.</li>
            </ul>
          </div>
        </div>

        <div className="section-block">
          <h2>Our design</h2>
          <p>
            Onboad uses a modern glass-style interface with smooth animations and a deep purple and indigo palette, so everyday HR work feels calm and polished.
          </p>
        </div>

        <div className="section-block">
          <h2>Privacy and improvement</h2>
          <p>
            We treat the personal and employment information in Onboad with care, and we keep improving the product with the feedback of the teams who use it.
          </p>
        </div>

        <div className="cta-block">
          <h3>Ready to try Onboad?</h3>
          <Link to="/dashboard" className="btn-cta">
            Get started
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
