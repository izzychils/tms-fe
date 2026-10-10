import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressRing from '../components/ProgressRing';
import './Profile.css';

const Profile: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1>My Profile</h1>
        <p className="subtitle">View your onboarding journey and personal information</p>
      </div>

      {/* Profile Info Card */}
      <motion.div
        className="profile-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-header">
          <div className="profile-avatar-large">{currentUser.avatar}</div>
          <div className="profile-info">
            <h2>{currentUser.name}</h2>
            <div className="profile-details">
              <div className="detail-item">
                <Mail size={16} />
                <span>{currentUser.email}</span>
              </div>
              <div className="detail-item">
                <Briefcase size={16} />
                <span>{currentUser.department}</span>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <span>Started: {new Date(currentUser.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="profile-progress">
            <ProgressRing progress={currentUser.progress} size={140} strokeWidth={10} />
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="timeline-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Onboarding Timeline</h2>
        <div className="timeline">
          {currentUser.timeline.map((event, index) => (
            <motion.div
              key={event.id}
              className={`timeline-item ${event.completed ? 'completed' : 'pending'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="timeline-marker">
                {event.completed ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <Clock size={24} />
                )}
              </div>
              <div className="timeline-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="timeline-date">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="stats-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.2)' }}>
            <CheckCircle2 size={28} color="#34d399" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{currentUser.tasks.filter(t => t.completed).length}</div>
            <div className="stat-label">Tasks Completed</div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'rgba(251, 146, 60, 0.2)' }}>
            <Clock size={28} color="#fb923c" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{currentUser.tasks.filter(t => !t.completed).length}</div>
            <div className="stat-label">Tasks Remaining</div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
            <Calendar size={28} color="var(--primary-light)" />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {Math.ceil((new Date().getTime() - new Date(currentUser.startDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="stat-label">Days at Company</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
