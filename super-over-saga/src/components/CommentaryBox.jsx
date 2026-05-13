import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentaryBox({ text }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={text}
          initial={{ y: 50, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{
            position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
            background: 'var(--comic-white)',
            border: '3px solid var(--comic-black)',
            boxShadow: '4px 4px 0 var(--comic-black)',
            padding: '0.5rem 1.5rem', borderRadius: '4px',
            zIndex: 30, textAlign: 'center', minWidth: 280,
            whiteSpace: 'nowrap'
          }}
        >
          <div className="bangers" style={{ fontSize: '1.4rem', color: 'var(--comic-blue)', letterSpacing: '0.08em' }}>
            🎙️ {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
