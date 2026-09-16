import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Cpu, Briefcase, Layers, Code, User, Mail, Phone, Volume2, ArrowRight } from "lucide-react";
import { playClick, playHover, toggleSound } from "../utils/audioSynth";
import { triggerConfetti } from "../utils/confetti";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: "workbench",
      label: "Simulate System Architecture",
      category: "Interactive",
      icon: Cpu,
      action: () => {
        document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "projects",
      label: "View Production Projects & Blueprints",
      category: "Navigation",
      icon: Layers,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "experience",
      label: "Explore Work Experience (Reliance Jio & Clients)",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "stack",
      label: "Browse Skills & Production Context",
      category: "Navigation",
      icon: Code,
      action: () => {
        document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "about",
      label: "View Degree, College & Certifications",
      category: "Navigation",
      icon: User,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "contact",
      label: "Get in Touch (Email / Phone)",
      category: "Contact",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "copy-email",
      label: `Copy Email (${PERSONAL_INFO.email})`,
      category: "Quick Action",
      icon: Mail,
      action: (e) => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        triggerConfetti(0.5, 0.5);
      },
    },
    {
      id: "copy-phone",
      label: `Copy Phone (${PERSONAL_INFO.phone})`,
      category: "Quick Action",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.phone);
        triggerConfetti(0.5, 0.5);
      },
    },
    {
      id: "terminal",
      label: "Launch Cyber Terminal CLI (` / ~)",
      category: "Tools",
      icon: Terminal,
      action: () => {
        onOpenTerminal();
      },
    },
    {
      id: "sound",
      label: "Toggle Web Audio Synthesizer",
      category: "Tools",
      icon: Volume2,
      action: () => {
        toggleSound();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        playClick();
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(12px)",
        zIndex: 160,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
        paddingLeft: 20,
        paddingRight: 20,
        animation: "heroLetterDrop 0.2s ease both",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(640px, 95vw)",
          background: "linear-gradient(180deg, #141B2B 0%, #0D131F 100%)",
          border: "1px solid rgba(52, 211, 153, 0.4)",
          borderRadius: 16,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.15)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(45, 59, 86, 0.7)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Search size={18} color="#34D399" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F8FAFC",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
          <span
            style={{
              fontSize: 11,
              background: "rgba(255, 255, 255, 0.08)",
              color: "#94A3B8",
              padding: "3px 7px",
              borderRadius: 4,
            }}
          >
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 360, overflowY: "auto", padding: "10px 8px" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "24px 20px", textAlign: "center", color: "#94A3B8", fontSize: 14 }}>
              No directives matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => {
                    playHover();
                    setSelectedIndex(idx);
                  }}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: isSelected ? "rgba(16, 185, 129, 0.15)" : "transparent",
                    border: `1px solid ${isSelected ? "rgba(16, 185, 129, 0.4)" : "transparent"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isSelected ? "rgba(16, 185, 129, 0.2)" : "rgba(7, 11, 18, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isSelected ? "#34D399" : "#94A3B8",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: isSelected ? "#F8FAFC" : "#CBD5E1" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748B" }}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {isSelected && <ArrowRight size={14} color="#34D399" />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
