import React from 'react';
import { motion } from 'framer-motion';

export default function BallReveal({ ball }) {
  return (
    <motion.div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.72)',
      backdropFilter: 'blur(2px)',
    }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 14 }}
        style={{
          background: ball.bgColor,
          border: '5px solid black',
          boxShadow: '8px 8px 0 black',
          borderRadius: 16,
          padding: '1.5rem 3rem',
          textAlign: 'center',
          minWidth: 220,
        }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '4px solid black', margin: '0 auto 0.5rem', background: '#fff', boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
           <img src={`/avatars/${ball.id}.png`} onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/avataaars/svg?seed=${ball.bowlerName}&backgroundColor=b6e3f4` }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="bowler" />
        </div>
        <div className="bangers" style={{
          fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
          color: '#fff',
          lineHeight: 1,
          WebkitTextStroke: '2px black',
          textShadow: '4px 4px 0 black',
          letterSpacing: '0.1em',
        }}>
          {ball.label}
        </div>
        <div style={{
          marginTop: '0.4rem', color: 'rgba(255,255,255,0.85)',
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          BOWLED BY: {ball.bowlerName}
        </div>
      </motion.div>
    </motion.div>
  );
}
