import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { detectHit } from '../game/HitDetection';
import { AudioEngine } from '../game/AudioEngine';
import HUD from '../components/HUD';
import BallReveal from '../components/BallReveal';
import TimingBar from '../components/TimingBar';
import ComicBubble from '../components/ComicBubble';
import StreakBadge from '../components/StreakBadge';
import CommentaryBox from '../components/CommentaryBox';

export default function GameScreen() {
  const { phase, currentBall, recordShot, startDelivery, nextBall, missedTap, lastResult, streak, multiplier, commentary, batsman } = useGame();
  const shakeRef = useRef(null);
  const [shaking, setShaking] = useState(false);
  const [ballFlying, setBallFlying] = useState(false);

  // Reveal → Delivery transition (auto after 1.4s)
  useEffect(() => {
    if (phase !== 'reveal') return;
    AudioEngine.reveal();
    const t = setTimeout(() => startDelivery(), 1400);
    return () => clearTimeout(t);
  }, [phase, currentBall, startDelivery]);

  // Delivery → start ball animation
  useEffect(() => {
    if (phase !== 'delivery') return;
    setBallFlying(true);
    AudioEngine.bowl();
    return () => setBallFlying(false);
  }, [phase]);

  // Result → screen shake on boundary/wicket
  useEffect(() => {
    if (phase !== 'result') return;
    if (lastResult === 'six' || lastResult === 'four' || lastResult === 'wicket') {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
    // Auto-advance to next ball
    const t = setTimeout(() => nextBall(), 1600);
    return () => clearTimeout(t);
  }, [phase, lastResult, nextBall]);

  // Player tap handler
  const handleTap = (cursorPos) => {
    if (phase !== 'delivery' || !currentBall) return;
    const result = detectHit(cursorPos, currentBall.windowStart, currentBall.windowEnd);
    AudioEngine.hit();
    if (result === 'six') AudioEngine.six();
    else if (result === 'four') AudioEngine.four();
    else if (result === 'wicket') AudioEngine.wicket();
    else AudioEngine.dot();
    recordShot(result);
    setBallFlying(false);
  };

  return (
    <div className="halftone" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HUD */}
      <HUD />

      {/* Pitch scene */}
      <div ref={shakeRef} className={shaking ? 'shake' : ''} style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <PitchScene ballFlying={ballFlying && phase === 'delivery'} ballType={currentBall?.type} batsman={batsman} />

        {/* Streak badge */}
        {streak >= 2 && <StreakBadge streak={streak} multiplier={multiplier} />}

        {/* Comic bubble on result */}
        <AnimatePresence>
          {phase === 'result' && <ComicBubble result={lastResult} key={lastResult + Date.now()} />}
        </AnimatePresence>

        <CommentaryBox text={phase === 'result' ? commentary : ''} />

        {/* Ball Reveal overlay */}
        <AnimatePresence>
          {phase === 'reveal' && currentBall && (
            <BallReveal key={currentBall.type + Math.random()} ball={currentBall} />
          )}
        </AnimatePresence>
      </div>

      {/* Timing bar */}
      <AnimatePresence>
        {phase === 'delivery' && currentBall && (
          <TimingBar
            key={`tb-${phase}`}
            ball={currentBall}
            onTap={handleTap}
            onExpire={missedTap}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pitch Scene ─────────────────────────────────────────────────────────────
function PitchScene({ ballFlying, ballType, batsman }) {
  const ballColor = { fast: '#004BA0', spin: '#AA00FF', slower: '#D4AF37' }[ballType] ?? '#fff';
  const bowlerId = { fast: 'bumrah', spin: 'rashid', slower: 'pathirana' }[ballType] ?? 'bumrah';
  
  // Maps for fallback avatar seeds
  const bowlerNames = { fast: 'BOOM BOOM', spin: 'SPIN WIZARD', slower: 'SLINGA' };
  const batsmanNames = { king: 'THE KING', hitman: 'THE HITMAN', finisher: 'THE FINISHER' };

  return (
    <div style={{
      width: '100%', maxWidth: 640, height: 280,
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Sky / crowd backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 55%, #4a7c59 55%, #3d6b4a 100%)',
        borderRadius: 8, border: 'var(--border)',
        overflow: 'hidden',
      }}>
        {/* Crowd silhouettes */}
        <CrowdSilhouettes />
        {/* Pitch strip */}
        <div style={{
          position: 'absolute', bottom: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '28%', height: '55%',
          background: '#c8a96e',
          border: '2px solid #a08050',
          borderRadius: 3,
        }}>
          {/* Crease lines */}
          <div style={{ position: 'absolute', top: '12%', left: 0, right: 0, height: 2, background: '#fff', opacity: 0.7 }} />
          <div style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, height: 2, background: '#fff', opacity: 0.7 }} />
        </div>
        {/* Stumps */}
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 4, height: 36, background: '#f5deb3', border: '1px solid #8b6914', borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Bowler avatar */}
      <div style={{ position: 'absolute', left: '8%', bottom: '22%', zIndex: 2 }}>
        <div style={{ width: 55, height: 55, borderRadius: '50%', overflow: 'hidden', border: '3px solid black', background: '#fff' }}>
           <img src={`/avatars/${bowlerId}.png`} onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/avataaars/svg?seed=${bowlerNames[ballType]}&backgroundColor=b6e3f4` }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="bowler" />
        </div>
      </div>
      
      {/* Batsman avatar */}
      <div style={{ position: 'absolute', right: '8%', bottom: '22%', zIndex: 2, display: 'flex', alignItems: 'flex-end', gap: '0.2rem' }}>
        <div style={{ width: 55, height: 55, borderRadius: '50%', overflow: 'hidden', border: '3px solid black', background: '#fff', transform: 'scaleX(-1)' }}>
           <img src={`/avatars/${batsman}.png`} onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/avataaars/svg?seed=${batsmanNames[batsman]}&backgroundColor=ffd5dc` }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="batsman" />
        </div>
        <div style={{ fontSize: '2.5rem', transform: 'scaleX(-1)' }}>🏏</div>
      </div>

      {/* Flying ball */}
      <AnimatePresence>
        {ballFlying && (
          <motion.div
            key="ball"
            style={{
              position: 'absolute', bottom: '32%',
              width: 22, height: 22, borderRadius: '50%',
              background: ballColor,
              border: '3px solid white',
              boxShadow: `0 0 14px 4px ${ballColor}`,
              zIndex: 5,
            }}
            initial={{ left: '12%', scale: 0.7, opacity: 0.6 }}
            animate={{ left: '82%', scale: 1.1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CrowdSilhouettes() {
  return (
    <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 10px' }}>
      {Array.from({ length: 28 }, (_, i) => (
        <div key={i} style={{
          width: 14 + (i % 3) * 4,
          height: 22 + (i % 4) * 4,
          background: ['#e91e63','#9c27b0','#3f51b5','#f44336','#ff9800'][i % 5],
          borderRadius: '50% 50% 0 0',
          opacity: 0.85,
        }} />
      ))}
    </div>
  );
}
