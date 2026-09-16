# Abhayraj Singh — AI Software Engineer Portfolio

> Cyberpunk-engineered, high-performance portfolio featuring interactive architecture telemetry, 3D tilt cards, Web Audio tactile synthesis, terminal HUD CLI, and full keyboard command directives (`⌘K` / `Ctrl+K`).

---

## ⚡ Tech Stack & Highlights

- **Framework**: React 18 + Vite
- **Styling**: Modern CSS Grid / Flexbox + Glassmorphism + Responsive Design
- **Animations & Interactivity**:
  - Custom bidirectional `IntersectionObserver` scroll reveals (`RevealMotion`)
  - Mouse-following interactive neural constellation canvas
  - 3D perspective glare card transforms (`TiltCard`)
  - Canvas confetti particle engine for instant contact triggers
  - Full-screen Matrix digital rain simulator
- **System Architecture Workbench**: Live telemetry simulator for enterprise AI/ML architectures (Cisco RAG, SLIM+MCP Agents, Hospitality Ecosystem).
- **Audio Synthesizer**: Zero-asset Web Audio API oscillator for tactile cyberpunk feedback (with mute switch).
- **Developer CLI Terminal**: Built-in HUD terminal (`~` / `Terminal` button) with interactive system commands (`skills`, `projects`, `agent`, `hire`, `matrix`, `sound`, `clear`).
- **Command Palette**: Directive search launcher (`Ctrl+K` / `⌘K`).

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
# -> Local server live at http://localhost:5173

# 3. Production build & validation
npm run build
```

---

## 🌐 Deploy to Vercel

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Push all changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: upgrade portfolio with interactive system workbench & cyber HUD"
   git push origin main
   ```
2. Open **[vercel.com](https://vercel.com)** and connect your GitHub account.
3. Import your `portfolio` repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy** — your live production URL is generated and automatically updates on every future `git push`!

### Option 2: Deploy via Vercel CLI
```bash
npx vercel
```

---

## 📁 Project Structure

```
portfolio-site/
├── public/
│   ├── abhayraj-jio.jpg       # Profile portrait
│   └── favicon.svg
├── src/
│   ├── components/            # Modular UI components
│   │   ├── AboutSection.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── ContactSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HeroCanvas.jsx
│   │   ├── MatrixRainCanvas.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── RevealMotion.jsx
│   │   ├── SkillsMatrix.jsx
│   │   ├── SystemWorkbench.jsx
│   │   ├── TerminalModal.jsx
│   │   └── TiltCard.jsx
│   ├── data/
│   │   └── portfolioData.js   # Centralized data store (specs, projects, timeline, skills)
│   ├── utils/
│   │   ├── audioSynth.js      # Web Audio API sound effects
│   │   └── confetti.js        # Canvas confetti generator
│   ├── Portfolio.jsx          # Root view orchestrator
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
