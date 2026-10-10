import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { weeklyReport, departmentStats } from '../data/mockData';
import './Reports.css';

const Reports: React.FC = () => {
  const maxBottleneck = Math.max(...weeklyReport.bottlenecks.map(b => b.count));

  return (
    <motion.div
      className="reports-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="subtitle">Track bottlenecks and department readiness metrics</p>
        </div>
      </div>

      {/* Weekly Report Summary */}
      <motion.div
        className="report-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-header">
          <h2>{weeklyReport.week}</h2>
          <BarChart3 size={24} color="var(--primary-light)" />
        </div>

        {/* Bottlenecks */}
        <div className="bottlenecks-section">
          <h3>Task Bottlenecks</h3>
          <p className="section-description">Tasks taking longer than expected to complete</p>
          <div className="bottlenecks-chart">
            {weeklyReport.bottlenecks.map((bottleneck, index) => (
              <motion.div
                key={bottleneck.category}
                className="chart-bar-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="chart-label">
                  <span className="label-text">{bottleneck.category}</span>
                  <span className="label-count">{bottleneck.count} tasks</span>
                </div>
                <div className="chart-bar-wrapper">
                  <motion.div
                    className={`chart-bar ${bottleneck.category.toLowerCase()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(bottleneck.count / maxBottleneck) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  >
                    <span className="bar-value">{bottleneck.avgCompletionTime} days avg</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Department Readiness */}
      <motion.div
        className="report-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-header">
          <h2>Department Readiness</h2>
          <TrendingUp size={24} color="var(--accent-cyan)" />
        </div>
        <div className="department-grid">
          {departmentStats.map((dept, index) => (
            <motion.div
              key={dept.department}
              className="department-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="dept-header">
                <h3>{dept.department}</h3>
                <div className="dept-progress">{dept.avgProgress}%</div>
              </div>
              <div className="dept-stats">
                <div className="dept-stat">
                  <span className="stat-label">Total Employees</span>
                  <span className="stat-value">{dept.totalEmployees}</span>
                </div>
                <div className="dept-stat completed">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">{dept.completed}</span>
                </div>
                <div className="dept-stat in-progress">
                  <span className="stat-label">In Progress</span>
                  <span className="stat-value">{dept.inProgress}</span>
                </div>
                {dept.overdue > 0 && (
                  <div className="dept-stat overdue">
                    <AlertTriangle size={16} />
                    <span className="stat-label">Overdue</span>
                    <span className="stat-value">{dept.overdue}</span>
                  </div>
                )}
              </div>
              <div className="progress-bar-container">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.avgProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
