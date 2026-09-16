/* ─── Portfolio Data for Abhayraj Singh ───────────────────────────────────────── */

export const PERSONAL_INFO = {
  name: "Abhayraj Singh",
  monogram: "AS",
  title: "AI Software Engineer & Agentic Systems Builder",
  headline: "Building Production AI Systems, Enterprise RAG & Autonomous Agentic Workflows",
  location: "Navi Mumbai, Maharashtra, India",
  phone: "+91 9892469015",
  email: "abhayrajs366@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhayraj-singh-b2762b214/",
  linkedinHandle: "abhayraj-singh-b2762b214",
  photo: "/abhayraj-jio.jpg",
  noticePeriod: "Immediate (Zero Notice Period)",
  education: {
    degree: "B.Tech in Computer Engineering",
    college: "K. J. Somaiya College of Engineering, Mumbai",
    graduation: "2028",
    specialization: "Artificial Intelligence, Machine Learning & Distributed Systems",
  },
  summary:
    "AI Software Engineer specialized in high-performance RAG pipelines, fine-tuned LLMs (QLoRA), and autonomous agent frameworks (MCP). Currently architecting production systems at Reliance Jio and maintaining 2 live commercial client platforms in daily production.",
};

export const HERO_ROLES = [
  "AI Software Engineer",
  "LLM & Agentic AI Architect",
  "Full-Stack Systems Engineer",
  "RAG & High-Throughput ML Builder",
];

export const STATS = [
  { val: 6, pre: "", suf: " mo", label: "AI/ML Systems at Reliance Jio", sub: "RAG, QLoRA & MCP Agents" },
  { val: 3, pre: "", suf: " apps", label: "Live Ecosystem in Daily Production", sub: "Guest, Kitchen & Reception" },
  { val: 2, pre: "", suf: "", label: "Active Commercial Enterprise Clients", sub: "Hospitality & Marine Logistics" },
  { val: 117, pre: "₹", suf: "K", label: "Commercial Contract Shipped", sub: "Full Production Architecture" },
];

export const EXPERIENCES = [
  {
    role: "AI/ML Engineering Intern",
    company: "Reliance Jio",
    department: "Network Automation · Navi Mumbai",
    period: "Jan – Jun 2026",
    current: false,
    badge: "ENTERPRISE PRODUCTION",
    highlights: [
      "Architected & deployed enterprise Cisco RAG pipeline using FAISS vector search and QLoRA fine-tuned Llama 3 on production Linux VMs via Azure DevOps CI/CD.",
      "Engineered SLIM + MCP agentic framework enabling autonomous multi-step tool discovery and dynamic invocation without fixed manifest schemas.",
      "Built high-throughput Multilingual TTS API and LangGraph meeting intelligence pipeline integrated with FastAPI backend microservices.",
      "Implemented enterprise-grade JWT OAuth2 authentication across all microservices with Docker Compose orchestration.",
    ],
    tech: ["Python", "FastAPI", "FAISS", "Llama 3", "QLoRA", "Ollama", "MCP Protocol", "LangGraph", "Docker", "Azure DevOps"],
  },
  {
    role: "Software Developer (Solo Architect)",
    company: "Shivalaya Resorts",
    department: "ASVEX Technologies · Bhimtal, Uttarakhand",
    period: "Jul 2026 – Present",
    current: true,
    badge: "COMMERCIAL CLIENT",
    highlights: [
      "Sole developer of a live 3-app hospitality ecosystem in daily commercial production: Guest Portal (QR food ordering + activities), Kitchen Panel (real-time WebSocket order queue + KOT printing), and Reception Dashboard.",
      "Engineered PostgreSQL advisory locks to guarantee concurrency-safe cottage bookings and implemented Row Level Security (RLS) across 15+ database tables.",
      "Automated guest WhatsApp onboarding notifications within 15 seconds of reservation using Supabase Database Webhooks.",
      "Managing end-to-end client communications, 99.9% system uptime monitoring, and continuous zero-downtime feature rollouts.",
    ],
    tech: ["React 18", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel", "WhatsApp API", "WebSockets"],
  },
  {
    role: "Operations & Technical Developer",
    company: "OCTS Marine",
    department: "Oceanic Construction & Technical Services · Navi Mumbai",
    period: "Sep 2025 – Present",
    current: true,
    badge: "ENTERPRISE LOGISTICS",
    highlights: [
      "Designed, built, and maintain the internal offshore manpower portal tracking 30+ worker attributes and 11 maritime document classification types.",
      "Engineered multi-tier RBAC (Admin/Clerk/Viewer) with automated OpenPyXL Excel reports and multi-criteria fuzzy search.",
      "Deployed on isolated Linux servers using Docker, Nginx reverse proxy, and Tailscale VPN mesh for zero public endpoint exposure.",
      "Implemented zero-loss schema migrations using Alembic and SQLAlchemy ORM.",
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Nginx", "Tailscale VPN", "Alembic"],
  },
];

export const PROJECTS = [
  {
    id: "01",
    tag: "LIVE COMMERCIAL ECOSYSTEM",
    title: "Shivalaya Guest Experience Platform",
    client: "Shivalaya Resorts, Bhimtal — Ongoing Commercial Contract",
    status: "Active Production",
    metrics: "₹1,17,000 Contract · 3 Apps · 15s WhatsApp Automation · 99.9% Uptime",
    overview:
      "Sole developer of a full-scale 3-app hospitality ecosystem operating live in daily production. Connects resort guests, kitchen staff, and front desk reception through real-time reactive data flows.",
    details: [
      "Guest Portal: Instant QR-based food ordering, room service, and outdoor activity booking without requiring app installation.",
      "Kitchen Display System (KDS): Live WebSocket-powered order queue, automated Kitchen Order Ticket (KOT) printing, and audio alerts for incoming orders.",
      "Reception Dashboard: Real-time check-in/out, folio billing management, occupancy analytics, and automated WhatsApp confirmations within 15s.",
      "Data Safety: Strict PostgreSQL transaction advisory locks to eliminate double-booking race conditions during peak holiday seasons, with RLS across 15+ tables.",
    ],
    architecture: {
      clientLayer: "Guest QR Web App (React 18 + Tailwind) & Reception Console",
      realtimeLayer: "Supabase Realtime WebSockets & Database Webhooks",
      dbLayer: "PostgreSQL with Advisory Locks & Row Level Security (RLS)",
      automationLayer: "Meta WhatsApp Cloud API (<15s notification delivery)",
      infra: "Vercel Edge Network + Supabase Cloud",
    },
    stack: ["React 18", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel", "WhatsApp API", "WebSockets"],
  },
  {
    id: "02",
    tag: "ENTERPRISE AI / RAG",
    title: "Cisco RAG Chatbot — Enterprise Knowledge Assistant",
    client: "Reliance Jio, Network Automation",
    status: "Enterprise Linux VMs",
    metrics: "768-Dim Embeddings · QLoRA Fine-Tuned Llama 3.2 · Cosine Threshold ≥ 0.30",
    overview:
      "Production-grade Retrieval-Augmented Generation (RAG) assistant designed for enterprise network engineers, parsing dense Cisco configuration manuals and routing topologies.",
    details: [
      "PyMuPDF Parsing Pipeline: Extracts hierarchy-aware text blocks with font-based heading detection to preserve technical document structure.",
      "8-Category Cisco Domain Classifier: Intelligently routes queries to targeted sub-indexes (BGP, OSPF, VLAN, QoS, etc.) for high retrieval precision.",
      "Vector Indexing: 768-dimensional dense vector search via FAISS with tuned cosine similarity thresholding (≥0.30) to eliminate irrelevant context hallucination.",
      "Custom Model Serving: QLoRA fine-tuned Llama 3.2 quantized to GGUF format using llama.cpp and served via Ollama on production Linux VMs.",
      "Enterprise Security & CI/CD: Secured with JWT OAuth2 authentication, containerized with Docker, and deployed through automated Azure DevOps pipelines.",
    ],
    architecture: {
      ingestion: "PyMuPDF Custom Chunking + Heading-Aware Parser",
      routing: "8-Way Cisco Technical Domain Classifier",
      vectorDb: "FAISS Index FlatIP / L2 (768-dim embeddings)",
      llmEngine: "QLoRA Llama 3.2 (GGUF Quantized via llama.cpp in Ollama)",
      infra: "Linux VM Container Fleet · Azure DevOps CI/CD · JWT Auth",
    },
    stack: ["Python", "FastAPI", "FAISS", "Llama 3", "QLoRA", "Ollama", "Docker", "Azure DevOps", "JWT OAuth2"],
  },
  {
    id: "03",
    tag: "AGENTIC AI & PROTOCOLS",
    title: "SLIM + MCP Autonomous Agentic Framework",
    client: "Reliance Jio, Network Automation",
    status: "Production Framework",
    metrics: "Dynamic Protocol Registration · LangGraph State Machine · Zero Hardcoded Schemas",
    overview:
      "Next-generation agent architecture where autonomous AI agents discover and execute tools at runtime through Model Context Protocol (MCP) server registration, eliminating static manifests.",
    details: [
      "MCP Dynamic Registry: Agents query an MCP registry service at runtime to discover capabilities, inspect JSON schema signatures, and bind tools on the fly.",
      "Multi-Step Reasoning Loop: State machine that decomposes complex multi-stage objectives into plan, tool call, validation, and synthesis iterations.",
      "Meeting Intelligence Pipeline: LangChain + LangGraph directed acyclic graph (DAG) pipeline that parses messy voice meeting transcripts into structured action items, assignees, and deadlines in strict JSON.",
      "High-Throughput TTS: Multilingual Text-to-Speech API microservice integrated with asynchronous worker queues.",
    ],
    architecture: {
      protocol: "Model Context Protocol (MCP) Standard Server/Client",
      orchestrator: "SLIM Reasoning Agent Framework + Dynamic Tool Resolver",
      workflowEngine: "LangGraph Stateful Cyclic Graphs & Memory",
      services: "Multilingual TTS Microservice + FastAPI Backend",
    },
    stack: ["Python", "SLIM Framework", "MCP Protocol", "FastAPI", "LangChain", "LangGraph", "AsyncIO"],
  },
  {
    id: "04",
    tag: "SECURE ENTERPRISE WORKFORCE",
    title: "OCTS Offshore Manpower & Logistics Portal",
    client: "OCTS Marine, Navi Mumbai",
    status: "Active Production Portal",
    metrics: "30+ Attributes Tracked · Zero-Public Exposure · Tailscale VPN Mesh",
    overview:
      "Zero-trust internal enterprise management platform for offshore marine operations, coordinating personnel credentials, compliance safety work-passes, and offshore deployments.",
    details: [
      "Worker Dossiers: Comprehensive tracking of 30+ attributes per worker, with 11 document classification types (BOSIET, Medical Fitness, CDC, Seaman Passport).",
      "Multi-Tier RBAC: Role-based permissions strictly governing Admins, Field Clerks, and Audit Viewers.",
      "Reporting Engine: Automated Excel generation via OpenPyXL for port authority submissions and vessel boarding manifests.",
      "Zero-Trust Topology: Dockerized application fronted by Nginx and accessible exclusively through a private Tailscale VPN mesh—eliminating all public attack surfaces.",
      "Reliability: Zero-downtime database migrations managed via Alembic and SQLAlchemy ORM.",
    ],
    architecture: {
      frontend: "React.js SPA with Responsive Data Grids & Filter Matrices",
      apiBackend: "FastAPI REST API with Pydantic Schema Validation",
      database: "PostgreSQL with Alembic Automated Migrations",
      security: "Tailscale VPN Encrypted WireGuard Mesh + Nginx Reverse Proxy",
    },
    stack: ["React.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Nginx", "Tailscale VPN", "Alembic"],
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "AI_LLM",
    title: "AI / ML & LLMs",
    description: "Production RAG, parameter-efficient fine-tuning, vector search, and local model inference.",
    skills: [
      { name: "RAG Pipelines", prod: "Cisco Assistant at Jio", level: "Expert" },
      { name: "LoRA / QLoRA", prod: "Fine-tuned Llama 3 for network domain", level: "Advanced" },
      { name: "FAISS Vector Search", prod: "768-dim cosine retrieval at scale", level: "Expert" },
      { name: "Llama 3 & 3.2", prod: "Domain expert model deployed in prod", level: "Expert" },
      { name: "Ollama & llama.cpp", prod: "GGUF quantization & low-latency serving", level: "Advanced" },
      { name: "LangChain & LangGraph", prod: "Meeting intelligence DAG workflows", level: "Advanced" },
      { name: "PyMuPDF Document Parsing", prod: "Structure-preserving heading detection", level: "Advanced" },
      { name: "Prompt Engineering", prod: "Few-shot & structured JSON output loops", level: "Expert" },
    ],
  },
  {
    id: "AGENTIC",
    title: "Agentic Systems & Protocols",
    description: "Autonomous reasoning loops, dynamic tool orchestration, and MCP protocol integration.",
    skills: [
      { name: "MCP Protocol", prod: "Runtime tool registration & dynamic discovery", level: "Pioneer" },
      { name: "SLIM Agent Framework", prod: "Multi-step tool resolution loops at Jio", level: "Advanced" },
      { name: "Autonomous Reasoning", prod: "Plan-Execute-Verify cyclic state machines", level: "Advanced" },
      { name: "Tool Orchestration", prod: "Dynamic schema binding without static code", level: "Expert" },
      { name: "Structured JSON Agents", prod: "Guaranteed Pydantic contract compliance", level: "Expert" },
    ],
  },
  {
    id: "BACKEND",
    title: "Backend & Concurrency",
    description: "High-throughput APIs, asynchronous microservices, and concurrency-safe persistence.",
    skills: [
      { name: "Python", prod: "Daily driver for AI/ML and microservices", level: "Expert" },
      { name: "FastAPI", prod: "Async microservices across Jio and OCTS", level: "Expert" },
      { name: "PostgreSQL", prod: "Advisory locks & RLS in Shivalaya & OCTS", level: "Expert" },
      { name: "SQLAlchemy & Alembic", prod: "Zero-loss schema migrations in production", level: "Advanced" },
      { name: "PostgreSQL Advisory Locks", prod: "Concurrency-safe room booking transactions", level: "Expert" },
      { name: "JWT OAuth2", prod: "Secured enterprise endpoints at Jio", level: "Advanced" },
      { name: "REST APIs & WebSockets", prod: "Real-time kitchen order queue updates", level: "Expert" },
    ],
  },
  {
    id: "FRONTEND",
    title: "Modern Frontend",
    description: "Responsive, high-aesthetic web interfaces, real-time queues, and state orchestration.",
    skills: [
      { name: "React 18", prod: "Guest portal, Reception dashboard, OCTS UI", level: "Expert" },
      { name: "TypeScript", prod: "Type-safe client platforms at Shivalaya", level: "Advanced" },
      { name: "Tailwind CSS", prod: "Pixel-perfect modern glassmorphism", level: "Expert" },
      { name: "Vite", prod: "Blazing fast dev & optimized production builds", level: "Expert" },
      { name: "Supabase Realtime", prod: "Live WebSocket subscriptions for order updates", level: "Advanced" },
      { name: "WebSockets & Event Streams", prod: "Sub-100ms UI sync across kitchen & front desk", level: "Advanced" },
      { name: "HTML5 / Modern CSS", prod: "Keyframe animations & 3D tilt physics", level: "Expert" },
    ],
  },
  {
    id: "DEVOPS",
    title: "DevOps & Zero-Trust Cloud",
    description: "Containerization, VPN meshes, CI/CD automation, and Linux administration.",
    skills: [
      { name: "Docker & Compose", prod: "Containerized microservice fleets at Jio & OCTS", level: "Expert" },
      { name: "Tailscale VPN Mesh", prod: "Zero public attack surface for OCTS portal", level: "Advanced" },
      { name: "Azure DevOps CI/CD", prod: "Automated pipelines deploying to Linux VMs", level: "Advanced" },
      { name: "Nginx Reverse Proxy", prod: "SSL termination & proxying for Docker services", level: "Advanced" },
      { name: "Linux Administration", prod: "Production VM setup, systemd services & logs", level: "Advanced" },
      { name: "Vercel Edge Network", prod: "Global deployment for Shivalaya guest portal", level: "Advanced" },
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: "NVIDIA Deep Learning Institute",
    subtitle: "Fundamentals of Deep Learning & Neural Network Architectures",
    tag: "NVIDIA DL",
    highlight: "Computer Vision & Transformer Core Concepts",
  },
  {
    title: "Microsoft Azure Fundamentals",
    subtitle: "Azure Cloud Infrastructure & AI Workloads (AZ-900 / AI-900)",
    tag: "MICROSOFT",
    highlight: "Enterprise Cloud Architecture",
  },
  {
    title: "Reliance Jio AI/ML Performance Recognition",
    subtitle: "Recognized for architecting production RAG & Agentic AI MCP Framework",
    tag: "RELIANCE JIO",
    highlight: "Enterprise Production Delivery",
  },
  {
    title: "Commercial Platform Engineering Delivery",
    subtitle: "Sole developer of 3 live client applications in active commercial use",
    tag: "CLIENT PROD",
    highlight: "₹1,17,000 Live Commercial Contract",
  },
];

export const PERSONAL_SPECS = [
  { label: "FULL NAME", value: "Abhayraj Singh" },
  { label: "CURRENT ROLES", value: "AI/ML Intern @ Reliance Jio · Solo Dev @ Shivalaya Resorts" },
  { label: "DEGREE & COLLEGE", value: "B.Tech Computer Engineering · K. J. Somaiya College of Engineering, Mumbai" },
  { label: "GRADUATION YEAR", value: "2028 (Combining academic rigor with active production software engineering)" },
  { label: "BASE LOCATION", value: "Navi Mumbai & Mumbai, Maharashtra, India" },
  { label: "WORK AVAILABILITY", value: "Immediate (Zero Notice Period) · Open to Remote & Engineering Roles" },
  { label: "LANGUAGES", value: "English (Fluent), Hindi (Native), Marathi (Working)" },
  { label: "SPECIALIZATION", value: "Agentic AI (MCP), RAG Systems, QLoRA, High-Concurrency Full-Stack" },
];
