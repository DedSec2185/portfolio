import React, { useState, useEffect, useRef } from "react";

/* ─── Color System (Soothing, Stable & Eye-Catching Emerald Slate Theme) ────── */
const C = {
  bg:       "#0A0E17", // Soothing midnight obsidian slate
  sur:      "#121824", // Surface card background
  surHover: "#1A2234", // Hover surface background
  bor:      "#1F293D", // Border color
  borLight: "#2D3B56", // Highlight border
  acc:      "#10B981", // Soothing Emerald Teal accent
  accLight: "#34D399", // Light Mint Emerald
  violet:   "#A78BFA", // Soft Lavender highlight
  cyan:     "#38BDF8", // Soothing Cyan highlight
  gold:     "#F59E0B", // Warm Amber for status
  t1:       "#F8FAFC", // Headings & high-emphasis text (Ultra crisp)
  t2:       "#CBD5E1", // Body text (Slate 300 - high contrast)
  t3:       "#94A3B8", // Muted text & labels (Slate 400 - clean readability)
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const ROLES = [
  "AI Software Engineer",
  "LLM & Agentic AI Builder",
  "Full-Stack Developer",
  "Backend Systems Engineer",
];

const PROJS = [
  {
    id: "01",
    act: true,
    tag: "LIVE PLATFORM",
    name: "Shivalaya Guest Experience Platform",
    client: "Shivalaya Resorts, Bhimtal — Ongoing",
    desc: "Sole developer of a live 3-app hospitality ecosystem in daily production: Guest Portal (QR food ordering + activity booking), Kitchen Panel (real-time WebSocket order queue, KOT printing, audio alerts), and Reception Dashboard (check-in/out, folio management, analytics, WhatsApp automation within 15s). Features PostgreSQL advisory locks for concurrency-safe bookings and RLS across 15+ tables. Contract value: ₹1,17,000.",
    stack: ["React 18", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel", "WhatsApp API"],
  },
  {
    id: "02",
    act: false,
    tag: "AI / RAG",
    name: "Cisco RAG Chatbot — AI Knowledge Assistant",
    client: "Reliance Jio, Network Automation",
    desc: "End-to-end RAG architecture: PyMuPDF document ingestion with font-based heading detection, 8-category Cisco domain classifier, and FAISS vector search (768-dim, cosine threshold ≥0.30). QLoRA fine-tuned Llama 3.2 quantized to GGUF via llama.cpp and served as a Cisco-expert model in Ollama. Secured with JWT auth, Dockerized, and deployed via Azure DevOps CI/CD.",
    stack: ["Python", "FastAPI", "FAISS", "Llama 3", "QLoRA", "Ollama", "Docker", "Azure DevOps"],
  },
  {
    id: "03",
    act: false,
    tag: "AGENTIC AI",
    name: "SLIM + MCP Agentic AI Framework",
    client: "Reliance Jio, Network Automation",
    desc: "Autonomous AI agent architecture where agents discover and invoke tools at runtime via MCP server registration—eliminating hardcoded tool manifests. Engineered the agent-to-tool resolution layer, dynamic registry, and multi-step reasoning loop. Integrated a LangChain + LangGraph meeting intelligence pipeline that converts raw transcripts into summaries, action items, assignees, and deadlines in structured JSON.",
    stack: ["Python", "SLIM Framework", "MCP Protocol", "FastAPI", "LangChain", "LangGraph"],
  },
  {
    id: "04",
    act: true,
    tag: "LIVE PLATFORM",
    name: "OCTS Offshore Manpower Portal",
    client: "OCTS Marine, Navi Mumbai — Ongoing",
    desc: "Secure internal enterprise platform for a marine oil & gas logistics firm. Features multi-tier RBAC (Admin/Clerk/Viewer), 30+ tracked worker attributes, 11 document classification types, multi-criteria search, and automated OpenPyXL Excel reports. Deployed with Docker + Nginx + Tailscale VPN for zero public endpoint exposure and zero-loss migrations via Alembic.",
    stack: ["React.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Nginx", "Tailscale VPN"],
  },
];

const EXP = [
  {
    role: "AI/ML Engineering Intern",
    co: "Reliance Jio",
    sub: "Network Automation · Navi Mumbai",
    period: "Jan – Jun 2026",
    cur: false,
    pts: [
      "Architected & deployed enterprise RAG pipeline with FAISS vector search and QLoRA fine-tuned Llama 3 on production Linux VMs via Azure DevOps.",
      "Engineered SLIM + MCP agentic framework enabling autonomous multi-step tool discovery and dynamic invocation without fixed manifest schemas.",
      "Built high-throughput Multilingual TTS API and LangGraph meeting intelligence pipeline integrated with FastAPI backend microservices.",
      "Implemented enterprise-grade JWT OAuth2 authentication across all microservices with Docker Compose orchestration.",
    ],
  },
  {
    role: "Software Developer",
    co: "Shivalaya Resorts",
    sub: "ASVEX Technologies · Bhimtal, Uttarakhand",
    period: "Jul 2026 – Present",
    cur: true,
    pts: [
      "Sole developer of a live 3-app hospitality platform serving guests, kitchen, and reception daily in active production.",
      "Managing end-to-end operations: feature rollouts, system uptime monitoring, PostgreSQL database locks, and direct client communications.",
    ],
  },
  {
    role: "Operations & Technical Developer",
    co: "OCTS Marine",
    sub: "Oceanic Construction & Technical Services",
    period: "Sep 2025 – Present",
    cur: true,
    pts: [
      "Designed, built, and maintain the offshore workforce portal used daily by operations personnel for manpower tracking.",
      "Streamlined documentation compliance, work-pass coordination, and employee credential management.",
    ],
  },
];

const SKILLS_DATA = [
  {
    cat: "AI / ML & LLMs",
    chips: ["RAG Pipelines", "LoRA / QLoRA", "LangChain", "LangGraph", "FAISS", "Ollama", "Llama 3", "HuggingFace", "Prompt Engineering", "llama.cpp"],
  },
  {
    cat: "Agentic Systems",
    chips: ["SLIM Framework", "MCP Protocol", "Tool Orchestration", "Multi-step Autonomous Loops", "Dynamic Tool Discovery"],
  },
  {
    cat: "Backend Engineering",
    chips: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT OAuth2", "REST APIs", "Pydantic", "Alembic"],
  },
  {
    cat: "Frontend Engineering",
    chips: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Zustand", "React Router v6", "HTML5/CSS3"],
  },
  {
    cat: "Databases & Storage",
    chips: ["PostgreSQL", "Supabase", "Row Level Security (RLS)", "Advisory Locks", "pg_net", "SQLite"],
  },
  {
    cat: "DevOps & Infrastructure",
    chips: ["Docker", "Nginx", "Vercel", "Azure DevOps", "Tailscale VPN", "Linux VM Administration", "Git / GitHub"],
  },
];

/* ─── Interactive Particle Canvas for Hero ───────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = C.acc;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.65,
      }}
    />
  );
}

/* ─── Animated 3D Hero Name Letters (Syne Font & Descender Protection) ─────── */
function Hero3DLetters({ text, delay = 0, color, isGradient = false }) {
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap", paddingBottom: "2px", overflow: "visible" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `heroLetterDrop 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 45}ms both`,
            color: color || C.t1,
            ...(isGradient
              ? {
                  background: `linear-gradient(135deg, ${C.accLight} 0%, ${C.violet} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : {}),
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── Scroll Counter Component ──────────────────────────────────────────────── */
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
      { threshold: 0.4 }
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

/* ─── Bidirectional Section Motion Reveal Wrappers (With Reverse Scroll) ───── */
function RevealMotion({ children, motionType = "fadeUp", delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "-20px 0px -20px 0px" }
    );
    const element = ref.current;
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const motionStyles = {
    fadeUp: {
      hidden: { opacity: 0, transform: "translateY(40px) scale(0.97)" },
      visible: { opacity: 1, transform: "translateY(0) scale(1)" },
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    slideLeft: {
      hidden: { opacity: 0, transform: "translateX(-50px) rotate(-1.8deg) scale(0.96)" },
      visible: { opacity: 1, transform: "translateX(0) rotate(0deg) scale(1)" },
      transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    slideRight: {
      hidden: { opacity: 0, transform: "translateX(50px) rotate(1.8deg) scale(0.96)" },
      visible: { opacity: 1, transform: "translateX(0) rotate(0deg) scale(1)" },
      transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    scaleUp: {
      hidden: { opacity: 0, transform: "scale(0.85) translateY(25px)" },
      visible: { opacity: 1, transform: "scale(1) translateY(0)" },
      transition: `opacity 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    },
    flip3D: {
      hidden: { opacity: 0, transform: "perspective(800px) rotateX(25deg) translateY(45px)" },
      visible: { opacity: 1, transform: "perspective(800px) rotateX(0deg) translateY(0)" },
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
  };

  const selected = motionStyles[motionType] || motionStyles.fadeUp;

  return (
    <div
      ref={ref}
      style={{
        ...(visible ? selected.visible : selected.hidden),
        transition: selected.transition,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Expandable Height Drawer for Projects ────────────────────────────────── */
function SmoothDrawer({ isOpen, children }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && innerRef.current) {
      requestAnimationFrame(() => {
        if (innerRef.current) setHeight(innerRef.current.scrollHeight);
      });
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        height: height,
        overflow: "hidden",
        transition: "height 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/* ─── Section Header ───────────────────────────────────────────────────────── */
function SectionHeader({ number, title, sub }) {
  return (
    <RevealMotion motionType="fadeUp">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 13,
              fontWeight: 800,
              color: C.accLight,
              letterSpacing: 1.5,
              background: "rgba(16, 185, 129, 0.12)",
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid rgba(16, 185, 129, 0.25)`,
            }}
          >
            {number}
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: C.t1,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h2>
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, ${C.borLight} 0%, rgba(31, 41, 61, 0.2) 100%)`,
          }}
        />
        {sub && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: C.t3,
              whiteSpace: "nowrap",
            }}
          >
            {sub}
          </span>
        )}
      </div>
    </RevealMotion>
  );
}

/* ─── Main Portfolio Component ──────────────────────────────────────────────── */
export default function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedProj, setExpandedProj] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [profileTab, setProfileTab] = useState("EDUCATION");

  /* Typewriter Loop */
  useEffect(() => {
    const targetRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting) {
      if (typedText.length < targetRole.length) {
        timer = setTimeout(() => {
          setTypedText(targetRole.slice(0, typedText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  /* Scroll Navigation Event */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter skills based on tab
  const filteredSkills =
    activeTab === "ALL"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.cat.toUpperCase().includes(activeTab));

  const pageWrapperStyle = {
    padding: "0 48px",
    maxWidth: 1160,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  };

  return (
    <div
      style={{
        background: C.bg,
        color: C.t1,
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ─── Global Styles & Keyframe Animations ──────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        /* 3D drop for name letters with perspective */
        @keyframes heroLetterDrop {
          0% {
            opacity: 0;
            transform: perspective(500px) translateY(-28px) rotateX(65deg) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: perspective(500px) translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes blinkCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes timelinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }

        .caret {
          display: inline-block;
          animation: blinkCaret 0.9s step-end infinite;
          color: ${C.accLight};
          font-weight: 700;
          margin-left: 2px;
        }

        /* Navigation Links */
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: ${C.t2};
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .nav-link:hover {
          color: ${C.t1};
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        /* Buttons with unique animations */
        .primary-btn {
          background: linear-gradient(135deg, ${C.acc} 0%, ${C.accLight} 100%);
          border: none;
          color: #090D16;
          font-weight: 800;
          font-size: 14.5px;
          padding: 13px 30px;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .primary-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.55);
        }

        .secondary-btn {
          background: ${C.sur};
          border: 1px solid ${C.borLight};
          color: ${C.t1};
          font-weight: 600;
          font-size: 14.5px;
          padding: 13px 28px;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        .secondary-btn:hover {
          border-color: ${C.accLight};
          color: ${C.accLight};
          background: ${C.surHover};
          transform: translateY(-2px);
          box-shadow: 0 4px 18px rgba(52, 211, 153, 0.2);
        }

        /* Project Card Hover */
        .project-card {
          background: ${C.sur};
          border: 1px solid ${C.bor};
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 16px;
        }
        .project-card:hover {
          border-color: ${C.borLight};
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(-2px);
        }

        /* Tab Pill */
        .tab-pill {
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          border: 1px solid ${C.bor};
          background: ${C.sur};
          color: ${C.t3};
          transition: all 0.2s ease;
        }
        .tab-pill.active, .tab-pill:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: ${C.acc};
          color: ${C.t1};
        }

        /* Responsive Layouts */
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .nav-container { grid-template-columns: 1fr auto !important; padding: 14px 20px !important; }
          .nav-center-menu { display: none !important; }
          .hero-pad { padding: 40px 20px 60px !important; }
          .sec-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .grid-2 { grid-template-columns: 1fr !important; gap: 30px !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .project-header-grid { grid-template-columns: 56px 1fr 28px !important; gap: 12px !important; }
          .expand-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      {/* Hero Ambient Starfield Canvas */}
      <HeroCanvas />

      {/* ─── 0. CENTERED FLOATING NAVBAR & HEADER LOGO ───────────────────────── */}
      <nav
        className="nav-container"
        style={{
          padding: "16px 48px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isScrolled ? "rgba(9, 13, 22, 0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled ? `1px solid ${C.bor}` : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* Left: Creative Signature Monogram Logo */}
        <div
          onClick={() => scrollTo("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            justifySelf: "start",
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(16, 185, 129, 0.1)",
              border: `1px solid ${C.acc}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.25)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', 'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 800,
                color: C.accLight,
                letterSpacing: 1,
              }}
            >
              AS
            </span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: C.acc,
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: C.t1,
                letterSpacing: "-0.3px",
              }}
            >
              Abhayraj Singh
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.accLight }}>
              AI Engineer
            </div>
          </div>
        </div>

        {/* Center: Centered Navigation Menu Links */}
        <div
          className="nav-center-menu"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifySelf: "center",
            background: "rgba(18, 24, 36, 0.75)",
            padding: "4px 8px",
            borderRadius: 30,
            border: `1px solid ${C.bor}`,
          }}
        >
          {[
            { label: "Experience", id: "work" },
            { label: "Projects", id: "projects" },
            { label: "Stack", id: "stack" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.label}
              className="nav-link"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Quick CTA Button for Balanced Layout */}
        <div style={{ justifySelf: "end" }}>
          <button
            className="secondary-btn"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "8px 20px",
              fontSize: 13,
              borderRadius: 20,
              fontWeight: 700,
            }}
          >
            Let's Talk
          </button>
        </div>
      </nav>

      {/* ─── 1. HERO SECTION WITH INTEGRATED PHOTO ────────────────────────────── */}
      <section
        id="hero"
        className="hero-pad"
        style={{
          ...pageWrapperStyle,
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px 48px 80px",
        }}
      >
        <div style={{ width: "100%" }}>
          {/* Main Hero 2-Column Grid (Name & Bio Left, Creative Photo Right) */}
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 48,
              alignItems: "center",
              marginBottom: 56,
            }}
          >
            {/* Left Column: Name, Role, Bio, CTAs */}
            <div>
              <div style={{ marginBottom: 18, overflow: "visible" }}>
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(48px, 7.5vw, 92px)",
                    fontWeight: 800,
                    letterSpacing: "-2.5px",
                    lineHeight: 1.02,
                    color: C.t1,
                  }}
                >
                  <Hero3DLetters text="Abhayraj" delay={100} />
                  <br />
                  <Hero3DLetters text="Singh" delay={450} isGradient={true} />
                </h1>
              </div>

              {/* Role Typewriter Subtitle */}
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
                    width: 32,
                    height: 2,
                    background: `linear-gradient(90deg, ${C.acc}, ${C.accLight})`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(16px, 2.2vw, 22px)",
                    fontWeight: 600,
                    color: C.t2,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {typedText}
                  <span className="caret">|</span>
                </span>
              </div>

              {/* Bio Paragraph */}
              <p
                style={{
                  fontSize: 16.5,
                  color: C.t2,
                  lineHeight: 1.8,
                  maxWidth: 540,
                  marginBottom: 36,
                }}
              >
                Building production-grade AI systems, RAG pipelines, and agentic workflows at{" "}
                <strong style={{ color: C.t1, fontWeight: 700 }}>Reliance Jio</strong>. Sole creator of{" "}
                <strong style={{ color: C.t1, fontWeight: 700 }}>two live client platforms</strong> in daily commercial use.
                B.Tech Computer Engineering (Graduation 2028).
              </p>

              {/* Call to Actions */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <button className="primary-btn" onClick={() => scrollTo("projects")}>
                  Explore Production Projects
                  <span style={{ fontSize: 16 }}>→</span>
                </button>
                <button className="secondary-btn" onClick={() => scrollTo("contact")}>
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Right Column: Hero Photo Spotlight Card (Clean Bright Photo, No Overlays!) */}
            <RevealMotion motionType="scaleUp" delay={250}>
              <div
                style={{
                  background: C.sur,
                  border: `1px solid ${C.borLight}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Photo container (clean, bright, natural visibility) */}
                <div style={{ position: "relative", width: "100%", maxHeight: 440, overflow: "hidden" }}>
                  <img
                    src="/abhayraj-jio.jpg"
                    alt="Abhayraj Singh at Reliance Jio"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: 440,
                      objectFit: "cover",
                      objectPosition: "center 25%",
                      display: "block",
                    }}
                  />
                </div>

                {/* Bottom Label Banner */}
                <div
                  style={{
                    padding: "18px 24px",
                    background: C.sur,
                    borderTop: `1px solid ${C.bor}`,
                  }}
                >
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: C.t1 }}>
                    Abhayraj Singh
                  </div>
                  <div style={{ fontSize: 13.5, color: C.accLight, fontWeight: 600, marginTop: 3 }}>
                    AI Software Engineer
                  </div>
                </div>
              </div>
            </RevealMotion>
          </div>

          {/* ─── HERO STATS CARDS ───────────────────────────────────────────── */}
          <div
            className="stat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              alignItems: "stretch",
              borderTop: `1px solid ${C.bor}`,
              paddingTop: 36,
            }}
          >
            {[
              { val: 6, pre: "", suf: " mo", label: "AI/ML Engineering at Reliance Jio" },
              { val: 3, pre: "", suf: "", label: "Live Client Apps in Daily Use" },
              { val: 2, pre: "", suf: "", label: "Active Enterprise Client Contracts" },
              { val: 117, pre: "₹", suf: "K", label: "Commercial Contract Value Shipped" },
            ].map((stat, idx) => (
              <RevealMotion key={idx} motionType="scaleUp" delay={idx * 100} style={{ height: "100%" }}>
                <div
                  style={{
                    background: C.sur,
                    border: `1px solid ${C.bor}`,
                    borderRadius: 12,
                    padding: "24px 22px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "140px",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(28px, 3.2vw, 42px)",
                      fontWeight: 800,
                      color: C.t1,
                      letterSpacing: "-0.5px",
                      lineHeight: 1.05,
                      marginBottom: 12,
                    }}
                  >
                    <AnimatedCounter to={stat.val} pre={stat.pre} suf={stat.suf} />
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: C.t3,
                      lineHeight: 1.45,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </RevealMotion>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. EXPERIENCE SECTION ─────────────────────────────────────────── */}
      <section id="work" className="sec-pad" style={{ ...pageWrapperStyle, padding: "96px 48px 0" }}>
        <SectionHeader number="01" title="Work Experience" sub="Production Work Only" />

        <div style={{ position: "relative", paddingLeft: 12 }}>
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 10,
              bottom: 10,
              width: 2,
              background: `linear-gradient(180deg, ${C.acc} 0%, ${C.bor} 100%)`,
            }}
          />

          {EXP.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <RevealMotion
                key={idx}
                motionType={isLeft ? "slideLeft" : "slideRight"}
                delay={idx * 100}
              >
                <div
                  style={{
                    position: "relative",
                    paddingLeft: 46,
                    marginBottom: 44,
                  }}
                >
                  {/* Timeline Pulse Node */}
                  <div
                    style={{
                      position: "absolute",
                      left: 17,
                      top: 6,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: item.cur ? C.gold : C.acc,
                      border: `3px solid ${C.bg}`,
                      boxShadow: item.cur ? `0 0 12px ${C.gold}` : `0 0 12px ${C.acc}`,
                      animation: item.cur ? "timelinePulse 2s infinite" : "none",
                    }}
                  />

                  {/* Card Container */}
                  <div
                    style={{
                      background: C.sur,
                      border: `1px solid ${C.bor}`,
                      borderRadius: 12,
                      padding: "24px 28px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 12,
                        marginBottom: 14,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 18,
                            fontWeight: 800,
                            color: C.t1,
                          }}
                        >
                          {item.role}
                        </h3>
                        <div
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: item.cur ? C.gold : C.accLight,
                            marginTop: 3,
                          }}
                        >
                          {item.co}
                        </div>
                        <div style={{ fontSize: 12.5, color: C.t3, marginTop: 2 }}>
                          {item.sub}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {item.cur && (
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: C.gold,
                              padding: "4px 10px",
                              background: "rgba(245, 158, 11, 0.15)",
                              borderRadius: 4,
                              border: `1px solid rgba(245, 158, 11, 0.35)`,
                              letterSpacing: 0.5,
                            }}
                          >
                            PRESENT
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: C.t3,
                            background: C.bg,
                            padding: "4px 12px",
                            borderRadius: 6,
                            border: `1px solid ${C.bor}`,
                          }}
                        >
                          {item.period}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {item.pts.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <span style={{ color: C.accLight, fontSize: 14, marginTop: 1 }}>▸</span>
                          <span style={{ fontSize: 14.5, color: C.t2, lineHeight: 1.65 }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealMotion>
            );
          })}
        </div>
      </section>

      {/* ─── 3. PROJECTS SECTION ───────────────────────────────────────────── */}
      <section id="projects" className="sec-pad" style={{ ...pageWrapperStyle, padding: "96px 48px 0" }}>
        <SectionHeader number="02" title="Featured Projects" sub="Live Platforms & AI Systems" />

        {PROJS.map((proj, idx) => {
          const isExpanded = expandedProj === idx;
          return (
            <RevealMotion key={idx} motionType="fadeUp" delay={idx * 80}>
              <div className="project-card">
                <div
                  className="project-header-grid"
                  onClick={() => setExpandedProj(isExpanded ? null : idx)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 36px",
                    gap: 20,
                    alignItems: "center",
                    padding: "24px 28px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', 'Syne', sans-serif",
                      fontSize: 28,
                      fontWeight: 800,
                      color: isExpanded ? C.accLight : C.t3,
                      letterSpacing: "-0.5px",
                      userSelect: "none",
                      transition: "color 0.2s ease",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: `1px solid ${isExpanded ? C.acc : C.bor}`,
                      padding: "6px 12px",
                      borderRadius: 8,
                      textAlign: "center",
                    }}
                  >
                    {proj.id}
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                        marginBottom: 6,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 18,
                          fontWeight: 800,
                          color: C.t1,
                        }}
                      >
                        {proj.name}
                      </h3>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 800,
                          color: proj.act ? C.gold : C.accLight,
                          padding: "3px 9px",
                          background: proj.act
                            ? "rgba(245, 158, 11, 0.12)"
                            : "rgba(16, 185, 129, 0.12)",
                          borderRadius: 4,
                          border: `1px solid ${
                            proj.act ? "rgba(245, 158, 11, 0.3)" : "rgba(16, 185, 129, 0.3)"
                          }`,
                          letterSpacing: 0.5,
                        }}
                      >
                        {proj.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: C.t3, fontWeight: 500 }}>
                      {proj.client}
                    </div>
                  </div>

                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isExpanded ? "rgba(16, 185, 129, 0.15)" : C.bg,
                      border: `1px solid ${isExpanded ? C.acc : C.bor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 700,
                      color: isExpanded ? C.accLight : C.t3,
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </div>
                </div>

                <SmoothDrawer isOpen={isExpanded}>
                  <div
                    className="expand-pad"
                    style={{
                      padding: "0 28px 28px 128px",
                      borderTop: `1px solid ${C.bor}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14.5,
                        color: C.t2,
                        lineHeight: 1.8,
                        marginBottom: 20,
                        maxWidth: 720,
                        paddingTop: 20,
                      }}
                    >
                      {proj.desc}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.t2,
                            padding: "5px 14px",
                            background: C.bg,
                            borderRadius: 6,
                            border: `1px solid ${C.bor}`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SmoothDrawer>
              </div>
            </RevealMotion>
          );
        })}
      </section>

      {/* ─── 4. SKILLS & TECH STACK ─────────────────────────────────────────── */}
      <section id="stack" className="sec-pad" style={{ ...pageWrapperStyle, padding: "96px 48px 0" }}>
        <SectionHeader number="03" title="Technical Stack" sub="Production Skills & Frameworks" />

        <RevealMotion motionType="fadeUp">
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            {["ALL", "AI / ML", "AGENTIC", "BACKEND", "FRONTEND", "DEVOPS"].map((tab) => (
              <button
                key={tab}
                className={`tab-pill ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealMotion>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {filteredSkills.map((categoryGroup, idx) => (
            <RevealMotion key={categoryGroup.cat} motionType="scaleUp" delay={idx * 60}>
              <div
                style={{
                  background: C.sur,
                  border: `1px solid ${C.bor}`,
                  borderRadius: 12,
                  padding: "22px 26px",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: C.accLight,
                    letterSpacing: 1.5,
                    marginBottom: 14,
                    textTransform: "uppercase",
                  }}
                >
                  {categoryGroup.cat}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {categoryGroup.chips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.t1,
                        padding: "6px 15px",
                        background: C.bg,
                        borderRadius: 8,
                        border: `1px solid ${C.bor}`,
                        transition: "all 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = C.accLight;
                        e.currentTarget.style.color = C.accLight;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = C.bor;
                        e.currentTarget.style.color = C.t1;
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </RevealMotion>
          ))}
        </div>
      </section>

      {/* ─── 5. ABOUT & CREDENTIALS SECTION ─────────────────────────────────── */}
      <section id="about" className="sec-pad" style={{ ...pageWrapperStyle, padding: "96px 48px 0" }}>
        <SectionHeader number="04" title="About & Credentials" sub="Personal Background, Education & Certifications" />

        <div style={{ background: C.sur, border: `1px solid ${C.bor}`, borderRadius: 20, padding: "36px 36px" }}>
          {/* Sub-Header Tabs */}
          <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
            {[
              { id: "EDUCATION", label: "Education & Degree" },
              { id: "CERTIFICATIONS", label: "Certifications & Awards" },
              { id: "SPECS", label: "Personal Specifications" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-pill ${profileTab === tab.id ? "active" : ""}`}
                onClick={() => setProfileTab(tab.id)}
                style={{ padding: "9px 22px", fontSize: 13 }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Education */}
          {profileTab === "EDUCATION" && (
            <RevealMotion motionType="fadeUp">
              <div
                style={{
                  background: C.bg,
                  border: `1px solid ${C.bor}`,
                  borderRadius: 16,
                  padding: "28px 32px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: C.t1 }}>
                      B.Tech in Computer Engineering
                    </h3>
                    <div style={{ fontSize: 15, color: C.accLight, fontWeight: 600, marginTop: 4 }}>
                      K. J. Somaiya College of Engineering, Mumbai
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: C.gold,
                      background: "rgba(245, 158, 11, 0.12)",
                      padding: "6px 14px",
                      borderRadius: 8,
                      border: `1px solid rgba(245, 158, 11, 0.35)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Graduation 2028
                  </span>
                </div>
                <p style={{ fontSize: 15, color: C.t2, lineHeight: 1.8, marginTop: 16 }}>
                  Specializing in Artificial Intelligence, Machine Learning, and Enterprise System Architecture. Combining academic rigor with active production software engineering experience at Reliance Jio.
                </p>
              </div>
            </RevealMotion>
          )}

          {/* Tab 2: Certifications */}
          {profileTab === "CERTIFICATIONS" && (
            <RevealMotion motionType="fadeUp">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {[
                  {
                    title: "NVIDIA Deep Learning Institute",
                    sub: "Fundamentals of Deep Learning & Neural Network Architectures",
                    tag: "NVIDIA DL",
                  },
                  {
                    title: "Microsoft Azure Fundamentals",
                    sub: "Azure Cloud Architecture (AZ-900 / AI-900)",
                    tag: "MICROSOFT",
                  },
                  {
                    title: "Reliance Jio AI/ML Performance Recognition",
                    sub: "Recognized for building production RAG & Agentic AI MCP Framework",
                    tag: "RELIANCE JIO",
                  },
                  {
                    title: "Production Hospitality Platform Delivery",
                    sub: "Sole developer of 3 live client applications in active commercial use",
                    tag: "CLIENT PROD",
                  },
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.bor}`,
                      borderRadius: 14,
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: C.t1 }}>{cert.title}</div>
                      <div style={{ fontSize: 13, color: C.t3, marginTop: 4 }}>{cert.sub}</div>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: C.accLight,
                        background: "rgba(16, 185, 129, 0.12)",
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: `1px solid rgba(16, 185, 129, 0.3)`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cert.tag}
                    </span>
                  </div>
                ))}
              </div>
            </RevealMotion>
          )}

          {/* Tab 3: Personal Specs (Clean Aligned Headers & Values) */}
          {profileTab === "SPECS" && (
            <RevealMotion motionType="fadeUp">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "FULL NAME", val: "Abhayraj Singh" },
                  { label: "CURRENT ROLE", val: "AI/ML Engineering Intern @ Reliance Jio" },
                  { label: "DEGREE & COLLEGE", val: "B.Tech Computer Engineering · K. J. Somaiya College of Engineering, Mumbai" },
                  { label: "GRADUATION YEAR", val: "2028" },
                  { label: "LOCATION", val: "Navi Mumbai & Mumbai, Maharashtra, India" },
                  { label: "LANGUAGES", val: "English (Fluent), Hindi (Native), Marathi" },
                  { label: "WORK NOTICE PERIOD", val: "Immediate (Zero Notice Period)" },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.bor}`,
                      borderRadius: 12,
                      padding: "16px 24px",
                      display: "grid",
                      gridTemplateColumns: "220px 1fr",
                      alignItems: "center",
                      gap: 24,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.accLight, letterSpacing: 1.2, textTransform: "uppercase" }}>
                      {spec.label}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </RevealMotion>
          )}
        </div>
      </section>

      {/* ─── 6. CONTACT SECTION ─────────────────────────────────────────────── */}
      <section id="contact" className="sec-pad" style={{ ...pageWrapperStyle, padding: "100px 48px 100px" }}>
        <div style={{ borderTop: `1px solid ${C.bor}`, paddingTop: 80 }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <RevealMotion motionType="slideLeft">
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(34px, 4.8vw, 64px)",
                  fontWeight: 800,
                  color: C.t1,
                  letterSpacing: "-2px",
                  lineHeight: 1.15,
                  marginBottom: 24,
                  overflow: "visible",
                  paddingBottom: "12px",
                }}
              >
                Let's build<br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${C.accLight} 0%, ${C.violet} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  something great.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16.5,
                  color: C.t2,
                  lineHeight: 1.8,
                  maxWidth: 440,
                }}
              >
                Open to remote and WFH engineering roles. Available immediately with zero notice period.
              </p>
            </RevealMotion>

            <RevealMotion motionType="slideRight">
              <div
                style={{
                  background: C.sur,
                  border: `1px solid ${C.bor}`,
                  borderRadius: 16,
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)",
                }}
              >
                {[
                  {
                    label: "PHONE",
                    val: "+91 9892469015",
                    href: "tel:+919892469015",
                  },
                  {
                    label: "EMAIL",
                    val: "abhayrajs366@gmail.com",
                    href: "mailto:abhayrajs366@gmail.com",
                  },
                  {
                    label: "LINKEDIN",
                    val: "abhayraj-singh-91a6b537b",
                    href: "https://linkedin.com/in/abhayraj-singh-91a6b537b",
                  },
                  {
                    label: "LOCATION",
                    val: "Navi Mumbai, Maharashtra, India",
                    href: null,
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    style={{
                      paddingBottom: 20,
                      borderBottom: idx < 3 ? `1px solid ${C.bor}` : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: C.accLight,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noreferrer"
                        style={{
                          fontSize: 16.5,
                          color: C.t1,
                          fontWeight: 600,
                          textDecoration: "none",
                          wordBreak: "break-word",
                          transition: "color 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = C.accLight)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = C.t1)}
                      >
                        {item.val}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontSize: 16.5,
                          color: C.t1,
                          fontWeight: 600,
                          wordBreak: "break-word",
                        }}
                      >
                        {item.val}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  className="primary-btn"
                  onClick={() => (window.location.href = "mailto:abhayrajs366@gmail.com")}
                  style={{
                    marginTop: 12,
                    width: "100%",
                    justifyContent: "center",
                    padding: "15px 32px",
                    fontSize: 15,
                  }}
                >
                  Send Direct Email
                </button>
              </div>
            </RevealMotion>
          </div>
        </div>
      </section>

      {/* ─── 7. FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "32px 48px",
          borderTop: `1px solid ${C.bor}`,
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          position: "relative",
          zIndex: 1,
          background: C.bg,
        }}
      >
        <span style={{ fontSize: 13.5, fontWeight: 500, color: C.t3 }}>
          © 2026 Abhayraj Singh — AI Software Engineer
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 500, color: C.t3 }}>
          Navi Mumbai · India
        </span>
      </footer>
    </div>
  );
}
