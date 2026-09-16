import React, { useState } from "react";
import { GraduationCap, Award, UserCheck, Shield, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { CERTIFICATIONS, PERSONAL_SPECS, PERSONAL_INFO } from "../data/portfolioData";
import { playClick, playHover } from "../utils/audioSynth";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("EDUCATION");

  const tabs = [
    { id: "EDUCATION", label: "Education & Degree", icon: GraduationCap },
    { id: "CERTIFICATIONS", label: "Certifications & Awards", icon: Award },
    { id: "SPECS", label: "Engineering Specs", icon: UserCheck },
  ];

  return (
    <section
      id="about"
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
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                fontSize: 12,
                fontWeight: 800,
                color: "#F59E0B",
                letterSpacing: 1,
              }}
            >
              04 · ABOUT & CREDENTIALS
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
            Academic Rigor & Engineering Credentials
          </h2>
          <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 6 }}>
            Bridging advanced computer engineering academics with enterprise production deployments.
          </p>
        </div>
      </RevealMotion>

      {/* Card Container */}
      <RevealMotion motionType="scaleUp" delay={120}>
        <TiltCard
          maxTilt={2}
          style={{
            background: "linear-gradient(180deg, #121824 0%, #0D131F 100%)",
            border: "1px solid rgba(45, 59, 86, 0.7)",
            borderRadius: 20,
            padding: "36px 36px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
          }}
        >
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                onMouseEnter={playHover}
                style={{
                  background: isActive ? "rgba(16, 185, 129, 0.18)" : "rgba(7, 11, 18, 0.7)",
                  border: `1px solid ${isActive ? "rgba(16, 185, 129, 0.4)" : "rgba(45, 59, 86, 0.6)"}`,
                  color: isActive ? "#34D399" : "#94A3B8",
                  padding: "10px 20px",
                  borderRadius: 12,
                  fontSize: 13.5,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Education */}
        {activeTab === "EDUCATION" && (
          <div
            style={{
              background: "rgba(7, 11, 18, 0.75)",
              border: "1px solid rgba(45, 59, 86, 0.6)",
              borderRadius: 16,
              padding: "28px 32px",
              animation: "heroLetterDrop 0.3s ease both",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#F8FAFC" }}>
                  {PERSONAL_INFO.education.degree}
                </h3>
                <div style={{ fontSize: 16, color: "#34D399", fontWeight: 700, marginTop: 4 }}>
                  {PERSONAL_INFO.education.college}
                </div>
                <div style={{ fontSize: 13.5, color: "#94A3B8", marginTop: 4 }}>
                  Specialization: {PERSONAL_INFO.education.specialization}
                </div>
              </div>

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#F59E0B",
                  background: "rgba(245, 158, 11, 0.15)",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                Graduation {PERSONAL_INFO.education.graduation}
              </span>
            </div>

            <p style={{ fontSize: 15, color: "#CBD5E1", lineHeight: 1.8, marginTop: 18 }}>
              Combining academic foundations in data structures, distributed systems, and computer architecture with real-world engineering at Reliance Jio. Focused on low-latency inference, dynamic agentic protocols, and concurrency-safe database architectures.
            </p>
          </div>
        )}

        {/* Tab 2: Certifications & Recognitions */}
        {activeTab === "CERTIFICATIONS" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
              animation: "heroLetterDrop 0.3s ease both",
            }}
          >
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(7, 11, 18, 0.75)",
                  border: "1px solid rgba(45, 59, 86, 0.6)",
                  borderRadius: 14,
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#F8FAFC" }}>{cert.title}</div>
                  <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>{cert.subtitle}</div>
                  <div style={{ fontSize: 12, color: "#38BDF8", fontWeight: 600, marginTop: 6 }}>
                    ✓ {cert.highlight}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#34D399",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cert.tag}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Personal Specs */}
        {activeTab === "SPECS" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              animation: "heroLetterDrop 0.3s ease both",
            }}
          >
            {PERSONAL_SPECS.map((spec, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(7, 11, 18, 0.75)",
                  border: "1px solid rgba(45, 59, 86, 0.6)",
                  borderRadius: 12,
                  padding: "16px 24px",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#34D399",
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  {spec.label}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: "#F8FAFC" }}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </TiltCard>
    </RevealMotion>
  </section>
  );
}
