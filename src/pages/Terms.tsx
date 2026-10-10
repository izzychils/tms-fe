import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import './StaticPage.css';

const Terms: React.FC = () => {
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
          <FileText size={48} />
          <h1>Terms of Use</h1>
          <p className="legal-date">Effective date: January 1, 2026</p>
        </div>
        
        <div className="intro-text">
          <p>
            These Terms of Use govern your access to and use of Onboad. By using it, you agree to them.
          </p>
        </div>

        <div className="legal-section">
          <h2>1. Who can use it</h2>
          <p>
            Onboad is for organizations and their employees. You must be 18 or older. If you sign up for an organization, 
            you confirm you have authority to bind it.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Roles and access</h2>
          <ul>
            <li><strong>Employees</strong> can view and complete their own tasks, and view and download resources</li>
            <li><strong>Managers and admins</strong> can view team progress, filter by department, send nudges, create tasks, 
            and upload, edit or delete resources</li>
            <li>The organization is responsible for giving the right role to the right person and for removing access when someone leaves</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Your account</h2>
          <p>
            Keep your log-in details secure. You are responsible for activity under your account and must tell us promptly 
            of any suspected misuse.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Upload unlawful, infringing, harmful or confidential material you have no right to share</li>
            <li>Use nudges, messages or reports to harass, discriminate against or unfairly target any person</li>
            <li>Access data you are not authorized to see, or try to bypass role restrictions</li>
            <li>Interfere with, scrape, copy or reverse-engineer the service</li>
            <li>Upload malware or anything that could damage the platform or other users</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Content you upload</h2>
          <p>
            Your organization keeps ownership of the tasks, documents and resources it uploads. You give us a limited licence 
            to host and process them to provide the service. The organization is responsible for making sure it has the right 
            to upload them and the lawful basis to process employee data.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Reports and analytics</h2>
          <p>
            Completion rates and bottleneck figures are decision aids based on the data entered. They should not be the only 
            basis for employment decisions such as discipline or dismissal.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Demo mode</h2>
          <p>
            Any demo or sample accounts, such as the role switcher and pre-filled sample data, are for evaluation only. 
            They do not represent real people.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Our property</h2>
          <p>
            Onboad, its software, design, name and logo belong to MecurixTech.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Availability and changes</h2>
          <p>
            We work to keep the service available but do not promise uninterrupted access. We may improve, change or retire 
            features with reasonable notice.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Suspension and ending</h2>
          <p>
            We may suspend or end access for breach of these terms or the law. You may stop using the service at any time.
          </p>
        </div>

        <div className="legal-section">
          <h2>11. Governing law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria. The parties will first try to settle 
            disputes in good faith. Failing that, the courts of Rivers State, Nigeria, have jurisdiction.
          </p>
        </div>

        <div className="cta-block">
          <h3>Questions about terms?</h3>
          <Link to="/contact" className="btn-cta">
            Contact us
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
