import React from 'react';
import { motion } from 'framer-motion';
import './ProgressRing.css';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  animate?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'var(--primary-light)',
  label,
  animate = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring-svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          initial={animate ? { strokeDashoffset: circumference } : undefined}
          animate={animate ? { strokeDashoffset: offset } : undefined}
          transition={animate ? { duration: 1.5, ease: 'easeOut', delay: 0.2 } : undefined}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-ring-circle"
        />
      </svg>
      
      <div className="progress-ring-content">
        <motion.div
          className="progress-percentage"
          initial={animate ? { opacity: 0, scale: 0.5 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={animate ? { duration: 0.5, delay: 0.5 } : undefined}
        >
          {progress}%
        </motion.div>
        {label && <div className="progress-label">{label}</div>}
      </div>
    </div>
  );
};

export default ProgressRing;
