/* ─── Web Audio API Sci-Fi Synthesizer (0 external files, 100% reliable) ─────── */

let audioCtx = null;
let soundEnabled = false;

// Initialize on user interaction
function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    getAudioContext();
    playBleep(880, 0.08, "sine");
  }
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(val) {
  soundEnabled = val;
  if (soundEnabled) getAudioContext();
}

function playTone(freq, duration, type = "sine", gainVal = 0.05) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Graceful fallback
  }
}

export function playBleep(freq = 520, dur = 0.06, type = "sine") {
  playTone(freq, dur, type, 0.04);
}

export function playClick() {
  if (!soundEnabled) return;
  playTone(600, 0.04, "sine", 0.03);
}

export function playHover() {
  if (!soundEnabled) return;
  playTone(340, 0.03, "triangle", 0.02);
}

export function playSuccess() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.12, "sine", 0.04);
      }, i * 65);
    });
  } catch (e) {}
}

export function playTerminalChirp() {
  if (!soundEnabled) return;
  playTone(950, 0.03, "sine", 0.03);
}

export function playSimulationPulse() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}
