import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Leaderboard from '../components/Leaderboard';
import { saveScore } from '../database/googleSheets';

export default function GameOverScreen() {
  const { score, target, won, playerName, setName, startGame, leaderboard, setLeaderboard } = useGame();
  const [inputVal, setInputVal] = useState('');
  const [saved, setSaved] = useState(false);
  const [showBoard, setShowBoard] = useState(false);

  const handleSave = async () => {
    if (!inputVal.trim()) return;
    setName(inputVal.trim().toUpperCase().slice(0, 8));
    await saveScore(inputVal.trim().toUpperCase().slice(0, 8), score, setLeaderboard);
    setSaved(true);
    setShowBoard(true);
  };

  return (
    <div className="halftone" style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <motion.div className="comic-panel" style={{
        width: '90%', maxWidth: 480,
        padding: '2rem', textAlign: 'center',
        background: won ? 'var(--comic-yellow)' : '#111',
        color: won ? 'var(--comic-black)' : '#fff',
        zIndex: 2,
      }}
        initial={{ scale: 0, rotate: 8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}>

        {/* Result banner */}
        <div className="bangers" style={{
          fontSize: 'clamp(2.5rem, 9vw, 4.5rem)',
          lineHeight: 1,
          color: won ? 'var(--comic-red)' : '#FF3D00',
          textShadow: won ? '3px 3px 0 black' : '3px 3px 0 #FF3D00',
        }}>
          {won ? '🏆 YOU WIN!' : '💀 GAME OVER!'}
        </div>

        {/* Score vs Target */}
        <div style={{ margin: '1rem 0', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <ScorePill label="YOUR SCORE" value={score} color={won ? 'var(--comic-green)' : '#FF3D00'} />
          <ScorePill label="TARGET" value={target} color="var(--comic-blue)" />
        </div>

        <p className="bangers" style={{ fontSize: '1.2rem', marginBottom: '1.2rem', letterSpacing: '0.06em', opacity: 0.8 }}>
          {won
            ? `You smashed it by ${score - target} run${score - target !== 1 ? 's' : ''}! 🔥`
            : `You needed ${target - score} more run${target - score !== 1 ? 's' : ''}. Try again!`}
        </p>

        {/* Name entry (only if won) */}
        {won && !saved && (
          <div style={{ margin: '1rem 0' }}>
            <p className="bangers" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>ENTER YOUR INITIALS:</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value.toUpperCase().slice(0, 8))}
                placeholder="AAA"
                maxLength={8}
                style={{
                  fontFamily: 'Bangers, cursive', fontSize: '1.6rem',
                  padding: '0.4rem 0.8rem', width: 140,
                  border: 'var(--border)', borderRadius: 4,
                  background: '#fff', textAlign: 'center', letterSpacing: '0.2em',
                }}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
              />
              <motion.button className="comic-btn"
                style={{ background: 'var(--comic-red)', color: '#fff', fontSize: '1.2rem' }}
                onClick={handleSave}
                whileTap={{ scale: 0.95 }}>
                SAVE 🏆
              </motion.button>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <motion.button className="comic-btn"
            style={{ background: 'var(--comic-yellow)', color: 'var(--comic-black)' }}
            onClick={() => setShowBoard(b => !b)}
            whileTap={{ scale: 0.95 }}>
            🏆 LEADERBOARD
          </motion.button>
          <motion.button className="comic-btn"
            style={{ background: 'var(--comic-red)', color: '#fff' }}
            onClick={startGame}
            whileTap={{ scale: 0.95 }}>
            PLAY AGAIN! 🏏
          </motion.button>
        </div>
      </motion.div>

      {/* Leaderboard overlay */}
      <AnimatePresence>
        {showBoard && <Leaderboard onClose={() => setShowBoard(false)} />}
      </AnimatePresence>
    </div>
  );
}

function ScorePill({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="bangers" style={{ fontSize: '0.85rem', opacity: 0.7, letterSpacing: '0.1em' }}>{label}</div>
      <div className="bangers" style={{ fontSize: '3rem', color, lineHeight: 1, textShadow: '2px 2px 0 black' }}>{value}</div>
    </div>
  );
}
