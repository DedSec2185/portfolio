import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Command, Menu, X, Sparkles } from "lucide-react";
import { toggleSound, isSoundEnabled, playClick, playHover } from "../utils/audioSynth";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function Navbar({ onOpenTerminal, onOpenCommandPalette }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const enabled = toggleSound();
    setSoundOn(enabled);
  };

  const scrollTo = (id) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Workbench", id: "workbench" },
    { label: "Experience", id: "work" },
    { label: "Projects", id: "projects" },
    { label: "Stack", id: "stack" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        padding: "14px 24px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        background: isScrolled ? "rgba(7, 11, 18, 0.82)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(31, 41, 61, 0.6)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Left: Monogram Signature Logo */}
        <div
          onClick={() => scrollTo("hero")}
          onMouseEnter={playHover}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(56, 189, 248, 0.1) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', 'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 800,
                color: "#34D399",
                letterSpacing: 1,
              }}
            >
              {PERSONAL_INFO.monogram}
            </span>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: "#F8FAFC",
                letterSpacing: "-0.4px",
                lineHeight: 1.1,
              }}
            >
              {PERSONAL_INFO.name}
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(18, 24, 36, 0.75)",
            padding: "4px 8px",
            borderRadius: 30,
            border: "1px solid rgba(45, 59, 86, 0.5)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              onMouseEnter={playHover}
              className="nav-link-btn"
              style={{
                background: "none",
                border: "none",
                color: "#CBD5E1",
                fontSize: 13.5,
                fontWeight: 600,
                padding: "7px 15px",
                borderRadius: 20,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Quick Tools (Sound Toggle, Command Palette, Terminal, CTA) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={playHover}
            title={soundOn ? "Mute Audio Feedback" : "Enable Tactile Sci-Fi Audio"}
            style={{
              background: soundOn ? "rgba(16, 185, 129, 0.15)" : "rgba(18, 24, 36, 0.8)",
              border: `1px solid ${soundOn ? "rgba(16, 185, 129, 0.4)" : "rgba(45, 59, 86, 0.5)"}`,
              color: soundOn ? "#34D399" : "#94A3B8",
              width: 36,
              height: 36,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            onMouseEnter={playHover}
            title="Open Interactive Cyber Terminal (`)"
            style={{
              background: "rgba(18, 24, 36, 0.8)",
              border: "1px solid rgba(45, 59, 86, 0.5)",
              color: "#CBD5E1",
              padding: "7px 12px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="terminal-hud-btn"
          >
            <Terminal size={14} color="#34D399" />
            <span className="hide-on-mobile">CLI</span>
          </button>

          {/* Command Palette Launcher */}
          <button
            onClick={() => {
              playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={playHover}
            title="Command Palette (Ctrl + K)"
            style={{
              background: "rgba(18, 24, 36, 0.8)",
              border: "1px solid rgba(45, 59, 86, 0.5)",
              color: "#94A3B8",
              padding: "7px 11px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="palette-btn"
          >
            <Command size={13} color="#A78BFA" />
            <span style={{ fontSize: 11, background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 4 }}>
              ⌘K
            </span>
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={() => scrollTo("contact")}
            onMouseEnter={playHover}
            className="cta-hire-btn"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              border: "none",
              color: "#051A14",
              fontWeight: 800,
              fontSize: 13,
              padding: "8px 18px",
              borderRadius: 20,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(16, 185, 129, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            Let's Talk
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#F8FAFC",
              cursor: "pointer",
              padding: 4,
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: 12,
            padding: "16px 20px",
            background: "rgba(14, 20, 31, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 16,
            border: "1px solid rgba(45, 59, 86, 0.7)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",
                color: "#CBD5E1",
                fontSize: 15,
                fontWeight: 600,
                padding: "10px 14px",
                textAlign: "left",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
