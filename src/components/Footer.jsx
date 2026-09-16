import React from "react";
import { ArrowUp, Terminal, Command } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { playClick, playHover } from "../utils/audioSynth";

export default function Footer({ onOpenTerminal, onOpenCommandPalette }) {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(45, 59, 86, 0.6)",
        background: "#070B12",
        padding: "40px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "#F8FAFC" }}>
            {PERSONAL_INFO.name}
          </div>
          <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 3 }}>
            AI Software Engineer · Navi Mumbai & Mumbai, India
          </div>
        </div>

        {/* Center: Keyboard Hint shortcuts */}
        <div
          className="footer-shortcuts"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 12.5,
            color: "#64748B",
          }}
        >
          <span
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            onMouseEnter={playHover}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#94A3B8" }}
          >
            <span style={{ padding: "2px 6px", background: "rgba(255,255,255,0.06)", borderRadius: 4, fontFamily: "monospace" }}>~</span>
            <span>Terminal</span>
          </span>

          <span
            onClick={() => {
              playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={playHover}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#94A3B8" }}
          >
            <span style={{ padding: "2px 6px", background: "rgba(255,255,255,0.06)", borderRadius: 4, fontFamily: "monospace" }}>⌘K</span>
            <span>Command Palette</span>
          </span>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={playHover}
          style={{
            background: "rgba(18, 24, 36, 0.8)",
            border: "1px solid rgba(45, 59, 86, 0.6)",
            color: "#CBD5E1",
            padding: "8px 14px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} color="#34D399" />
        </button>
      </div>
    </footer>
  );
}
