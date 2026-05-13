/**
 * Determines shot outcome based on cursor position vs the green zone.
 * @param {number} cursorPos  - 0 to 1, where cursor was when player tapped
 * @param {number} windowStart - green zone start (0-1)
 * @param {number} windowEnd   - green zone end (0-1)
 * @returns {'six'|'four'|'two'|'dot'|'wicket'}
 */
export function detectHit(cursorPos, windowStart, windowEnd) {
  const center = (windowStart + windowEnd) / 2;
  const half = (windowEnd - windowStart) / 2;
  const dist = Math.abs(cursorPos - center);

  if (dist <= half * 0.30) return 'six';
  if (dist <= half * 0.65) return 'four';
  if (dist <= half * 1.00) return 'two';
  if (dist <= half * 1.60) return 'dot';
  return 'wicket';
}

export const SHOT_LABELS = {
  six:    { word: 'BOOM!',    sub: 'SIX!',          color: '#FF6D00' },
  four:   { word: 'POW!',     sub: 'FOUR!',          color: '#00C853' },
  two:    { word: 'NICE!',    sub: 'TWO RUNS',       color: '#0091EA' },
  dot:    { word: 'DEFENDED!',sub: 'DOT BALL',       color: '#546E7A' },
  wicket: { word: 'BOWLED!',  sub: 'YOU\'RE OUT! 💀', color: '#D50000' },
};
