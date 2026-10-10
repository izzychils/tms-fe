import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskCategory } from '../types';
import './Tasks.css';

const Tasks: React.FC = () => {
  const { currentUser, updateTask } = useApp();
  const [filter, setFilter] = useState<'all' | TaskCategory | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'category'>('dueDate');

  const handleToggleTask = (taskId: string, completed: boolean) => {
    updateTask(currentUser.id, taskId, completed);
  };

  const getFilteredTasks = () => {
    let filtered = [...currentUser.tasks];

    if (filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filter !== 'all') {
      filtered = filtered.filter(t => t.category === filter);
    }

    if (sortBy === 'dueDate') {
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = currentUser.tasks.filter(t => t.completed).length;
  const totalCount = currentUser.tasks.length;

  const categories: Array<'all' | TaskCategory | 'completed' | 'pending'> = [
    'all',
    'Documents',
    'Orientation',
    'Equipment',
    'Training',
    'completed',
    'pending',
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="tasks-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <div>
          <h1>My Tasks</h1>
          <p className="subtitle">
            Track and complete your onboarding tasks • {completedCount} of {totalCount} completed
          </p>
        </div>
        <div className="progress-badge glass-card">
          <div className="progress-text">{Math.round((completedCount / totalCount) * 100)}%</div>
          <div className="progress-label">Complete</div>
        </div>
      </div>

      {/* Filters */}
      <motion.div className="filters-section glass-card" variants={item}>
        <div className="filter-group">
          <Filter size={18} />
          <span className="filter-label">Filter:</span>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat === 'completed' ? 'Completed' : cat === 'pending' ? 'Pending' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-group">
          <span className="filter-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'category')}
          >
            <option value="dueDate">Due Date</option>
            <option value="category">Category</option>
          </select>
        </div>
      </motion.div>

      {/* Tasks List */}
      <motion.div
        className="tasks-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              className={`task-card glass-card ${task.completed ? 'completed' : ''}`}
              variants={item}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="task-checkbox">
                <button
                  className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
                  onClick={() => handleToggleTask(task.id, !task.completed)}
                >
                  {task.completed ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <Circle size={28} />
                  )}
                </button>
              </div>

              <div className="task-details">
                <div className="task-header-row">
                  <h3 className="task-title">{task.title}</h3>
                  <div className={`category-badge ${task.category.toLowerCase()}`}>
                    {task.category}
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <div className="task-due-date">
                    <Calendar size={16} />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  {new Date(task.dueDate) < new Date() && !task.completed && (
                    <span className="overdue-badge">Overdue</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <motion.div
            className="empty-state glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle2 size={64} color="var(--accent-cyan)" />
            <h3>No tasks found</h3>
            <p>Try adjusting your filters to see more tasks</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Tasks;
