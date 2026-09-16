import React, { useState } from "react";
import { Layers, ChevronDown, CheckCircle2, Network, ShieldCheck, ExternalLink, Cpu, Database, Server } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { PROJECTS } from "../data/portfolioData";
import { playClick, playHover } from "../utils/audioSynth";

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState("01");
  const [viewModes, setViewModes] = useState({}); // { [id]: 'overview' | 'blueprint' }

  const toggleExpand = (id) => {
    playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  const setMode = (id, mode, e) => {
    e.stopPropagation();
    playClick();
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section
      id="projects"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "80px 24px 60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Section Header */}
      <RevealMotion motionType="fadeUp">
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(167, 139, 250, 0.15)",
                border: "1px solid rgba(167, 139, 250, 0.3)",
                fontSize: 12,
                fontWeight: 800,
                color: "#A78BFA",
                letterSpacing: 1,
              }}
            >
              02 · SYSTEM BLUEPRINTS & PROJECTS
            </span>
            <div style={{ height: 1, flex: 1, background: "rgba(45, 59, 86, 0.5)" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#F8FAFC",
                  letterSpacing: "-1px",
                }}
              >
                Production Platforms & AI Systems
              </h2>
              <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 6, maxWidth: 640 }}>
                Each project features full technical blueprints, production metrics, and concurrency guarantees.
              </p>
            </div>
          </div>
        </div>
      </RevealMotion>

      {/* Projects List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PROJECTS.map((proj, idx) => {
          const isExpanded = expandedId === proj.id;
          const currentMode = viewModes[proj.id] || "overview";

          return (
            <RevealMotion key={proj.id} motionType="fadeUp" delay={idx * 90}>
              <TiltCard
                maxTilt={2}
              style={{
                background: "linear-gradient(180deg, #121824 0%, #0D131F 100%)",
                border: `1px solid ${isExpanded ? "rgba(52, 211, 153, 0.4)" : "rgba(45, 59, 86, 0.6)"}`,
                borderRadius: 18,
                boxShadow: isExpanded
                  ? "0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 0.12)"
                  : "0 8px 24px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Card Header Row */}
              <div
                onClick={() => toggleExpand(proj.id)}
                onMouseEnter={playHover}
                style={{
                  padding: "24px 28px",
                  display: "grid",
                  gridTemplateColumns: "64px 1fr auto",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {/* ID Monogram */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 24,
                    fontWeight: 800,
                    color: isExpanded ? "#34D399" : "#64748B",
                    background: "rgba(7, 11, 18, 0.6)",
                    border: `1px solid ${isExpanded ? "rgba(16, 185, 129, 0.4)" : "rgba(45, 59, 86, 0.5)"}`,
                    borderRadius: 10,
                    padding: "8px 12px",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  {proj.id}
                </div>

                {/* Project Title & Client */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(18px, 2vw, 22px)",
                        fontWeight: 800,
                        color: "#F8FAFC",
                      }}
                    >
                      {proj.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: "#34D399",
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: "rgba(16, 185, 129, 0.12)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        letterSpacing: 0.5,
                      }}
                    >
                      {proj.tag}
                    </span>
                  </div>

                  <div style={{ fontSize: 13.5, color: "#94A3B8", fontWeight: 500 }}>
                    {proj.client} · <strong style={{ color: "#CBD5E1" }}>{proj.metrics}</strong>
                  </div>
                </div>

                {/* Expand / Collapse Chevron */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: isExpanded ? "rgba(16, 185, 129, 0.15)" : "rgba(7, 11, 18, 0.6)",
                    border: `1px solid ${isExpanded ? "rgba(16, 185, 129, 0.4)" : "rgba(45, 59, 86, 0.6)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isExpanded ? "#34D399" : "#94A3B8",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Drawer Content */}
              {isExpanded && (
                <div
                  style={{
                    padding: "0 28px 28px 28px",
                    borderTop: "1px solid rgba(31, 41, 61, 0.6)",
                    animation: "heroLetterDrop 0.35s ease both",
                  }}
                >
                  {/* View Switcher: Overview vs Architecture Blueprint */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(31, 41, 61, 0.4)",
                      marginBottom: 20,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8" }}>
                      STATUS: <strong style={{ color: "#34D399" }}>{proj.status}</strong>
                    </span>

                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        background: "rgba(7, 11, 18, 0.8)",
                        padding: "4px",
                        borderRadius: 10,
                        border: "1px solid rgba(45, 59, 86, 0.6)",
                      }}
                    >
                      <button
                        onClick={(e) => setMode(proj.id, "overview", e)}
                        style={{
                          background: currentMode === "overview" ? "rgba(16, 185, 129, 0.2)" : "transparent",
                          border: `1px solid ${currentMode === "overview" ? "rgba(16, 185, 129, 0.4)" : "transparent"}`,
                          color: currentMode === "overview" ? "#34D399" : "#94A3B8",
                          padding: "5px 12px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Executive Overview
                      </button>
                      <button
                        onClick={(e) => setMode(proj.id, "blueprint", e)}
                        style={{
                          background: currentMode === "blueprint" ? "rgba(56, 189, 248, 0.2)" : "transparent",
                          border: `1px solid ${currentMode === "blueprint" ? "rgba(56, 189, 248, 0.4)" : "transparent"}`,
                          color: currentMode === "blueprint" ? "#38BDF8" : "#94A3B8",
                          padding: "5px 12px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Network size={13} />
                        System Blueprint
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Executive Overview */}
                  {currentMode === "overview" ? (
                    <div>
                      <p style={{ fontSize: 15, color: "#E2E8F0", lineHeight: 1.75, marginBottom: 18 }}>
                        {proj.overview}
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                        {proj.details.map((detail, dIdx) => (
                          <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ color: "#34D399", marginTop: 2 }}>▸</span>
                            <span style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.6 }}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: System Blueprint & Topology */
                    <div
                      style={{
                        background: "rgba(7, 11, 18, 0.8)",
                        border: "1px solid rgba(45, 59, 86, 0.7)",
                        borderRadius: 12,
                        padding: "20px 24px",
                        marginBottom: 24,
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#38BDF8", letterSpacing: 1, marginBottom: 16 }}>
                        INTERACTIVE ARCHITECTURE TOPOLOGY
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                        {Object.entries(proj.architecture).map(([layer, desc]) => (
                          <div
                            key={layer}
                            style={{
                              background: "rgba(18, 24, 36, 0.6)",
                              border: "1px solid rgba(45, 59, 86, 0.5)",
                              borderRadius: 8,
                              padding: "12px 14px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: "#34D399",
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                marginBottom: 6,
                              }}
                            >
                              {layer}
                            </div>
                            <div style={{ fontSize: 13, color: "#E2E8F0", lineHeight: 1.45 }}>
                              {desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technology Stack Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(31, 41, 61, 0.6)" }}>
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        onMouseEnter={playHover}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#94A3B8",
                          background: "rgba(7, 11, 18, 0.6)",
                          padding: "5px 12px",
                          borderRadius: 6,
                          border: "1px solid rgba(45, 59, 86, 0.5)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              </TiltCard>
            </RevealMotion>
          );
        })}
      </div>
    </section>
  );
}
