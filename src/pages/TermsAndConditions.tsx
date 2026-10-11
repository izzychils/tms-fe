import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale } from 'lucide-react';
import './StaticPage.css';

const TermsAndConditions: React.FC = () => {
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
          <Scale size={48} />
          <h1>Terms and Conditions</h1>
          <p className="legal-date">Commercial Agreement for Onboad</p>
        </div>

        <div className="intro-text">
          <p>
            These Terms and Conditions are the commercial agreement between your organisation and MecurixTech for Onboad. They apply with the Terms of Use and Privacy Policy.
          </p>
        </div>

        <div className="legal-section">
          <h2>1. Subscription and fees</h2>
          <p>
            Access to Onboad is provided under the plan, price and number of users shown on our pricing page or in your signed order form. Fees are in Nigerian naira unless stated otherwise, exclude applicable taxes such as VAT, and may be changed with at least 30 days' notice.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Billing and renewal</h2>
          <p>
            Fees are billed in advance for each billing period and renew automatically until cancelled. Late payment may lead to suspension after notice.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. Cancellation and refunds</h2>
          <p>
            Your organisation may cancel at any time and keep access until the end of the paid period. Fees already paid are not refundable unless the law requires or we agree in writing.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Customer responsibilities</h2>
          <p>
            Your organisation is responsible for the accuracy and lawfulness of the data it enters, for informing employees how their data is used, for assigning roles correctly, and for complying with employment and data protection laws.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Data on termination</h2>
          <p>
            Before closing an account, admins can export their organisation's data. After closure we delete or anonymise it as described in the Privacy Policy, subject to legal retention duties.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Support</h2>
          <p>
            We provide reasonable support by email during our stated support hours. Priority support or service levels, if any, are set out in a separate agreement.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Confidentiality</h2>
          <p>
            Each party will protect the other's non-public information and use it only for the purposes of this agreement.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Disclaimers</h2>
          <p>
            Onboad is provided "as is" and "as available". We do not warrant that it will be error-free or that it will meet every legal or HR requirement of your organisation.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Limitation of liability</h2>
          <p>
            To the extent the law allows, Onboad is not liable for indirect or consequential loss, lost profits or lost data. Our total liability for any claim is limited to the fees paid in the three months before the claim arose.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Indemnity</h2>
          <p>
            Your organisation will cover losses and claims arising from its breach of these terms, its unlawful use of the service or the content it uploads.
          </p>
        </div>

        <div className="legal-section">
          <h2>11. Force majeure</h2>
          <p>
            Neither party is liable for delays or failures caused by events beyond its reasonable control.
          </p>
        </div>

        <div className="legal-section">
          <h2>12. Governing law and disputes</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria. The parties will first try to settle disputes in good faith. Failing that, the courts of Rivers State, Nigeria, have jurisdiction.
          </p>
        </div>

        <div className="legal-section">
          <h2>13. General</h2>
          <p>
            If part of these terms is unenforceable, the rest remains in force. These terms are the entire agreement on this subject and may not be transferred without written consent.
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

export default TermsAndConditions;
