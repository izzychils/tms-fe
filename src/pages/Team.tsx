import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressRing from '../components/ProgressRing';
import './Team.css';

const Team: React.FC = () => {
  const { users } = useApp();
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [nudgeMessage, setNudgeMessage] = useState('');

  const employees = users.filter(u => u.role === 'employee');
  const departments = ['all', ...Array.from(new Set(employees.map(u => u.department)))];

  const filteredEmployees =
    departmentFilter === 'all'
      ? employees
      : employees.filter(u => u.department === departmentFilter);

  const handleSendNudge = () => {
    if (selectedUser && nudgeMessage) {
      alert(`Nudge sent to ${users.find(u => u.id === selectedUser)?.name}!`);
      setShowNudgeModal(false);
      setNudgeMessage('');
      setSelectedUser('');
    }
  };

  return (
    <motion.div
      className="team-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <div>
          <h1>Team Management</h1>
          <p className="subtitle">Monitor employee onboarding progress and send reminders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar glass-card">
        <div className="filter-group">
          <Filter size={18} />
          <span className="filter-label">Department:</span>
          {departments.map(dept => (
            <button
              key={dept}
              className={`filter-btn ${departmentFilter === dept ? 'active' : ''}`}
              onClick={() => setDepartmentFilter(dept)}
            >
              {dept === 'all' ? 'All' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="team-grid">
        {filteredEmployees.map((user, index) => (
          <motion.div
            key={user.id}
            className="team-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="team-card-header">
              <div className="user-avatar-large">{user.avatar}</div>
              <ProgressRing progress={user.progress} size={80} strokeWidth={6} />
            </div>
            <div className="team-card-body">
              <h3>{user.name}</h3>
              <div className="user-details">
                <span className="department-tag">{user.department}</span>
                <span className="start-date">Started: {new Date(user.startDate).toLocaleDateString()}</span>
              </div>
              <div className="task-stats">
                <div className="stat">
                  <span className="stat-value">{user.tasks.filter(t => t.completed).length}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{user.tasks.filter(t => !t.completed).length}</span>
                  <span className="stat-label">Remaining</span>
                </div>
              </div>
            </div>
            <button
              className="nudge-btn"
              onClick={() => {
                setSelectedUser(user.id);
                setShowNudgeModal(true);
              }}
            >
              <Send size={16} />
              Send Nudge
            </button>
          </motion.div>
        ))}
      </div>

      {/* Nudge Modal */}
      {showNudgeModal && (
        <div className="modal-overlay" onClick={() => setShowNudgeModal(false)}>
          <motion.div
            className="modal-content glass-card-strong"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Send Nudge</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>To: {users.find(u => u.id === selectedUser)?.name}</label>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Enter your message..."
                  value={nudgeMessage}
                  onChange={(e) => setNudgeMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowNudgeModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSendNudge}>
                <Send size={18} />
                Send
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Team;
