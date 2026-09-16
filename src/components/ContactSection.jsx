import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, Clock, ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { PERSONAL_INFO } from "../data/portfolioData";
import { triggerConfetti } from "../utils/confetti";
import { playClick, playSuccess, playHover } from "../utils/audioSynth";

function LinkedinIcon({ size = 14, color = "#34D399" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactSection() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSuccess();

    // Trigger confetti at click coordinate
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerConfetti(x, y);

    setTimeout(() => {
      setCopiedKey(null);
    }, 2400);
  };

  const contactMethods = [
    {
      key: "email",
      label: "EMAIL ADDRESS",
      value: PERSONAL_INFO.email,
      icon: Mail,
      actionText: "Send Mail",
      href: `mailto:${PERSONAL_INFO.email}`,
      copyable: true,
    },
    {
      key: "phone",
      label: "PHONE / WHATSAPP",
      value: PERSONAL_INFO.phone,
      icon: Phone,
      actionText: "Call",
      href: `tel:${PERSONAL_INFO.phone}`,
      copyable: true,
    },
    {
      key: "linkedin",
      label: "LINKEDIN PROFILE",
      value: PERSONAL_INFO.linkedinHandle,
      icon: LinkedinIcon,
      actionText: "Open Profile",
      href: PERSONAL_INFO.linkedin,
      copyable: false,
    },
    {
      key: "location",
      label: "BASE LOCATION",
      value: PERSONAL_INFO.location,
      icon: MapPin,
      actionText: "Open to Remote",
      href: null,
      copyable: false,
    },
  ];

  return (
    <section
      id="contact"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "80px 24px 100px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ borderTop: "1px solid rgba(45, 59, 86, 0.7)", paddingTop: 70 }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* Left Column */}
          <RevealMotion motionType="slideLeft">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  marginBottom: 20,
                }}
              >
                <Sparkles size={14} color="#34D399" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#34D399" }}>
                  OPEN TO HIGH-IMPACT ROLES
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(34px, 4.8vw, 60px)",
                  fontWeight: 800,
                  color: "#F8FAFC",
                  letterSpacing: "-2px",
                  lineHeight: 1.12,
                  marginBottom: 20,
                }}
              >
                Let's engineer<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #A78BFA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  something exceptional.
                </span>
              </h2>

              <p style={{ fontSize: 16, color: "#CBD5E1", lineHeight: 1.8, maxWidth: 500, marginBottom: 28 }}>
                Available immediately with <strong style={{ color: "#F8FAFC" }}>zero notice period</strong>. Open to AI/ML engineering, LLM systems, full-stack systems, and remote or hybrid tech opportunities.
              </p>

              <div
                style={{
                  background: "rgba(18, 24, 36, 0.6)",
                  border: "1px solid rgba(45, 59, 86, 0.6)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  maxWidth: 480,
                }}
              >
                <Clock size={20} color="#F59E0B" />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#F8FAFC" }}>
                    Response Time Guarantee
                  </div>
                  <div style={{ fontSize: 12.5, color: "#94A3B8" }}>
                    Direct emails and calls are typically answered within 2 hours.
                  </div>
                </div>
              </div>
            </div>
          </RevealMotion>

          {/* Right Column: Interactive Contact Card with 1-Click Copy & Confetti */}
          <RevealMotion motionType="slideRight" delay={100}>
            <TiltCard
              maxTilt={3}
            style={{
              background: "linear-gradient(180deg, #141B2B 0%, #0D131F 100%)",
              border: "1px solid rgba(45, 59, 86, 0.8)",
              borderRadius: 20,
              padding: "36px 32px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              const isCopied = copiedKey === method.key;

              return (
                <div
                  key={method.key}
                  style={{
                    paddingBottom: 16,
                    borderBottom: idx < contactMethods.length - 1 ? "1px solid rgba(31, 41, 61, 0.6)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon size={14} color="#34D399" />
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#34D399", letterSpacing: 1.2 }}>
                        {method.label}
                      </span>
                    </div>

                    {method.copyable && (
                      <button
                        onClick={(e) => handleCopy(method.value, method.key, e)}
                        onMouseEnter={playHover}
                        style={{
                          background: isCopied ? "rgba(16, 185, 129, 0.2)" : "rgba(7, 11, 18, 0.7)",
                          border: `1px solid ${isCopied ? "rgba(16, 185, 129, 0.6)" : "rgba(45, 59, 86, 0.6)"}`,
                          color: isCopied ? "#34D399" : "#94A3B8",
                          padding: "3px 8px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isCopied ? <Check size={12} color="#34D399" /> : <Copy size={12} />}
                        <span>{isCopied ? "Copied!" : "Copy"}</span>
                      </button>
                    )}
                  </div>

                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      style={{
                        fontSize: 15.5,
                        fontWeight: 600,
                        color: "#F8FAFC",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "color 0.2s ease",
                      }}
                    >
                      <span>{method.value}</span>
                      <ArrowUpRight size={14} color="#94A3B8" />
                    </a>
                  ) : (
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: "#F8FAFC" }}>
                      {method.value}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => {
                playClick();
                window.location.href = `mailto:${PERSONAL_INFO.email}`;
              }}
              onMouseEnter={playHover}
              style={{
                marginTop: 8,
                width: "100%",
                padding: "14px 24px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                border: "none",
                color: "#051A14",
                fontWeight: 800,
                fontSize: 14.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                transition: "all 0.25s ease",
              }}
            >
              <Send size={16} />
              <span>Send Direct Email Now</span>
            </button>
            </TiltCard>
          </RevealMotion>
        </div>
      </div>
    </section>
  );
}
