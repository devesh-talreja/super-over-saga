export const BALL_CONFIG = {
  fast: {
    type: 'fast',
    id: 'bumrah',
    label: 'BOOM YORKER',
    emoji: '🎯',
    color: '#004BA0', // MI Blue
    bgColor: '#004BA0',
    duration: 1300,       // ms cursor crosses the bar
    windowSize: 0.12,     // tighter window
    bowlerName: 'BOOM BOOM',
  },
  spin: {
    type: 'spin',
    id: 'rashid',
    label: 'MYSTERY SPIN',
    emoji: '🌀',
    color: '#AA00FF', // Purple
    bgColor: '#AA00FF',
    duration: 2300,
    windowSize: 0.20,
    bowlerName: 'SPIN WIZARD',
  },
  slower: {
    type: 'slower',
    id: 'pathirana',
    label: 'THE SLINGER',
    emoji: '🐢',
    color: '#D4AF37', // CSK Yellow
    bgColor: '#D4AF37',
    duration: 3400,
    windowSize: 0.35,
    bowlerName: 'SLINGA',
  },
};

const WEIGHTS = [0.40, 0.35, 0.25]; // fast, spin, slower
const TYPES = ['fast', 'spin', 'slower'];

/** Returns a full ball descriptor including randomised green-zone position. */
export function getBall() {
  const r = Math.random();
  let acc = 0;
  let chosen = 'fast';
  for (let i = 0; i < WEIGHTS.length; i++) {
    acc += WEIGHTS[i];
    if (r < acc) { chosen = TYPES[i]; break; }
  }
  const cfg = BALL_CONFIG[chosen];
  // green zone can start anywhere from 15% to (85% - windowSize)
  const maxStart = 0.85 - cfg.windowSize;
  const windowStart = 0.15 + Math.random() * (maxStart - 0.15);
  return { ...cfg, windowStart, windowEnd: windowStart + cfg.windowSize };
}

/** Outcome when player never taps (ball fully crosses bar). */
export function missedTapResult(ballType) {
  const wicketChance = { fast: 0.65, spin: 0.45, slower: 0.20 };
  return Math.random() < (wicketChance[ballType] ?? 0.4) ? 'wicket' : 'dot';
}
