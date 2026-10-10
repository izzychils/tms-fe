import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  User,
  Users,
  BarChart3,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sampleUsers } from '../data/mockData';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { currentUser, setCurrentUser } = useApp();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'manager';

  const employeeNav = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'My Tasks', icon: CheckSquare },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const adminNav = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/team', label: 'Team Management', icon: Users },
    { path: '/resources', label: 'Resource Library', icon: BookOpen },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const navItems = isAdmin ? adminNav : employeeNav;

  const handleUserSwitch = (user: typeof sampleUsers[0]) => {
    setCurrentUser(user);
    setShowUserDropdown(false);
  };

  return (
    <motion.aside
      className="sidebar glass-card-strong"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="/logo.jpg" alt="Onboad Logo" className="sidebar-logo-image" />
        <h2 className="gradient-text">Onboad</h2>
      </div>

      {/* Role Indicator */}
      <div className="role-indicator glass-card">
        <div className="role-badge">
          {isAdmin ? '⚡ Admin Mode' : '👤 Employee Mode'}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Switcher */}
      <div className="sidebar-footer">
        <div className="user-switcher">
          <button
            className="current-user glass-card"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="user-avatar">{currentUser.avatar}</div>
            <div className="user-info">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
            <ChevronDown
              size={16}
              className={`dropdown-icon ${showUserDropdown ? 'rotated' : ''}`}
            />
          </button>

          <AnimatePresence>
            {showUserDropdown && (
              <motion.div
                className="user-dropdown glass-card-strong"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-label">Switch Account</div>
                {sampleUsers.map(user => (
                  <button
                    key={user.id}
                    className={`dropdown-item ${
                      user.id === currentUser.id ? 'active' : ''
                    }`}
                    onClick={() => handleUserSwitch(user)}
                  >
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-role">{user.role}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
