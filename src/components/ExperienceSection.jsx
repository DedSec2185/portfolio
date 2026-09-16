import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, ShieldCheck, Award } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { EXPERIENCES } from "../data/portfolioData";
import { playHover, playClick } from "../utils/audioSynth";

export default function ExperienceSection() {
  return (
    <section
      id="work"
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
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontSize: 12,
                fontWeight: 800,
                color: "#38BDF8",
                letterSpacing: 1,
              }}
            >
              01 · PRODUCTION EXPERIENCE
            </span>
            <div style={{ height: 1, flex: 1, background: "rgba(45, 59, 86, 0.5)" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-1px",
            }}
          >
            Work Experience & Production Impact
          </h2>
          <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 6 }}>
            Direct hands-on engineering across enterprise network AI and live client platforms in daily commercial use.
          </p>
        </div>
      </RevealMotion>

      {/* Timeline Layout */}
      <div style={{ position: "relative", paddingLeft: 16 }}>
        {/* Continuous glowing vertical guideline */}
        <div
          style={{
            position: "absolute",
            left: 27,
            top: 20,
            bottom: 30,
            width: 2,
            background: "linear-gradient(180deg, #10B981 0%, #38BDF8 50%, rgba(31, 41, 61, 0.3) 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {EXPERIENCES.map((exp, idx) => (
            <RevealMotion
              key={idx}
              motionType={idx % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={idx * 100}
            >
              <div style={{ position: "relative", paddingLeft: 46 }}>
              {/* Timeline Pulse Node */}
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  top: 24,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: exp.current ? "#F59E0B" : "#10B981",
                  border: "3px solid #070B12",
                  boxShadow: exp.current
                    ? "0 0 16px rgba(245, 158, 11, 0.8)"
                    : "0 0 16px rgba(16, 185, 129, 0.8)",
                  animation: exp.current ? "timelinePulse 2s infinite" : "none",
                }}
              />

              <TiltCard
                maxTilt={4}
                style={{
                  background: "linear-gradient(180deg, #121824 0%, #0D131F 100%)",
                  border: "1px solid rgba(45, 59, 86, 0.7)",
                  borderRadius: 18,
                  padding: "28px 30px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                  transition: "border-color 0.25s ease",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#F8FAFC",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: exp.current ? "#F59E0B" : "#34D399",
                          padding: "3px 10px",
                          borderRadius: 6,
                          background: exp.current
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(16, 185, 129, 0.15)",
                          border: `1px solid ${
                            exp.current ? "rgba(245, 158, 11, 0.4)" : "rgba(16, 185, 129, 0.4)"
                          }`,
                        }}
                      >
                        {exp.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 700, color: "#34D399", marginTop: 4 }}>
                      {exp.company}
                    </div>
                    <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                      {exp.department}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(7, 11, 18, 0.7)",
                      border: "1px solid rgba(45, 59, 86, 0.7)",
                      padding: "6px 14px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#CBD5E1",
                    }}
                  >
                    <Calendar size={14} color="#34D399" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  {exp.highlights.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ color: "#34D399", fontSize: 14, marginTop: 1, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 14.5, color: "#CBD5E1", lineHeight: 1.65 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(31, 41, 61, 0.6)" }}>
                  {exp.tech.map((t) => (
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
                        transition: "all 0.2s ease",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          </RevealMotion>
        ))}
        </div>
      </div>
    </section>
  );
}
