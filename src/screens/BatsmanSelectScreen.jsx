import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function BatsmanSelectScreen() {
  const { selectBatsman } = useGame();

  const roaster = [
    { id: 'king', name: 'THE KING', emoji: '👑', perk: '25% Larger Hit Window', color: '#D50000', bgColor: '#FFEBEE' },
    { id: 'hitman', name: 'THE HITMAN', emoji: '💥', perk: 'Multipliers Build Faster', color: '#0091EA', bgColor: '#E1F5FE' },
    { id: 'finisher', name: 'THE FINISHER', emoji: '🚁', perk: '2x Runs on Last 2 Balls', color: '#FFD600', bgColor: '#FFFDE7' }
  ];

  return (
    <div className="halftone" style={{
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="bangers" 
        style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: 'var(--comic-black)', textShadow: '3px 3px 0 var(--comic-yellow)', marginBottom: '2rem', textAlign: 'center', lineHeight: 1 }}
      >
        CHOOSE YOUR <br/> HERO!
      </motion.div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 }}>
        {roaster.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: Math.random() * 4 - 2 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectBatsman(b.id)}
            style={{
              background: b.bgColor,
              border: '4px solid var(--comic-black)',
              boxShadow: '8px 8px 0 var(--comic-black)',
              borderRadius: 8,
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              width: 240,
              display: 'flex', flexDirection: 'column', gap: '0.8rem'
            }}
          >
            <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', border: '4px solid black', margin: '0 auto', background: '#fff' }}>
              <img src={`/avatars/${b.id}.png`} onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/avataaars/svg?seed=${b.name}&backgroundColor=ffd5dc` }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={b.name} />
            </div>
            <div className="bangers" style={{ fontSize: '2.4rem', color: b.color, WebkitTextStroke: '1px black', textShadow: '2px 2px 0 black' }}>{b.name}</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
              {b.perk}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
