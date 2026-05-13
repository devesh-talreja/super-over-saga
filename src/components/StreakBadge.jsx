import React from 'react';
import { motion } from 'framer-motion';

export default function StreakBadge({ streak, multiplier }) {
  if (multiplier < 2) return null;

  return (
    <motion.div
      className="fire-pulse"
      initial={{ scale: 0, x: '-50%' }}
      animate={{ scale: 1, x: '-50%' }}
      style={{
        position: 'absolute', top: 8, left: '50%',
        background: multiplier === 3 ? 'var(--comic-red)' : '#FF6D00',
        border: '3px solid black',
        boxShadow: '4px 4px 0 black',
        borderRadius: 999,
        padding: '0.2rem 1rem',
        zIndex: 20,
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
      <span style={{ fontSize: '1.2rem' }}>🔥</span>
      <span className="bangers" style={{ color: '#fff', fontSize: '1.3rem', letterSpacing: '0.06em', textShadow: '2px 2px 0 black' }}>
        {streak} STREAK · {multiplier}x
      </span>
    </motion.div>
  );
}
