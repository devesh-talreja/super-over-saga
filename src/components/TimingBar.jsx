import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AudioEngine } from '../game/AudioEngine';

/**
 * TimingBar — the core gameplay widget.
 *
 * Props:
 *   ball      – currentBall descriptor from BowlerAI
 *   onTap(cursorPos)  – called with 0-1 fraction when player taps
 *   onExpire()        – called if cursor reaches the end without a tap
 */
export default function TimingBar({ ball, onTap, onExpire }) {
  const { duration, windowStart, windowEnd, color } = ball;
  const [cursorPos, setCursorPos] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const tappedRef = useRef(false);

  // rAF loop for cursor movement
  useEffect(() => {
    startTimeRef.current = performance.now();
    tappedRef.current = false;

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pos = Math.min(elapsed / duration, 1);
      setCursorPos(pos);

      if (pos < 1 && !tappedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (pos >= 1 && !tappedRef.current) {
        tappedRef.current = true;
        onExpire();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [duration, onExpire]);

  const handleTap = useCallback(() => {
    if (tappedRef.current) return;
    tappedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    const elapsed = performance.now() - startTimeRef.current;
    const pos = Math.min(elapsed / duration, 1);
    onTap(pos);
  }, [duration, onTap]);

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); handleTap(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleTap]);

  const windowWidthPct = (windowEnd - windowStart) * 100;
  const cursorPct = cursorPos * 100;
  const inWindow = cursorPos >= windowStart && cursorPos <= windowEnd;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      style={{
        padding: '1rem 1.2rem 1.4rem',
        background: '#0a0a0a',
        borderTop: '4px solid black',
      }}
      onClick={handleTap}
      onTouchStart={e => { e.preventDefault(); handleTap(); }}
    >
      {/* Label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span className="bangers" style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.1em' }}>
          🕹️ TIME YOUR SHOT
        </span>
        <span className="bangers" style={{ color: color, fontSize: '1rem' }}>
          {ball.emoji} {ball.label}
        </span>
      </div>

      {/* Bar */}
      <div style={{
        position: 'relative', height: 44, borderRadius: 6,
        background: '#1e1e1e', border: '3px solid #444',
        overflow: 'hidden', cursor: 'pointer',
      }}>
        {/* Danger zone stripes (left) */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${windowStart * 100}%`,
          background: 'repeating-linear-gradient(135deg, #FF3D0022 0px, #FF3D0022 6px, transparent 6px, transparent 14px)',
        }} />
        {/* Green hit window */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${windowStart * 100}%`,
          width: `${windowWidthPct}%`,
          background: `linear-gradient(90deg, ${color}44, ${color}cc, ${color}44)`,
          borderLeft: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="bangers" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em', textShadow: '1px 1px 0 black' }}>
            HIT ZONE
          </span>
        </div>
        {/* Danger zone stripes (right) */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: `${(1 - windowEnd) * 100}%`,
          background: 'repeating-linear-gradient(135deg, #FF3D0022 0px, #FF3D0022 6px, transparent 6px, transparent 14px)',
        }} />

        {/* Moving cursor */}
        <motion.div
          className={inWindow ? 'cursor-glow' : ''}
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `calc(${cursorPct}% - 5px)`,
            width: 10,
            background: inWindow ? '#FFD600' : '#fff',
            borderRadius: 3,
            boxShadow: inWindow ? `0 0 12px 4px ${color}` : '0 0 6px 1px #fff',
            zIndex: 10,
          }}
        />
      </div>

      {/* Tap hint */}
      <p style={{ color: '#555', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.4rem', fontFamily: 'Poppins, sans-serif' }}>
        TAP SCREEN · SPACE · ENTER
      </p>
    </motion.div>
  );
}
