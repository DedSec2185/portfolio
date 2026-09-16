import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Maximize2, Minimize2, Sparkles, Send } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "../data/portfolioData";
import { playTerminalChirp, playClick, toggleSound, isSoundEnabled } from "../utils/audioSynth";
import { triggerConfetti } from "../utils/confetti";

const BANNER = `
   █████╗ ██████╗ ██╗  ██╗ █████╗ ██╗   ██╗██████╗  █████╗      ██╗
  ██╔══██╗██╔══██╗██║  ██║██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗     ██║
  ███████║██████╔╝███████║███████║ ╚████╔╝ ██████╔╝███████║     ██║
  ██╔══██║██╔══██╗██╔══██║██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║██   ██║
  ██║  ██║██████╔╝██║  ██║██║  ██║   ██║   ██║  ██║██║  ██║╚█████╔╝
  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ 
  [AI SOFTWARE ENGINEER · LLM & AGENTIC SYSTEMS · RELIANCE JIO]
  Type 'help' to view available system directives.
`;

export default function TerminalModal({ isOpen, onClose, onToggleMatrix }) {
  const [history, setHistory] = useState([
    { type: "banner", text: BANNER },
    { type: "system", text: "Interactive terminal initialized. Type 'help' for command list." },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playTerminalChirp();
    setCmdHistory((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const newEntries = [{ type: "command", text: `$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          text: `Available system commands:
  help        - Display this menu of available commands
  about       - Overview of background, education, and current focus
  skills      - List categorized engineering competencies & stacks
  projects    - Summary of live commercial & AI platforms
  exp         - Production experience at Reliance Jio, Shivalaya & OCTS
  agent       - Execute a simulated autonomous agent tool discovery loop
  hire        - Availability status & hiring specifications
  contact     - Phone, Email, and LinkedIn connection info
  sound       - Toggle browser Web Audio synthesizer effects
  matrix      - Toggle Cyber Matrix Digital Rain mode
  clear       - Clear the terminal screen
  exit        - Close the terminal window`,
        });
        break;

      case "about":
        newEntries.push({
          type: "output",
          text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}
Base: ${PERSONAL_INFO.location}
Degree: ${PERSONAL_INFO.education.degree}, ${PERSONAL_INFO.education.college} (Grad 2028)
Summary: ${PERSONAL_INFO.summary}`,
        });
        break;

      case "skills":
        const skillList = SKILL_CATEGORIES.map(
          (c) => `[${c.title}]:\n  ` + c.skills.map((s) => `${s.name} (${s.level})`).join(", ")
        ).join("\n\n");
        newEntries.push({ type: "output", text: skillList });
        break;

      case "projects":
        const projList = PROJECTS.map(
          (p) => `• [${p.id}] ${p.title} (${p.tag})\n  Client: ${p.client}\n  Metrics: ${p.metrics}\n  Stack: ${p.stack.join(", ")}`
        ).join("\n\n");
        newEntries.push({ type: "output", text: projList });
        break;

      case "exp":
        const expList = EXPERIENCES.map(
          (e) => `• ${e.role} @ ${e.company} (${e.period})\n  Department: ${e.department}\n  Tech: ${e.tech.join(", ")}`
        ).join("\n\n");
        newEntries.push({ type: "output", text: expList });
        break;

      case "agent":
        newEntries.push({
          type: "output",
          text: `[AGENT_DISCOVERY_LOOP]
>> Querying MCP registry service... (18ms)
>> Discovered active tools: [Cisco_Config_Parser, Faiss_Retriever, LangGraph_Worker]
>> Resolving dynamic Pydantic schema validation contracts...
>> Reasoning iteration 1: Plan multi-hop routing
>> Reasoning iteration 2: Synthesizing verified solution
>> Output: Task completed with zero manual manifest definitions!`,
        });
        break;

      case "hire":
        triggerConfetti(0.5, 0.5);
        newEntries.push({
          type: "output",
          text: `STATUS: IMMEDIATE JOINER (Zero Notice Period)
ROLES OF INTEREST: AI/ML Engineer, LLM Systems Engineer, Full-Stack Developer
LOCATIONS: Remote, Hybrid, Mumbai, Navi Mumbai, Worldwide
CONTACT: ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `EMAIL:    ${PERSONAL_INFO.email}
PHONE:    ${PERSONAL_INFO.phone}
LINKEDIN: ${PERSONAL_INFO.linkedin}
LOCATION: ${PERSONAL_INFO.location}`,
        });
        break;

      case "sound":
        const enabled = toggleSound();
        newEntries.push({
          type: "output",
          text: `Web Audio Synthesizer: ${enabled ? "ENABLED" : "MUTED"}`,
        });
        break;

      case "matrix":
        if (onToggleMatrix) onToggleMatrix();
        newEntries.push({
          type: "output",
          text: `Matrix Digital Rain toggled.`,
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newEntries.push({
          type: "error",
          text: `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdIndex(nextIdx);
          setInput(cmdHistory[nextIdx]);
        } else {
          setCmdIndex(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMaximized ? 0 : 20,
        animation: "heroLetterDrop 0.25s ease both",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: isMaximized ? "100%" : "min(880px, 95vw)",
          height: isMaximized ? "100%" : "min(580px, 85vh)",
          background: "linear-gradient(180deg, #0D131F 0%, #070B12 100%)",
          border: isMaximized ? "none" : "1px solid rgba(52, 211, 153, 0.4)",
          borderRadius: isMaximized ? 0 : 16,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Window Header */}
        <div
          style={{
            padding: "10px 18px",
            background: "rgba(18, 24, 36, 0.95)",
            borderBottom: "1px solid rgba(45, 59, 86, 0.8)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={onClose}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#EF4444",
                  border: "none",
                  cursor: "pointer",
                }}
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#F59E0B",
                  border: "none",
                  cursor: "pointer",
                }}
              />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
              <Terminal size={14} color="#34D399" />
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 12, fontWeight: 700, color: "#CBD5E1" }}>
                abhayraj@jio-core-vm: ~ (zsh)
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                padding: 4,
              }}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          style={{
            flex: 1,
            padding: "18px 22px",
            overflowY: "auto",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: 13,
            lineHeight: 1.6,
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              {item.type === "banner" && (
                <pre
                  style={{
                    color: "#34D399",
                    margin: 0,
                    fontSize: "clamp(8px, 1.2vw, 11.5px)",
                    lineHeight: 1.25,
                    fontFamily: "inherit",
                  }}
                >
                  {item.text}
                </pre>
              )}

              {item.type === "command" && (
                <div style={{ color: "#38BDF8", fontWeight: 700 }}>
                  {item.text}
                </div>
              )}

              {item.type === "output" && (
                <pre
                  style={{
                    color: "#E2E8F0",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                  }}
                >
                  {item.text}
                </pre>
              )}

              {item.type === "system" && (
                <div style={{ color: "#94A3B8", fontStyle: "italic" }}>
                  {item.text}
                </div>
              )}

              {item.type === "error" && (
                <div style={{ color: "#F87171" }}>
                  {item.text}
                </div>
              )}
            </div>
          ))}

          {/* Prompt Line */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <span style={{ color: "#34D399", fontWeight: 800 }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. 'help', 'skills', 'hire')..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F8FAFC",
                fontFamily: "inherit",
                fontSize: 13.5,
              }}
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Bottom Quick Chips */}
        <div
          style={{
            padding: "8px 16px",
            background: "rgba(10, 14, 23, 0.9)",
            borderTop: "1px solid rgba(45, 59, 86, 0.6)",
            display: "flex",
            gap: 8,
            overflowX: "auto",
          }}
        >
          {["help", "skills", "projects", "agent", "hire", "contact", "matrix", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(45, 59, 86, 0.5)",
                color: "#94A3B8",
                fontSize: 11,
                fontFamily: "inherit",
                padding: "3px 8px",
                borderRadius: 4,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
