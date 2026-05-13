import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard } from '../database/googleSheets';

export default function Leaderboard({ onClose }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => {
      setScores(data);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="comic-panel"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        style={{ width: '90%', maxWidth: 420, padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>

        <div className="bangers" style={{
          fontSize: '2.2rem', textAlign: 'center',
          color: 'var(--comic-red)', textShadow: '3px 3px 0 black',
          marginBottom: '1rem', letterSpacing: '0.08em',
        }}>
          🏆 HALL OF FAME
        </div>

        {loading ? (
          <p className="bangers" style={{ textAlign: 'center', fontSize: '1.4rem', opacity: 0.6 }}>LOADING…</p>
        ) : scores.length === 0 ? (
          <p className="bangers" style={{ textAlign: 'center', fontSize: '1.2rem', opacity: 0.6 }}>NO SCORES YET! BE FIRST!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {scores.map((s, i) => (
              <motion.div key={s.id || i}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  padding: '0.5rem 0.8rem',
                  background: i === 0 ? 'var(--comic-yellow)' : i === 1 ? '#e0e0e0' : i === 2 ? '#ffe0b2' : '#f5f5f5',
                  border: 'var(--border)', borderRadius: 4,
                  boxShadow: '3px 3px 0 black',
                }}>
                <span className="bangers" style={{ fontSize: '1.4rem', minWidth: 30, color: 'var(--comic-black)' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                </span>
                <span className="bangers" style={{ fontSize: '1.2rem', flex: 1, letterSpacing: '0.06em' }}>{s.name}</span>
                <span className="bangers" style={{ fontSize: '1.5rem', color: 'var(--comic-red)' }}>{s.score}</span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.button className="comic-btn"
          onClick={onClose}
          style={{ width: '100%', marginTop: '1rem', background: 'var(--comic-black)', color: 'var(--comic-yellow)' }}
          whileTap={{ scale: 0.95 }}>
          CLOSE ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
