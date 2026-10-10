import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import './StaticPage.css';

const Privacy: React.FC = () => {
  return (
    <div className="static-page">
      <div className="static-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to home
        </Link>
      </div>

      <motion.div
        className="static-content legal-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="legal-header">
          <Shield size={48} />
          <h1>Privacy Policy</h1>
          <p className="legal-date">Effective date: January 1, 2026</p>
        </div>
        
        <div className="intro-text">
          <p>
            <strong>LockedIn</strong> ("we", "us", "our") processes employee and employer information to run onboarding. 
            This policy explains what we collect, why, who sees it and your rights under the Nigeria Data Protection Regulation (NDPR).
          </p>
        </div>

        <div className="legal-section">
          <h2>1. Who is responsible</h2>
          <p>
            The employer (your organization) decides what onboarding data is collected and is the data controller. 
            LockedIn provides the platform and acts as a data processor for that content. For account and usage data 
            about the platform itself, we are the controller.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Information we collect</h2>
          <ul>
            <li><strong>Account and profile data:</strong> name, work email, phone number, job title, department, manager, start date and role (employee, manager or admin)</li>
            <li><strong>Onboarding data:</strong> task status and completion, due dates, timeline events, notifications and nudges sent to you</li>
            <li><strong>Documents and resources:</strong> files, links and videos uploaded by admins, and any documents employees submit for onboarding tasks</li>
            <li><strong>Reports and analytics:</strong> completion rates, bottleneck and department readiness figures derived from the above</li>
            <li><strong>Technical data:</strong> device and browser type, log-in times and error logs</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. How we use information</h2>
          <ul>
            <li>To show each employee their tasks and progress, and to let admins and managers monitor onboarding</li>
            <li>To send reminders and nudges, and to produce weekly reports</li>
            <li>To secure the service, support users and fix problems</li>
            <li>To improve the product using aggregated, non-identifying statistics</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Who can see your information</h2>
          <p>
            Employees see their own tasks and profile. Managers and admins of your organization can see onboarding progress 
            for the people they oversee. Our staff access data only when needed for support or security. 
            <strong> We do not sell personal data.</strong>
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Service providers</h2>
          <p>
            We use trusted providers for hosting, storage, email and notifications. They may process data only on our 
            instructions and must protect it.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Storage and security</h2>
          <p>
            We use encryption in transit, role-based access control and backups. Data may be processed outside Nigeria, 
            and where that happens we require protection equal to the NDPR standard.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Retention</h2>
          <p>
            Data is kept while your organization uses LockedIn and as long as the law requires. When an organization ends 
            its account, or on a valid instruction from the employer, we delete or anonymize the data within a reasonable time.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Your rights</h2>
          <p>
            You may ask to access, correct, delete, restrict or export your personal data, object to processing and 
            withdraw consent. For employment-related data, please first contact your employer's HR team; you may also 
            contact us, and you may complain to the Nigeria Data Protection Commission.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Children</h2>
          <p>
            LockedIn is for working adults. We do not knowingly collect data from anyone under 18.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Changes</h2>
          <p>
            We may update this policy and will notify users in the product or by email.
          </p>
        </div>

        <div className="cta-block">
          <h3>Questions about privacy?</h3>
          <Link to="/contact" className="btn-cta">
            Contact us
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
