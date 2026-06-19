# StreetSync — Frictionless Civic Infrastructure Reporting

StreetSync is a modern, design-forward platform built to bridge the gap between residents and municipal governments by removing the effort barriers of community reporting. It replaces clunky portals and phone queues with hands-free voice transcription, background GPS telemetry, and automatic report deduplication.

---

## ✨ Features

- **Voice-Activated Reporting**: Designed for transit passengers and pedestrians to report community issues hands-free.
- **Background Telemetry**: Instantly captures exact coordinates (`42.3519° N, 71.0645° W`) and visual proof upon report trigger.
- **Proximity-Based Deduplication**: Groups redundant community reports within a 15-meter geospatial radius into a single master ticket to prevent inbox clutter for municipal admins.
- **Priority Urgency Routing**: Priority queue algorithm ranks critical issues, placing mobility barriers near transit hubs at maximum urgency.
- **Interactive Stacking Cards**: A fluid scroll-driven presentation showing backend municipal dispatch intelligence.
- **Editorial Aesthetics**: Soft warm lime-minty canvas (`#F4F7E6`), crisp luxury serifs (*Cormorant Garamond*), and functional dark-green components.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4 with custom tokens
- **Animations**: Framer Motion for magnetic hover effects and scroll-driven stacked interactions
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond (display) & System Sans Stack (body)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your system.

### Install Dependencies
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

### Build for Production
```bash
npm run build
```

---

## 👥 Authors & Credits

StreetSync is developed by:
* **Aarav Garg**
* **Krish Sinha**
* **Rithvik Penmetsa**

*Developed as an entry for the 2026 Congressional App Challenge.*
