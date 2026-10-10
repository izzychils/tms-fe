import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressRing from '../components/ProgressRing';
import { TaskCategory } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { currentUser, users } = useApp();

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'manager';

  // Calculate category progress for employees
  const getCategoryProgress = () => {
    const categories: TaskCategory[] = ['Documents', 'Orientation', 'Equipment', 'Training'];
    return categories.map(category => {
      const categoryTasks = currentUser.tasks.filter(t => t.category === category);
      const completed = categoryTasks.filter(t => t.completed).length;
      const total = categoryTasks.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return { category, completed, total, progress };
    });
  };

  // Calculate admin stats
  const getAdminStats = () => {
    const employees = users.filter(u => u.role === 'employee');
    const totalEmployees = employees.length;
    const avgProgress = Math.round(
      employees.reduce((sum, user) => sum + user.progress, 0) / totalEmployees
    );
    
    const completed = employees.filter(u => u.progress === 100).length;
    const inProgress = employees.filter(u => u.progress > 0 && u.progress < 100).length;
    const overdue = employees.filter(u => {
      return u.tasks.some(t => !t.completed && new Date(t.dueDate) < new Date());
    }).length;

    return { totalEmployees, avgProgress, completed, inProgress, overdue };
  };

  const categoryProgress = !isAdmin ? getCategoryProgress() : [];
  const adminStats = isAdmin ? getAdminStats() : null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isAdmin) {
    return (
      <motion.div
        className="dashboard"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="dashboard-header" variants={item}>
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage employee onboarding and track team progress</p>
        </motion.div>

        {/* Admin Stats Grid */}
        <motion.div className="stats-grid" variants={container}>
          <motion.div className="stat-card glass-card" variants={item}>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
              <TrendingUp size={24} color="var(--primary-light)" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Employees</div>
              <div className="stat-value">{adminStats?.totalEmployees}</div>
            </div>
          </motion.div>

          <motion.div className="stat-card glass-card" variants={item}>
            <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
              <CheckCircle2 size={24} color="var(--accent-cyan)" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Avg Progress</div>
              <div className="stat-value">{adminStats?.avgProgress}%</div>
            </div>
          </motion.div>

          <motion.div className="stat-card glass-card" variants={item}>
            <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.2)' }}>
              <CheckCircle2 size={24} color="#34d399" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Completed</div>
              <div className="stat-value">{adminStats?.completed}</div>
            </div>
          </motion.div>

          <motion.div className="stat-card glass-card" variants={item}>
            <div className="stat-icon" style={{ background: 'rgba(251, 146, 60, 0.2)' }}>
              <Clock size={24} color="#fb923c" />
            </div>
            <div className="stat-content">
              <div className="stat-label">In Progress</div>
              <div className="stat-value">{adminStats?.inProgress}</div>
            </div>
          </motion.div>

          <motion.div className="stat-card glass-card" variants={item}>
            <div className="stat-icon" style={{ background: 'rgba(248, 113, 113, 0.2)' }}>
              <AlertCircle size={24} color="#f87171" />
            </div>
            <div className="stat-content">
              <div className="stat-label">Overdue</div>
              <div className="stat-value">{adminStats?.overdue}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Overview Chart */}
        <motion.div className="chart-section glass-card" variants={item}>
          <h2>Team Overview</h2>
          <div className="team-progress-grid">
            {users
              .filter(u => u.role === 'employee')
              .map((user, index) => (
                <motion.div
                  key={user.id}
                  className="team-member-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="member-avatar">{user.avatar}</div>
                  <div className="member-info">
                    <div className="member-name">{user.name}</div>
                    <div className="member-department">{user.department}</div>
                  </div>
                  <ProgressRing progress={user.progress} size={60} strokeWidth={6} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Employee Dashboard
  const upcomingTasks = currentUser.tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <motion.div
      className="dashboard"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="dashboard-header" variants={item}>
        <h1>Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p className="subtitle">Track your onboarding progress and complete your tasks</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div className="progress-section glass-card" variants={item}>
        <div className="progress-header">
          <h2>Overall Progress</h2>
          <div className="progress-stats">
            <span className="stat-item">
              <CheckCircle2 size={18} />
              {currentUser.tasks.filter(t => t.completed).length} of {currentUser.tasks.length} completed
            </span>
          </div>
        </div>
        <div className="progress-ring-large">
          <ProgressRing progress={currentUser.progress} size={180} strokeWidth={12} />
        </div>
      </motion.div>

      {/* Category Progress */}
      <motion.div className="category-grid" variants={container}>
        {categoryProgress.map((cat, index) => (
          <motion.div
            key={cat.category}
            className="category-card glass-card"
            variants={item}
            whileHover={{ scale: 1.02 }}
          >
            <div className="category-header">
              <h3>{cat.category}</h3>
              <span className="category-count">{cat.completed}/{cat.total}</span>
            </div>
            <ProgressRing
              progress={cat.progress}
              size={100}
              strokeWidth={8}
              color={
                index === 0
                  ? 'var(--primary-light)'
                  : index === 1
                  ? 'var(--accent-cyan)'
                  : index === 2
                  ? 'var(--accent-pink)'
                  : 'var(--secondary)'
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Tasks */}
      <motion.div className="upcoming-section glass-card" variants={item}>
        <h2>Upcoming Tasks</h2>
        <div className="tasks-list">
          {upcomingTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className="task-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`task-category-badge ${task.category.toLowerCase()}`}>
                {task.category}
              </div>
              <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
              </div>
              <Clock size={18} className="task-icon" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      {currentUser.notifications.length > 0 && (
        <motion.div className="notifications-section glass-card" variants={item}>
          <h2>Recent Notifications</h2>
          <div className="notifications-list">
            {currentUser.notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                className={`notification-item ${notif.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AlertCircle size={20} />
                <span>{notif.message}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;
