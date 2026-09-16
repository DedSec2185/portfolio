import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Terminal, Sparkles, Cpu, ShieldCheck, Database, Layers } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { HERO_ROLES, STATS, PERSONAL_INFO } from "../data/portfolioData";
import { playClick, playHover } from "../utils/audioSynth";

function AnimatedCounter({ to, pre = "", suf = "", dur = 1800 }) {
  const [val, setVal] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let startTime = null;
    const step = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * to));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(to);
      }
    };
    requestAnimationFrame(step);
  }, [active, to, dur]);

  return (
    <span ref={ref}>
      {pre}
      {val}
      {suf}
    </span>
  );
}

function Hero3DLetters({ text, delay = 0, isGradient = false }) {
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `heroLetterDrop 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 40}ms both`,
            ...(isGradient
              ? {
                  background: "linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : { color: "#F8FAFC" }),
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onOpenTerminal }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = HERO_ROLES[roleIndex];
    let timer;

    if (!isDeleting) {
      if (typedText.length < targetRole.length) {
        timer = setTimeout(() => {
          setTypedText(targetRole.slice(0, typedText.length + 1));
        }, 65);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "50px 24px 70px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ─── Hero Main Content Grid ─── */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 48,
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        {/* Left Column: Typography, Badges, CTAs */}
        <div>
          {/* Large Title */}
          <div style={{ marginBottom: 18 }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(46px, 7vw, 90px)",
                fontWeight: 800,
                letterSpacing: "-2.5px",
                lineHeight: 1.02,
              }}
            >
              <Hero3DLetters text="Abhayraj" delay={80} />
              <br />
              <Hero3DLetters text="Singh" delay={420} isGradient={true} />
            </h1>
          </div>

          {/* Dynamic Typewriter Line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                background: "linear-gradient(90deg, #10B981, #34D399)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(18px, 2.3vw, 24px)",
                fontWeight: 700,
                color: "#E2E8F0",
                letterSpacing: "-0.3px",
              }}
            >
              {typedText}
              <span className="caret">|</span>
            </span>
          </div>

          {/* Subtitle Bio */}
          <p
            style={{
              fontSize: "clamp(15px, 1.3vw, 17px)",
              color: "#CBD5E1",
              lineHeight: 1.8,
              maxWidth: 580,
              marginBottom: 36,
            }}
          >
            Architecting enterprise RAG pipelines, fine-tuned LLMs, and autonomous agent loops at{" "}
            <strong style={{ color: "#F8FAFC", fontWeight: 700 }}>Reliance Jio</strong>. Sole creator of{" "}
            <strong style={{ color: "#F8FAFC", fontWeight: 700 }}>two live client platforms</strong> in active daily commercial production.
            B.Tech in Computer Engineering (Graduation 2028).
          </p>

          {/* CTAs Group */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => scrollTo("workbench")}
              onMouseEnter={playHover}
              className="primary-btn"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                border: "none",
                color: "#07130F",
                fontWeight: 800,
                fontSize: 14.5,
                padding: "14px 28px",
                borderRadius: 12,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                boxShadow: "0 6px 25px rgba(16, 185, 129, 0.4)",
                transition: "all 0.25s ease",
              }}
            >
              <Cpu size={18} />
              <span>Simulate Architecture</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollTo("projects")}
              onMouseEnter={playHover}
              className="secondary-btn"
              style={{
                background: "rgba(18, 24, 36, 0.85)",
                border: "1px solid rgba(45, 59, 86, 0.8)",
                color: "#F8FAFC",
                fontWeight: 700,
                fontSize: 14.5,
                padding: "14px 24px",
                borderRadius: 12,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.25s ease",
              }}
            >
              <Layers size={17} color="#38BDF8" />
              <span>Explore Projects</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenTerminal();
              }}
              onMouseEnter={playHover}
              title="Open Terminal HUD"
              style={{
                background: "rgba(18, 24, 36, 0.5)",
                border: "1px solid rgba(45, 59, 86, 0.6)",
                color: "#94A3B8",
                width: 48,
                height: 48,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Terminal size={18} color="#A78BFA" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Tilt Photo Spotlight Card */}
        <RevealMotion motionType="scaleUp" delay={150} style={{ display: "flex", justifyContent: "center" }}>
          <TiltCard
            maxTilt={6}
            style={{
              width: "100%",
              maxWidth: 440,
              background: "linear-gradient(180deg, #161F32 0%, #0D1322 100%)",
              borderRadius: 24,
              border: "1px solid rgba(45, 59, 86, 0.8)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.15)",
              overflow: "hidden",
            }}
          >
            {/* Top Bar Header with simulated status dots */}
            <div
              style={{
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(45, 59, 86, 0.5)",
                background: "rgba(10, 14, 23, 0.7)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#EF4444" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#F59E0B" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10B981" }} />
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 11,
                  color: "#34D399",
                  letterSpacing: 1,
                  fontWeight: 700,
                }}
              >
                PROD_ENGINEER.DEV
              </span>
            </div>

            {/* Photo Container (Properly framed to show face & upper body clearly) */}
            <div style={{ position: "relative", width: "100%", height: 440, overflow: "hidden" }}>
              <img
                src={PERSONAL_INFO.photo}
                alt="Abhayraj Singh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 88%",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>

            {/* Bottom Card Footer */}
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(14, 20, 31, 0.95)",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "#F8FAFC" }}>
                  Abhayraj Singh
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>
                  B.Tech CE · Somaiya '28
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 11, background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "4px 8px", borderRadius: 6, fontWeight: 700 }}>
                  RAG
                </span>
                <span style={{ fontSize: 11, background: "rgba(167, 139, 250, 0.15)", color: "#A78BFA", padding: "4px 8px", borderRadius: 6, fontWeight: 700 }}>
                  MCP
                </span>
                <span style={{ fontSize: 11, background: "rgba(16, 185, 129, 0.15)", color: "#34D399", padding: "4px 8px", borderRadius: 6, fontWeight: 700 }}>
                  QLoRA
                </span>
              </div>
            </div>
          </TiltCard>
        </RevealMotion>
      </div>

      {/* ─── Hero Stats Bar (With Dynamic Animated Counter) ─── */}
      <div
        className="stat-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
          borderTop: "1px solid rgba(31, 41, 61, 0.8)",
          paddingTop: 36,
        }}
      >
        {STATS.map((stat, idx) => (
          <RevealMotion key={idx} motionType="scaleUp" delay={idx * 90}>
            <TiltCard
              maxTilt={5}
              style={{
                background: "rgba(18, 24, 36, 0.75)",
                border: "1px solid rgba(45, 59, 86, 0.6)",
                borderRadius: 16,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 130,
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 3.4vw, 42px)",
                fontWeight: 800,
                color: "#F8FAFC",
                letterSpacing: "-1px",
                lineHeight: 1.05,
                marginBottom: 8,
              }}
            >
              <AnimatedCounter to={stat.val} pre={stat.pre} suf={stat.suf} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", lineHeight: 1.3 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                {stat.sub}
              </div>
            </div>
          </TiltCard>
        </RevealMotion>
      ))}
    </div>
    </section>
  );
}
