import React, { useState } from "react";
import { Play, RotateCcw, CheckCircle2, Cpu, Terminal, ArrowRight, Activity, Zap, Server, Shield } from "lucide-react";
import TiltCard from "./TiltCard";
import RevealMotion from "./RevealMotion";
import { playSimulationPulse, playClick, playHover, playSuccess } from "../utils/audioSynth";

const PIPELINES = [
  {
    id: "rag",
    name: "Cisco Enterprise RAG Pipeline",
    category: "RELIANCE JIO AI/ML",
    icon: Cpu,
    defaultQuery: "How to configure OSPF multi-area routing with BGP fallback on Cisco Catalyst 9000?",
    stages: [
      {
        name: "1. PyMuPDF Ingestion & Heading Detection",
        metric: "14 ms",
        detail: "Hierarchy-aware font size heading detection splits 35-page manual into structured semantic chunks.",
        output: "Extracted 18 semantic nodes with breadcrumbs [Cisco_Catalyst_9k > Routing_Protocols > OSPF_BGP]",
      },
      {
        name: "2. 8-Category Domain Router",
        metric: "8 ms",
        detail: "FastAPI domain classifier maps incoming query to specific routing topology sub-index.",
        output: "Routed to: [CAT_ROUTING_OSPF_BGP] (Confidence: 97.4%)",
      },
      {
        name: "3. FAISS Vector Retrieval (768-dim)",
        metric: "32 ms",
        detail: "Dense embedding cosine similarity search against quantized FAISS Index FlatIP.",
        output: "Top-3 chunks retrieved. Cosine similarity: 0.892 (Passed threshold >= 0.30)",
      },
      {
        name: "4. QLoRA Llama 3.2 GGUF Inference",
        metric: "140 ms",
        detail: "Fine-tuned Llama 3 on Cisco network syntax, served via llama.cpp in Ollama on Linux VM.",
        output: "Generated zero-hallucination syntax: `router ospf 1 -> network 10.0.0.0 0.255.255.255 area 0` with BGP route-map failover.",
      },
    ],
    finalResult: {
      type: "CODE_CONFIG",
      title: "Generated Production Cisco Configuration (Zero Hallucination)",
      code: `! Cisco Catalyst 9000 OSPF & BGP Redistribution
router ospf 1
 router-id 192.168.1.1
 network 10.10.0.0 0.0.255.255 area 0
 redistribute bgp 65000 subnets route-map BGP_TO_OSPF
!
route-map BGP_TO_OSPF permit 10
 match ip address prefix-list BGP_EXPORT
 set metric 20
 set metric-type type-2`,
      stats: { latency: "194ms total", confidence: "98.2%", vectorDim: "768-dim", model: "Llama 3.2 (QLoRA 4-bit GGUF)" },
    },
  },
  {
    id: "mcp",
    name: "SLIM + MCP Agentic Framework",
    category: "RELIANCE JIO NETWORK AUTOMATION",
    icon: Zap,
    defaultQuery: "Parse voice meeting transcript, extract high-priority network action items, and assign Jira tickets.",
    stages: [
      {
        name: "1. Runtime MCP Server Discovery",
        metric: "18 ms",
        detail: "Agent queries MCP registry service at runtime—no static hardcoded tool manifests required.",
        output: "Discovered 4 active MCP tool servers: [AudioTranscribe, LangGraphMeetingDAG, JiraDispatcher, NetScanner]",
      },
      {
        name: "2. Dynamic Schema Validation",
        metric: "11 ms",
        detail: "Validates JSON Schema signatures and binds parameter models using Pydantic contracts.",
        output: "Bound tools: `meeting_summarizer(transcript: str, priority_filter: str)`",
      },
      {
        name: "3. LangGraph Cyclic State Loop",
        metric: "88 ms",
        detail: "Stateful graph passes through Plan -> Execute Tool -> Synthesize -> Self-Correct loops.",
        output: "Graph executed 3 cycles. Extracted 4 action items, 3 assignees, and 2 deployment deadlines.",
      },
      {
        name: "4. Structured JSON Payload Generation",
        metric: "26 ms",
        detail: "Guaranteed Pydantic compliance ensures structured downstream pipeline consumption.",
        output: "Successfully dispatched payload to FastAPI backend microservice.",
      },
    ],
    finalResult: {
      type: "JSON_PAYLOAD",
      title: "LangGraph Agentic Structured Intelligence Output",
      code: `{
  "meeting_id": "JIO-NET-2026-04-12",
  "summary": "Core fiber cut near Belapur resolved; failover router migration planned.",
  "action_items": [
    {
      "task": "Deploy OSPF failover patch on VM fleet 4",
      "assignee": "Abhayraj Singh",
      "priority": "P0_CRITICAL",
      "deadline": "2026-04-14T18:00:00Z"
    },
    {
      "task": "Run FAISS vector index re-embedding",
      "assignee": "Network Automation Team",
      "priority": "P1_HIGH",
      "deadline": "2026-04-16T12:00:00Z"
    }
  ]
}`,
      stats: { latency: "143ms total", protocol: "MCP 1.0 JSON-RPC", stateEngine: "LangGraph State Machine", schema: "Strict Pydantic" },
    },
  },
  {
    id: "hospitality",
    name: "Shivalaya Real-Time Hospitality Ecosystem",
    category: "LIVE CLIENT CONTRACT (₹1,17,000)",
    icon: Server,
    defaultQuery: "Guest in Cottage 04 scans QR & orders Kumaoni Mountain Trout + evening bonfire reservation.",
    stages: [
      {
        name: "1. Guest Portal Order Dispatch",
        metric: "45 ms",
        detail: "React 18 + TypeScript web app sends encrypted order payload to Supabase database.",
        output: "Order #SHV-8821 created: 1x Trout Dinner, 1x Bonfire (Cottage 4)",
      },
      {
        name: "2. Concurrency-Safe PostgreSQL Advisory Lock",
        metric: "12 ms",
        detail: "Executes `pg_try_advisory_xact_lock(cottage_id)` to prevent concurrent booking conflicts.",
        output: "Transaction lock acquired: Slot confirmed without double-booking risk.",
      },
      {
        name: "3. Supabase Realtime Kitchen Queue Sync",
        metric: "28 ms",
        detail: "WebSocket broadcast pushes new ticket to Kitchen Display System (KDS) and plays audio chime.",
        output: "KOT auto-printed to kitchen thermal printer; kitchen staff alerted.",
      },
      {
        name: "4. Automated WhatsApp Webhook Notification",
        metric: "940 ms",
        detail: "Supabase pg_net triggers webhook to Meta WhatsApp Cloud API in under 15 seconds.",
        output: "Guest WhatsApp message sent: 'Your bonfire & dinner at Shivalaya Resorts are confirmed!'",
      },
    ],
    finalResult: {
      type: "LIVE_ECOSYSTEM",
      title: "Real-Time Tri-App Synchronization Telemetry",
      code: `[GUEST PORTAL] -> Order Submitted (Cottage 4)
[POSTGRESQL]   -> Advisory Lock Acquired -> Transaction Committed (RLS Verified)
[KITCHEN KDS]  -> WebSocket Pushed -> KOT #8821 Printed to Kitchen (0.028s)
[WHATSAPP API] -> Webhook Delivered to Guest Mobile Phone (+91 98***) in 11.2s total!
STATUS: 100% SUCCESS · 3 APPS SYNCED IN ACTIVE DAILY PRODUCTION`,
      stats: { latency: "11.2s total flow", lockType: "PostgreSQL Advisory", uptime: "99.9% in Prod", contract: "₹1,17,000 Shivalaya" },
    },
  },
];

export default function SystemWorkbench() {
  const [activePipeline, setActivePipeline] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completed, setCompleted] = useState(false);

  const pipeline = PIPELINES[activePipeline];

  const handleRunSimulation = () => {
    playSimulationPulse();
    setRunning(true);
    setCurrentStep(0);
    setCompleted(false);

    // Step by step animation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipeline.stages.length) {
        setCurrentStep(step);
        playClick();
      } else {
        clearInterval(interval);
        setCurrentStep(pipeline.stages.length);
        setRunning(false);
        setCompleted(true);
        playSuccess();
      }
    }, 650);
  };

  const handleReset = () => {
    playClick();
    setRunning(false);
    setCurrentStep(-1);
    setCompleted(false);
  };

  const handleSelectPipeline = (idx) => {
    playClick();
    setActivePipeline(idx);
    setRunning(false);
    setCurrentStep(-1);
    setCompleted(false);
  };

  return (
    <section
      id="workbench"
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
        <div style={{ marginBottom: 36 }}>
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
              INTERACTIVE SYSTEM BENCH
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
                Live Architecture & Pipeline Simulator
              </h2>
              <p style={{ fontSize: 15, color: "#94A3B8", marginTop: 6, maxWidth: 640 }}>
                Test and visualize the actual production workflows I engineered at Reliance Jio and for commercial client platforms.
              </p>
            </div>

            {/* Pipeline Switcher Tabs */}
            <div
              style={{
                display: "flex",
                gap: 8,
                background: "rgba(18, 24, 36, 0.8)",
                padding: "5px 6px",
                borderRadius: 14,
                border: "1px solid rgba(45, 59, 86, 0.6)",
                flexWrap: "wrap",
              }}
            >
              {PIPELINES.map((p, idx) => {
                const Icon = p.icon;
                const isSelected = activePipeline === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPipeline(idx)}
                    onMouseEnter={playHover}
                    style={{
                      background: isSelected ? "rgba(16, 185, 129, 0.18)" : "transparent",
                      border: `1px solid ${isSelected ? "rgba(16, 185, 129, 0.5)" : "transparent"}`,
                      color: isSelected ? "#34D399" : "#94A3B8",
                      padding: "8px 14px",
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Icon size={15} />
                    <span>{p.name.split(" ")[0]} {p.name.split(" ")[1]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </RevealMotion>

      {/* Main Interactive Workbench Console */}
      <RevealMotion motionType="scaleUp" delay={120}>
        <TiltCard
          maxTilt={3}
        style={{
          background: "linear-gradient(180deg, #111827 0%, #0B101B 100%)",
          border: "1px solid rgba(45, 59, 86, 0.8)",
          borderRadius: 20,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.08)",
          overflow: "hidden",
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            padding: "14px 20px",
            background: "rgba(15, 23, 42, 0.8)",
            borderBottom: "1px solid rgba(45, 59, 86, 0.7)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>
              {pipeline.name}
            </span>
            <span style={{ fontSize: 11, background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
              {pipeline.category}
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {completed && (
              <button
                onClick={handleReset}
                onMouseEnter={playHover}
                style={{
                  background: "rgba(18, 24, 36, 0.8)",
                  border: "1px solid rgba(45, 59, 86, 0.8)",
                  color: "#94A3B8",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}

            <button
              onClick={handleRunSimulation}
              disabled={running}
              onMouseEnter={playHover}
              style={{
                background: running
                  ? "rgba(45, 59, 86, 0.8)"
                  : "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                border: "none",
                color: running ? "#94A3B8" : "#04140F",
                padding: "8px 18px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: running ? "not-allowed" : "pointer",
                boxShadow: running ? "none" : "0 0 16px rgba(16, 185, 129, 0.4)",
                transition: "all 0.2s ease",
              }}
            >
              {running ? (
                <>
                  <Activity size={15} className="spin-slow" />
                  Executing Telemetry...
                </>
              ) : (
                <>
                  <Play size={15} fill="#04140F" />
                  Run Pipeline Simulation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input Query Bar */}
        <div
          style={{
            padding: "16px 24px",
            background: "rgba(10, 14, 23, 0.7)",
            borderBottom: "1px solid rgba(31, 41, 61, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "#34D399", fontWeight: 800, fontSize: 14 }}>INPUT $</span>
          <span style={{ color: "#F8FAFC", fontSize: 14, fontFamily: "'Space Grotesk', monospace", flex: 1 }}>
            "{pipeline.defaultQuery}"
          </span>
          <span style={{ fontSize: 11, color: "#94A3B8", background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 4 }}>
            READY
          </span>
        </div>

        {/* Telemetry Stages Flowchart */}
        <div style={{ padding: "28px 24px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#94A3B8", letterSpacing: 1, marginBottom: 16 }}>
            ARCHITECTURE STAGES & DATA PACKETS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {pipeline.stages.map((stage, idx) => {
              const isPast = currentStep > idx;
              const isCurrent = currentStep === idx;
              const isWaiting = currentStep < idx;

              return (
                <div
                  key={idx}
                  style={{
                    background: isCurrent
                      ? "rgba(16, 185, 129, 0.1)"
                      : isPast
                      ? "rgba(18, 24, 36, 0.85)"
                      : "rgba(14, 20, 31, 0.4)",
                    border: `1px solid ${
                      isCurrent
                        ? "rgba(52, 211, 153, 0.6)"
                        : isPast
                        ? "rgba(45, 59, 86, 0.7)"
                        : "rgba(31, 41, 61, 0.4)"
                    }`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: 16,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isCurrent ? "0 0 20px rgba(16, 185, 129, 0.25)" : "none",
                  }}
                >
                  {/* Status Indicator Icon */}
                  <div>
                    {isPast ? (
                      <CheckCircle2 size={20} color="#34D399" />
                    ) : isCurrent ? (
                      <Activity size={20} color="#38BDF8" className="spin-slow" />
                    ) : (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: "2px dashed rgba(148, 163, 184, 0.3)",
                        }}
                      />
                    )}
                  </div>

                  {/* Stage Info */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 14.5,
                          fontWeight: 700,
                          color: isCurrent ? "#34D399" : isPast ? "#F8FAFC" : "#94A3B8",
                        }}
                      >
                        {stage.name}
                      </span>
                      {isCurrent && (
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "rgba(56, 189, 248, 0.2)",
                            color: "#38BDF8",
                            fontWeight: 800,
                          }}
                        >
                          PROCESSING
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: isWaiting ? "#64748B" : "#CBD5E1", marginTop: 4 }}>
                      {stage.detail}
                    </div>

                    {(isPast || isCurrent) && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "6px 12px",
                          borderRadius: 6,
                          background: "rgba(0, 0, 0, 0.4)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color: "#34D399",
                          borderLeft: "2px solid #10B981",
                        }}
                      >
                        {stage.output}
                      </div>
                    )}
                  </div>

                  {/* Latency Metric */}
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: 13,
                        fontWeight: 700,
                        color: isPast ? "#38BDF8" : isCurrent ? "#34D399" : "#64748B",
                        padding: "4px 8px",
                        borderRadius: 6,
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(45, 59, 86, 0.4)",
                      }}
                    >
                      {stage.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Output Telemetry Screen */}
          {(completed || currentStep === pipeline.stages.length) && (
            <div
              style={{
                marginTop: 24,
                padding: "20px 24px",
                borderRadius: 14,
                background: "rgba(7, 11, 18, 0.95)",
                border: "1px solid rgba(52, 211, 153, 0.5)",
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.15)",
                animation: "heroLetterDrop 0.5s ease both",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#34D399", letterSpacing: 0.5 }}>
                    {pipeline.finalResult.title}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#94A3B8" }}>
                  {Object.entries(pipeline.finalResult.stats).map(([k, v]) => (
                    <span key={k}>
                      <strong style={{ color: "#CBD5E1" }}>{k}:</strong> {v}
                    </span>
                  ))}
                </div>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: "14px 16px",
                  borderRadius: 8,
                  background: "#080D17",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 13,
                  color: "#E2E8F0",
                  lineHeight: 1.5,
                  overflowX: "auto",
                  border: "1px solid rgba(31, 41, 61, 0.8)",
                }}
              >
                <code>{pipeline.finalResult.code}</code>
              </pre>
            </div>
          )}
        </div>
      </TiltCard>
    </RevealMotion>
  </section>
  );
}
