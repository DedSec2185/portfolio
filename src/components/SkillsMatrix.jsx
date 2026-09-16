import React, { useState } from "react";
import { Cpu, Terminal, Zap, Database, Globe, Layers, Info, CheckCircle2, Sparkles, X } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { SKILL_CATEGORIES } from "../data/portfolioData";
import { playClick, playHover } from "../utils/audioSynth";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [inspectedSkill, setInspectedSkill] = useState(null);

  const categories = ["ALL", ...SKILL_CATEGORIES.map((c) => c.id)];

  const filteredCategories =
    selectedCategory === "ALL"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  const handleInspectSkill = (skill, categoryTitle) => {
    playClick();
    setInspectedSkill({ ...skill, category: categoryTitle });
  };

  return (
    <section
      id="stack"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "80px 24px 60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <RevealMotion motionType="fadeUp">
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                fontSize: 12,
                fontWeight: 800,
                color: "#34D399",
                letterSpacing: 1,
              }}
            >
              03 · TECHNICAL STACK & PRODUCTION CONTEXT
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
                Technical Arsenal & Impact Matrix
              </h2>
              <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 6 }}>
                Click any skill badge to inspect its exact production implementation context and engineering use case.
              </p>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: "flex",
                gap: 8,
                background: "rgba(18, 24, 36, 0.8)",
                padding: "4px",
                borderRadius: 12,
                border: "1px solid rgba(45, 59, 86, 0.6)",
                flexWrap: "wrap",
              }}
            >
              {categories.map((catId) => {
                const label =
                  catId === "ALL"
                    ? "All Stacks"
                    : catId === "AI_LLM"
                    ? "AI & LLMs"
                    : catId === "AGENTIC"
                    ? "Agentic MCP"
                    : catId === "BACKEND"
                    ? "Backend"
                    : catId === "FRONTEND"
                    ? "Frontend"
                    : "Cloud / DevOps";

                const isActive = selectedCategory === catId;
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      playClick();
                      setSelectedCategory(catId);
                    }}
                    onMouseEnter={playHover}
                    style={{
                      background: isActive ? "rgba(16, 185, 129, 0.2)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(16, 185, 129, 0.45)" : "transparent"}`,
                      color: isActive ? "#34D399" : "#94A3B8",
                      padding: "6px 14px",
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </RevealMotion>

      {/* Grid of Skill Categories */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
        {filteredCategories.map((cat, idx) => (
          <RevealMotion key={cat.id} motionType="scaleUp" delay={idx * 60}>
            <TiltCard
              maxTilt={3}
            style={{
              background: "linear-gradient(180deg, #121824 0%, #0E1420 100%)",
              border: "1px solid rgba(45, 59, 86, 0.6)",
              borderRadius: 18,
              padding: "24px 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#34D399",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {cat.title}
              </div>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 18, lineHeight: 1.5 }}>
                {cat.description}
              </p>

              {/* Skills Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => handleInspectSkill(skill, cat.title)}
                    onMouseEnter={playHover}
                    style={{
                      background: "rgba(7, 11, 18, 0.75)",
                      border: "1px solid rgba(45, 59, 86, 0.7)",
                      color: "#F8FAFC",
                      padding: "7px 13px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    className="skill-badge-btn"
                  >
                    <span>{skill.name}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color:
                          skill.level === "Pioneer"
                            ? "#C084FC"
                            : skill.level === "Expert"
                            ? "#34D399"
                            : "#38BDF8",
                        background: "rgba(255, 255, 255, 0.06)",
                        padding: "1px 5px",
                        borderRadius: 4,
                      }}
                    >
                      {skill.level}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, paddingTop: 12, borderTop: "1px solid rgba(31, 41, 61, 0.5)", display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={12} color="#64748B" />
              <span style={{ fontSize: 11.5, color: "#64748B" }}>
                Click any badge for live production deployment context
              </span>
            </div>
          </TiltCard>
        </RevealMotion>
      ))}
      </div>

      {/* Popover / Modal for Inspected Skill Context */}
      {inspectedSkill && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "heroLetterDrop 0.25s ease both",
          }}
          onClick={() => setInspectedSkill(null)}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #161F30 0%, #0F1624 100%)",
              border: "1px solid rgba(52, 211, 153, 0.5)",
              borderRadius: 20,
              padding: "32px 36px",
              maxWidth: 520,
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                playClick();
                setInspectedSkill(null);
              }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(45, 59, 86, 0.6)",
                color: "#94A3B8",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>

            <div style={{ fontSize: 11, fontWeight: 800, color: "#34D399", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
              {inspectedSkill.category}
            </div>

            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#F8FAFC", marginBottom: 8 }}>
              {inspectedSkill.name}
            </h3>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: 6, background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", marginBottom: 20 }}>
              <Sparkles size={13} color="#34D399" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#34D399" }}>
                Proficiency: {inspectedSkill.level}
              </span>
            </div>

            <div style={{ background: "rgba(7, 11, 18, 0.8)", border: "1px solid rgba(45, 59, 86, 0.6)", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#38BDF8", letterSpacing: 1, marginBottom: 6 }}>
                PRODUCTION DEPLOYMENT CONTEXT
              </div>
              <p style={{ fontSize: 14.5, color: "#E2E8F0", lineHeight: 1.65, margin: 0 }}>
                {inspectedSkill.prod}
              </p>
            </div>

            <button
              onClick={() => setInspectedSkill(null)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                border: "none",
                color: "#051A14",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
