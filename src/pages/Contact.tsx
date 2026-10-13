import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MapPin, MessageSquare, Shield, Globe } from 'lucide-react';
// import { Mail, CreditCard, FileText } from 'lucide-react';
import './StaticPage.css';

const Contact: React.FC = () => {
  const contactMethods: {
    icon: typeof MessageSquare;
    title: string;
    items: { label: string; value: string; href?: string }[];
  }[] = [
    {
      icon: MessageSquare,
      title: 'General support',
      items: [
        { label: 'Email', value: 'support@onboad.com', href: 'mailto:support@onboad.com' },
        { label: 'Phone/WhatsApp', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
      ],
    },
    /*
    {
      icon: Mail,
      title: 'Sales and demos',
      items: [
        { label: 'Email', value: 'sales@onboad.com', href: 'mailto:sales@onboad.com' },
      ],
    },
    {
      icon: CreditCard,
      title: 'Billing',
      items: [
        { label: 'Email', value: 'billing@onboad.com', href: 'mailto:billing@onboad.com' },
      ],
    },
    {
      icon: Shield,
      title: 'Privacy and data requests',
      items: [
        { label: 'Email', value: 'privacy@onboad.com', href: 'mailto:privacy@onboad.com' },
        { label: 'Subject', value: 'Please use "Data Request" as the subject' },
      ],
    },
    {
      icon: FileText,
      title: 'Legal notices',
      items: [
        { label: 'Email', value: 'legal@onboad.com', href: 'mailto:legal@onboad.com' },
      ],
    },
    */
  ];

  return (
    <div className="static-page">
      <div className="static-header">
        <Link to="/" className="static-brand">
          <img src="/logo.jpg" alt="" />
          <span>Onboad</span>
        </Link>
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          Back to home
        </Link>
      </div>

      <motion.div
        className="static-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="page-eyebrow">Get in touch</p>
        <h1>Contact Us</h1>
        
        <div className="intro-text">
          <p>
            Have a question, need help or want a demo of Onboad? Reach us through any channel below.
          </p>
        </div>

        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="contact-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="contact-icon">
                <method.icon size={28} />
              </div>
              <h3>{method.title}</h3>
              <div className="contact-items">
                {method.items.map((item) => (
                  <div key={item.label} className="contact-item">
                    <span className="contact-label">{item.label}:</span>
                    {item.href ? (
                      <a className="contact-value" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="company-info">
          <div className="info-block">
            <MapPin size={24} />
            <div>
              <h3>Company</h3>
              <p>Rivers State, Nigeria</p>
              <p>Registered address: Rivers State, Nigeria</p>
            </div>
          </div>

          <div className="info-block">
            <Phone size={24} />
            <div>
              <h3>Support hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM (WAT)</p>
              <p>We aim to respond within 24 business hours</p>
            </div>
          </div>

          <div className="info-block">
            <Globe size={24} />
            <div>
              <h3>Website</h3>
              <p>
                <a className="info-link" href="https://onboad.com">
                  https://onboad.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="security-note">
          <Shield size={20} />
          <p>
            <strong>Security note:</strong> Please include your organisation name and a short description of the issue. Never send passwords or private keys.
          </p>
        </div>

        <div className="cta-block">
          <h3>Ready to get started?</h3>
          <Link to="/dashboard" className="btn-cta">
            Try Onboad now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
