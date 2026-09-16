import confetti from "canvas-confetti";

export function triggerConfetti(originX = 0.5, originY = 0.5) {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ["#10B981", "#34D399", "#38BDF8", "#A78BFA", "#F59E0B"],
      disableForReducedMotion: true,
    });
  } catch (e) {
    // Graceful fallback if canvas is unavailable
  }
}
