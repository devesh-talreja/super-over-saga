let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function osc({ frequency = 440, type = 'sine', gain = 0.4, duration = 0.3, attack = 0.01, startFreq, endFreq }) {
  const c = getCtx();
  const oscillator = c.createOscillator();
  const gainNode = c.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(c.destination);

  oscillator.type = type;
  if (startFreq && endFreq) {
    oscillator.frequency.setValueAtTime(startFreq, c.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, c.currentTime + duration);
  } else {
    oscillator.frequency.setValueAtTime(frequency, c.currentTime);
  }

  gainNode.gain.setValueAtTime(0, c.currentTime);
  gainNode.gain.linearRampToValueAtTime(gain, c.currentTime + attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

  oscillator.start(c.currentTime);
  oscillator.stop(c.currentTime + duration + 0.05);
}

function noise({ gain = 0.3, duration = 0.25 }) {
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = c.createBufferSource();
  source.buffer = buffer;

  const gainNode = c.createGain();
  gainNode.gain.setValueAtTime(gain, c.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 800;

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(c.destination);
  source.start(c.currentTime);
}

export const AudioEngine = {
  bowl() {
    // Rising pitch "whoosh" as ball approaches
    osc({ startFreq: 200, endFreq: 800, type: 'sawtooth', gain: 0.2, duration: 0.6 });
  },

  hit() {
    // Heavy white-noise smash + low thud
    noise({ gain: 0.5, duration: 0.35 });
    osc({ frequency: 80, type: 'sine', gain: 0.6, duration: 0.4 });
  },

  six() {
    // Triumphant rising arpeggio
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => osc({ frequency: freq, type: 'triangle', gain: 0.4, duration: 0.3 }), i * 80);
    });
  },

  four() {
    osc({ startFreq: 400, endFreq: 700, type: 'triangle', gain: 0.4, duration: 0.35 });
  },

  wicket() {
    // Descending groan
    osc({ startFreq: 500, endFreq: 80, type: 'sawtooth', gain: 0.4, duration: 0.7 });
    setTimeout(() => osc({ frequency: 60, type: 'sine', gain: 0.5, duration: 0.4 }), 100);
  },

  dot() {
    osc({ frequency: 220, type: 'sine', gain: 0.15, duration: 0.15 });
  },

  reveal() {
    // Comic "sting" for ball reveal
    osc({ startFreq: 600, endFreq: 1200, type: 'square', gain: 0.15, duration: 0.25 });
  },

  tick() {
    osc({ frequency: 1200, type: 'sine', gain: 0.08, duration: 0.05 });
  },
};
