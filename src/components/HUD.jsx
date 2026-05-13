import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function HUD() {
  const { score, target, wickets, ballsRemaining, multiplier, streak } = useGame();

  const balls = Array.from({ length: 6 }, (_, i) => ({
    key: i,
    used: i >= ballsRemaining,
  }));

  return (
    <div style={{
      background: 'var(--comic-black)',
      borderBottom: '4px solid black',
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',
      flexWrap: 'wrap',
    }}>
      {/* Score */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#777', fontSize: '0.65rem', fontFamily: 'Poppins', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Score</div>
        <motion.div
          className="bangers"
          key={score}
          initial={{ scale: 1.4, color: '#FFD600' }}
          animate={{ scale: 1, color: '#fff' }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '2.2rem', lineHeight: 1, color: '#fff' }}>
          {score}
        </motion.div>
      </div>

      {/* Target */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#777', fontSize: '0.65rem', fontFamily: 'Poppins', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Target</div>
        <div className="bangers" style={{ fontSize: '2.2rem', lineHeight: 1, color: 'var(--comic-yellow)' }}>{target}</div>
      </div>

      {/* Ball indicators */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
        <div style={{ color: '#777', fontSize: '0.65rem', fontFamily: 'Poppins', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Balls</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {balls.map(b => (
            <div key={b.key} style={{
              width: 14, height: 14, borderRadius: '50%',
              background: b.used ? '#333' : 'var(--comic-red)',
              border: `2px solid ${b.used ? '#555' : 'var(--comic-red)'}`,
              boxShadow: b.used ? 'none' : '0 0 5px var(--comic-red)',
            }} />
          ))}
        </div>
      </div>

      {/* Wicket */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#777', fontSize: '0.65rem', fontFamily: 'Poppins', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Wicket</div>
        <div className="bangers" style={{ fontSize: '2.2rem', lineHeight: 1, color: wickets ? 'var(--comic-red)' : '#fff' }}>
          {wickets ? '💀' : '🏏'}
        </div>
      </div>

      {/* Need */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#777', fontSize: '0.65rem', fontFamily: 'Poppins', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Need</div>
        <div className="bangers" style={{
          fontSize: '2.2rem', lineHeight: 1,
          color: target - score <= 0 ? 'var(--comic-green)' : 'var(--comic-yellow)',
        }}>
          {Math.max(0, target - score)}
        </div>
      </div>
    </div>
  );
}
