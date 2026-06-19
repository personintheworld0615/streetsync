# Design System: StreetSync

## 1. Visual Theme & Atmosphere
A refined, editorial-grade interface with confident, structured layouts and a premium, warm-minimalist aesthetic. Inspired by **Notion's** clean paper-like structure and **Stripe's** bold, asymmetric grid transitions. It balances soft off-whites with deep botanical green and precise, high-contrast typography to command civic trust.

* **Density:** 4 (Airy, spacious gallery feel with generous margins)
* **Variance:** 6 (Offset, asymmetric structures with clean grids)
* **Motion:** 5 (Fluid, spring-based interactions and staggered reveals)

## 2. Color Palette & Roles
* **Canvas Off-White** (`#F9FAFB`) — Primary background surface (mimicking high-quality warm paper)
* **Warm Neutral Section** (`#F4F6F4`) — Subtle alternating section background
* **Pure Surface** (`#FFFFFF`) — Cards, tabs, and interactive containers
* **Charcoal Ink** (`rgba(9, 9, 11, 0.95)`) — Primary text and headers (Notion-inspired near-black to soften reading contrast)
* **Muted Pine** (`#4F6F52`) — Secondary text, labels, and captions
* **Brunswick Accent** (`#1B4D3E`) — Primary brand color for main CTAs and active states (Slightly warm, deep forest green)
* **Soft Mint** (`#E8F5E9`) — Background tint for highlights and high-trust status
* **Whisper Border** (`rgba(9, 9, 11, 0.08)`) — Ultra-thin 1px borders (Notion-inspired barely perceptible boundaries)

## 3. Typography Rules
* **Display & Headlines:** *Fraunces* (Serif) paired with *Satoshi/Outfit* (Sans) — Oversized, track-tight, with italic accents for key words (e.g., "Plan Your Civic *Impact*").
* **Body text:** *Satoshi/Outfit* — Relaxed line height (1.6), maximum 70 characters per line.
* **Mono/Numbers:** *Geist Mono* — For telemetry coordinates, severity scores, and trust metrics (Notion-inspired monospace metadata).
* **Banned:** *Inter* font, generic system serifs (*Georgia*, *Times New Roman*), and neon text gradients.

## 4. Hero Section Guidelines (Stripe-Inspired)
* **Layout:** Asymmetric 2-column split (Text on the left, high-fidelity app phone mockup on the right with floating metadata nodes).
* **Mockups:** High-fidelity iOS devices showcasing the CivicPulse reporting screen (voice recording active state with visual waveform, and telemetry readout).
* **CTAs:** Exactly one primary button ("Download App", Brunswick Accent fill) and one secondary action ("Partner with Us" / "Request Demo", ghost button). No generic secondary links.

## 5. Component Stylings
* **Buttons:** Flat, solid fill with a tactile `-1px` transform on active state (`transform: scale(0.97)` on press per **Emil Design Eng** principles). Card radii are sharp/restrained (`12px` max).
* **Mockups & Cards:** Rounded corners (`16px`), thin `1px` Whisper Border, and a subtle drop shadow (Notion-inspired 4-layer shadow stack with total opacity < 0.05).
* **Tab Switchers:** Flat capsules, active states indicated with a solid Brunswick Accent background or a clean underline.
* **Status Badges:** Rounded pill badges (9999px radius) with Soft Mint background and Muted Pine text (e.g., "Verified Report").

## 6. Layout Principles (Stripe-Inspired)
* **Structure:** Grid-first responsive design. No overlapping elements.
* **Features Section:** Asymmetric columns showing features (Voice Trigger, Walking Mode, Deduplication Radius) using a clean 2-column zig-zag layout or a staggered waterfall rather than standard 3-equal-cards.
* **Heights:** Hero and full sections must use `min-h-[100dvh]` to avoid mobile viewport jumping.

## 7. Motion & Interaction (Emil Design Eng Principles)
* **Transition Spring:** `stiffness: 100, damping: 20` for a weighty, premium physical feel.
* **Transitions:** Staggered waterfall reveals on sections and card entrances.
* **Hardware Acceleration:** Animations limited to `transform` and `opacity`.

## 8. Anti-Patterns (Banned)
* No emojis anywhere.
* No saturated neon blue/purple gradients or card glows.
* No sketchy or crude hand-drawn SVG doodles.
* No fake round numbers (`99.99%`).
* No copywriting clichés ("Elevate", "Seamless", "Unleash").
* No centered hero layouts.
* No 3-column equal card grids.
* No tiny uppercase tracked kicker eyebrows above every section.
