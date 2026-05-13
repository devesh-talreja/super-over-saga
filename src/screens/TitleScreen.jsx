import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const stars = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top:  `${5 + Math.random() * 85}%`,
  left: `${5 + Math.random() * 85}%`,
  size: `${0.6 + Math.random() * 1.2}rem`,
  delay: Math.random() * 1.5,
}));

export default function TitleScreen() {
  const { startGame } = useGame();

  return (
    <div className="halftone" style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative stars */}
      {stars.map(s => (
        <motion.div key={s.id} style={{
          position: 'absolute', top: s.top, left: s.left,
          fontSize: s.size, pointerEvents: 'none',
        }}
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 3 + s.delay, repeat: Infinity, ease: 'linear' }}>
          ✦
        </motion.div>
      ))}

      {/* Comic panel wrapper */}
      <motion.div className="comic-panel" style={{
        padding: '2.5rem 3rem', textAlign: 'center',
        maxWidth: 520, width: '90%', background: 'var(--comic-yellow)',
        position: 'relative', zIndex: 2,
      }}
        initial={{ scale: 0, rotate: -6 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}>

        {/* IPL tag */}
        <div style={{
          background: 'var(--comic-purple)', color: '#fff',
          fontFamily: 'Bangers, cursive', fontSize: '1.1rem',
          letterSpacing: '0.15em', padding: '0.2rem 1rem',
          border: 'var(--border)', display: 'inline-block',
          marginBottom: '0.5rem', boxShadow: '3px 3px 0 black',
        }}>🏏 IPL T20 EDITION</div>

        <h1 className="bangers" style={{
          fontSize: 'clamp(3rem, 10vw, 5.5rem)',
          lineHeight: 1, color: 'var(--comic-black)',
          WebkitTextStroke: '2px black',
          textShadow: '4px 4px 0 var(--comic-red)',
        }}>
          SUPER<br />OVER<br />
          <span style={{ color: 'var(--comic-red)' }}>SAGA</span>
        </h1>

        <p className="bangers" style={{
          fontSize: '1.3rem', color: 'var(--comic-blue)',
          margin: '0.8rem 0 1.5rem', letterSpacing: '0.08em',
        }}>
          6 BALLS. ONE SHOT. BEAT THE TARGET!
        </p>

        {/* Instruction pills */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {['⚡ TIME YOUR TAP', '🔥 STREAK = MULTIPLIER', '🎯 BEAT THE SCORE'].map(t => (
            <span key={t} style={{
              background: 'var(--comic-black)', color: 'var(--comic-yellow)',
              fontFamily: 'Bangers, cursive', fontSize: '0.85rem',
              padding: '0.2rem 0.7rem', borderRadius: '999px',
              letterSpacing: '0.05em',
            }}>{t}</span>
          ))}
        </div>

        <motion.button className="comic-btn"
          style={{ background: 'var(--comic-red)', color: '#fff', fontSize: '2rem', width: '100%' }}
          onClick={startGame}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}>
          TAP TO PLAY! 🏏
        </motion.button>
      </motion.div>

      {/* Bottom strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'var(--comic-black)', color: 'var(--comic-yellow)',
        fontFamily: 'Bangers, cursive', fontSize: '1rem',
        padding: '0.4rem 1rem', letterSpacing: '0.12em', textAlign: 'center',
      }}>
        🏆 LEADERBOARD TRACKED · BEAT YOUR RIVALS!
      </div>
    </div>
  );
}
