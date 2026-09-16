import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroCanvas from "./components/HeroCanvas";
import Hero from "./components/Hero";
import SystemWorkbench from "./components/SystemWorkbench";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsMatrix from "./components/SkillsMatrix";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TerminalModal from "./components/TerminalModal";
import CommandPalette from "./components/CommandPalette";
import MatrixRainCanvas from "./components/MatrixRainCanvas";

export default function Portfolio() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      // ~ or ` (Backquote) -> Terminal
      else if (e.key === "`" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      // Escape closes open modals
      else if (e.key === "Escape") {
        if (terminalOpen) setTerminalOpen(false);
        if (paletteOpen) setPaletteOpen(false);
        if (matrixActive) setMatrixActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen, paletteOpen, matrixActive]);

  return (
    <div
      style={{
        background: "#070B12",
        color: "#F8FAFC",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ─── Global Styles & Keyframe Animations ──────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(16, 185, 129, 0.35);
          color: #F8FAFC;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #070B12;
        }
        ::-webkit-scrollbar-thumb {
          background: #1F293D;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2D3B56;
        }

        @keyframes heroLetterDrop {
          0% {
            opacity: 0;
            transform: perspective(600px) translateY(-22px) rotateX(45deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: perspective(600px) translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes timelinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
          50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        }

        @keyframes blinkCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .caret {
          display: inline-block;
          animation: blinkCaret 0.9s step-end infinite;
          color: #34D399;
          font-weight: 700;
          margin-left: 2px;
        }

        .spin-slow {
          animation: spinAnimation 2s linear infinite;
        }
        @keyframes spinAnimation {
          100% { transform: rotate(360deg); }
        }

        .nav-link-btn:hover {
          color: #F8FAFC !important;
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-1px);
        }

        .primary-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.55) !important;
        }

        .secondary-btn:hover {
          border-color: #38BDF8 !important;
          color: #38BDF8 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 18px rgba(56, 189, 248, 0.2) !important;
        }

        .skill-badge-btn:hover {
          border-color: #34D399 !important;
          color: #34D399 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .stat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          .footer-shortcuts {
            display: none !important;
          }
        }
      `}</style>

      {/* Interactive Background Particle Constellation */}
      <HeroCanvas />

      {/* Full-screen Matrix Rain Easter Egg */}
      <MatrixRainCanvas
        active={matrixActive}
        onToggle={() => setMatrixActive(!matrixActive)}
      />

      {/* Main App Navigation */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive AI & System Architecture Workbench */}
      <SystemWorkbench />

      {/* Production Work Experience Timeline */}
      <ExperienceSection />

      {/* Featured Projects with Architecture Blueprints */}
      <ProjectsSection />

      {/* Technical Arsenal & Production Context Matrix */}
      <SkillsMatrix />

      {/* Academic Background & Credentials */}
      <AboutSection />

      {/* Direct Contact with 1-Click Copy & Confetti */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />

      {/* Interactive Cyber Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
      />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenTerminal={() => {
          setPaletteOpen(false);
          setTerminalOpen(true);
        }}
      />
    </div>
  );
}
