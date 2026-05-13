import React from 'react';
import { motion } from 'framer-motion';
import { SHOT_LABELS } from '../game/HitDetection';

export default function ComicBubble({ result }) {
  const label = SHOT_LABELS[result];
  if (!label) return null;

  const rotation = result === 'six' ? -8 : result === 'wicket' ? 5 : -3;

  return (
    <motion.div
      className="bubble-pop"
      style={{
        position: 'absolute', zIndex: 50,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, rotate: rotation - 10, opacity: 0 }}
      animate={{ scale: 1, rotate: rotation, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
    >
      {/* Main bubble */}
      <div style={{
        background: label.color,
        border: '5px solid black',
        boxShadow: '6px 6px 0 black',
        borderRadius: 12,
        padding: '0.6rem 1.6rem',
        display: 'inline-block',
        position: 'relative',
      }}>
        {/* Comic spike decoration */}
        <div style={{
          position: 'absolute', inset: -8,
          background: label.color,
          zIndex: -1,
          clipPath: 'polygon(50% 0%,55% 35%,90% 10%,70% 40%,100% 45%,72% 55%,95% 85%,62% 65%,55% 100%,48% 65%,10% 90%,38% 60%,0% 50%,32% 42%,8% 12%,42% 38%)',
          opacity: 0.6,
        }} />
        <div className="bangers" style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          color: '#fff',
          lineHeight: 1,
          WebkitTextStroke: '2px black',
          textShadow: '3px 3px 0 black',
          letterSpacing: '0.04em',
        }}>
          {label.word}
        </div>
        <div className="bangers" style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
          color: '#fff',
          letterSpacing: '0.12em',
          textShadow: '2px 2px 0 black',
        }}>
          {label.sub}
        </div>
      </div>
    </motion.div>
  );
}
