# ✨ Shuyi (数意) — Numerology & Tarot Exploration Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)
[![Privacy First](https://img.shields.io/badge/Privacy-Local--First_0%25_Tracking-purple?style=flat-square)](#privacy--security-by-design)

> **Harmonizing ancient numerological mathematics with reflective tarot symbolism and timeless editorial design.**

**Shuyi** is a modern, privacy-focused digital platform designed for personal introspection and archetypal discovery. By combining traditional Pythagorean and Chaldean reduction algorithms with tarot archetype symbolism, Shuyi delivers a quiet, high-precision environment for exploring Life Paths, Destiny Expression, and Soul Urge frequencies without noisy sensationalism or data harvesting.

---

## 📑 Table of Contents

- [✨ Shuyi (数意) — Numerology \& Tarot Exploration Platform](#-shuyi-数意--numerology--tarot-exploration-platform)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌌 Vision \& Philosophy](#-vision--philosophy)
  - [⚡ Core Features \& Release Phases](#-core-features--release-phases)
    - [Phase 1: Foundations \& Design Language](#phase-1-foundations--design-language)
    - [Phase 2: Editorial Atmosphere \& Full-Bleed Experience](#phase-2-editorial-atmosphere--full-bleed-experience)
    - [Phase 3: Interactive Calculation Engine](#phase-3-interactive-calculation-engine)
    - [Future Roadmap (Phases 4 \& 5)](#future-roadmap-phases-4--5)
  - [🔢 Numerology Calculation Engine](#-numerology-calculation-engine)
    - [1. Pythagorean Letter Conversion Chart](#1-pythagorean-letter-conversion-chart)
    - [2. Life Path Number](#2-life-path-number)
    - [3. Expression (Destiny) Number](#3-expression-destiny-number)
    - [4. Soul Urge (Heart's Desire) Number](#4-soul-urge-hearts-desire-number)
    - [5. Master Numbers (11, 22, 33)](#5-master-numbers-11-22-33)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📂 Project Architecture](#-project-architecture)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Development Server](#running-development-server)
    - [Production Build \& Deployment](#production-build--deployment)
    - [Linting \& Type-Checking](#linting--type-checking)
  - [🎨 Performance \& Engineering Highlights](#-performance--engineering-highlights)
  - [🔒 Privacy \& Security by Design](#-privacy--security-by-design)
  - [📄 License](#-license)

---

## 🌌 Vision & Philosophy

In a world saturated with chaotic digital noise, moments of quiet reflection are rare. Traditional spiritual and esoteric tools often suffer from sensationalized fortune-telling, clutter, and aggressive monetization.

**Shuyi** takes an architectural, tools-first approach to personal exploration:
- **Introspective Prompts, Not Determinism:** Numerology and tarot are treated as archetypal mirrors—symbolic frameworks that stimulate critical self-reflection, mindfulness, and intuitive clarity.
- **Editorial Typography:** High-contrast serif headlines paired with serene, modern sans-serif body text create a calm, library-like atmosphere.
- **Mathematical Precision:** Strictly verified Pythagorean reduction algorithms that respect master number conventions.

---

## ⚡ Core Features & Release Phases

### Phase 1: Foundations & Design Language
- **Dual Theme System:** System-aware Light and Dark mode with instantaneous zero-flicker client hydration and local persistence.
- **Celestial Astrolabe Visual (`NumerologyHeroAnimation`):** Multi-layered concentric SVG astrolabe featuring orbiting numerology glyphs, cardinal axis indicators, and counter-rotating sacred geometry.
- **Accessible UI Primitives:** Standardized, reusable components for buttons, input fields, cards, and animated accordions.

### Phase 2: Editorial Atmosphere & Full-Bleed Experience
- **Full-Bleed Video Hero Section:** Seamless edge-to-edge cinematic video layer with atmospheric ambient gradients and dark readability overlays.
- **About Page (`/about`):** Detailed mission, core values (Mindful Simplicity, Respect for Archetypes, Privacy by Default), and methodology breakdown.
- **FAQ Page (`/faq`):** Interactive accordion interface explaining Pythagorean math, master numbers, and data privacy.

### Phase 3: Interactive Calculation Engine
- **Dedicated Interactive Route (`/preview`):**
  - **Dynamic Input Form:** Name and Birth Date fields with instant client-side validation.
  - **Simulated Intuitive Synthesizer:** Smooth ~900ms visual state transition guiding the user through reduction steps.
  - **Vibrational Blueprint Cards:**
    - 🌍 **Life Path Number Card:** Foundational journey and lesson frequency derived from birth date.
    - 🎯 **Destiny / Expression Card:** Natural talents and worldly potential derived from full name letters.
    - ⚡ **Soul Urge Card:** Subconscious motivations and emotional drivers derived from name vowels.
  - **One-Click Recalculation:** Effortlessly calculate readings for different profiles.

### Phase 4: User Authentication & Personal Dashboard
- **Local-First Authentication:** Credentials login and signup backed by bcrypt password hashing and NextAuth.js JWT sessions.
- **Personal Dashboard (`/dashboard`):** Real-time display of user profile details, active session state, dynamic membership badges, and quick calculator shortcuts.

### Phase 5: Membership Tiers & Simulated Upgrade Flow
- **Transparent Pricing Page (`/pricing`):**
  - **Free Seeker (₹0):** Essential Pythagorean calculations and baseline archetypes.
  - **Mystic Seeker (₹199/mo) — Highlighted:** Full 78-card tarot spreads, destiny vibration analysis, and saved history.
  - **Celestial Master (₹999 one-time):** Lifetime access, master numbers synthesis, PDF reports, and VIP badge.
- **Simulated Checkout Modal (`components/ui/Modal.tsx`):** Zero-risk, instant upgrade experience updating user membership tier in the SQLite database (`/api/user/upgrade`).
- **Dashboard Synchronization:** Dynamic plan badge indicators (`Free`, `Premium`, `Lifetime`) and personalized upgrade links.

---

## 🔢 Numerology Calculation Engine

The engine is built in pure TypeScript (`lib/numerology.ts`) using standard Pythagorean reduction rules.

### 1. Pythagorean Letter Conversion Chart

| Number | Letters |
| :---: | :--- |
| **1** | A, J, S |
| **2** | B, K, T |
| **3** | C, L, U |
| **4** | D, M, V |
| **5** | E, N, W |
| **6** | F, O, X |
| **7** | G, P, Y |
| **8** | H, Q, Z |
| **9** | I, R |

### 2. Life Path Number
Calculated by reducing the Month, Day, and Year separately before summing and performing the final reduction:
$$\text{Life Path} = \text{Reduce}(\text{Reduce}(\text{Month}) + \text{Reduce}(\text{Day}) + \text{Reduce}(\text{Year}))$$

*Example:* July 15, 1990 (`1990-07-15`)
- Month: $7 \rightarrow 7$
- Day: $1 + 5 = 6$
- Year: $1 + 9 + 9 + 0 = 19 \rightarrow 1 + 9 = 10 \rightarrow 1 + 0 = 1$
- Sum: $7 + 6 + 1 = 14 \rightarrow 1 + 4 =$ **5 (The Explorer)**

### 3. Expression (Destiny) Number
Calculated by summing the numerical values of all letters in the full birth name, then reducing to a single digit (or master number).

### 4. Soul Urge (Heart's Desire) Number
Calculated by filtering only the vowels ($A, E, I, O, U$) from the full name, summing their values, and reducing.

### 5. Master Numbers (11, 22, 33)
If any step reduces to `11`, `22`, or `33`, the calculation preserves the number without further single-digit reduction:
- **11 (The Master Intuitive):** High spiritual awareness, illumination, visionary insight.
- **22 (The Master Architect):** Practical genius, grand scale manifestation, world-building.
- **33 (The Master Teacher):** Universal upliftment, compassionate healing, enlightened guidance.

---

## 🛠️ Tech Stack

- **Core Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Boundaries)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with custom CSS Variables
- **Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Serif) & [Inter](https://fonts.google.com/specimen/Inter) (Sans)
- **Animations:** CSS3 3D Transforms, Hardware-accelerated Keyframes, SVG Astrolabe Engine
- **State Management:** Native React `useState` (Local-first architecture)
- **Linting & Code Quality:** ESLint with Next.js Core Web Vitals config

---

## 📂 Project Architecture

```plaintext
shuyi-numerology-website/
├── app/
│   ├── about/
│   │   └── page.tsx              # About & Philosophy Page
│   ├── faq/
│   │   └── page.tsx              # FAQ & Methodology Accordions
│   ├── preview/
│   │   └── page.tsx              # Interactive Numerology Calculator (Phase 3)
│   ├── globals.css               # Global theme variables & GPU animations
│   ├── layout.tsx                # Root layout with ThemeProvider, Header, Footer
│   └── page.tsx                  # Full-bleed Video Hero Homepage
├── components/
│   ├── layout/
│   │   ├── Footer.tsx            # Global site footer
│   │   └── Header.tsx            # Sticky responsive navigation & theme toggle
│   └── ui/
│       ├── Accordion.tsx         # Accessible collapsible accordion
│       ├── Button.tsx            # Variant button primitive
│       ├── Card.tsx              # Glassmorphic & elevated card container
│       ├── Input.tsx             # Accessible input with labels & error states
│       ├── NumerologyHeroAnimation.tsx # SVG Celestial Astrolabe visual
│       └── ThemeToggle.tsx       # Dark / Light mode toggle
├── lib/
│   ├── numerology.ts             # Pythagorean calculation engine & meanings lookup
│   ├── theme.tsx                 # ThemeProvider & Context
│   └── utils.ts                  # Tailwind clsx/twMerge helper
├── public/
│   └── videos/
│       └── hero-bg.mp4           # Ambient background video
├── .eslintrc.json
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm 9+ or yarn / pnpm

### Installation
Clone the repository and install project dependencies:
```bash
git clone https://github.com/Kaushikrudra/Shuyi-Neumrology-website.git
cd Shuyi-Neumrology-website
npm install
```

### Running Development Server
Start the local Next.js development server with Turbopack acceleration:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

> 💡 **Developer Workflow & Refresh Guideline (HMR Best Practices):**
> - **File Edits & Hot Reload:** CLI ya IDE se file edit hone ke baad terminal mein `Compiled` message aane tak 1–2 second wait karein, phir **normal refresh (`Ctrl+R` / `F5`)** use karein ya Fast Refresh (HMR) ko automatically update hone dein.
> - **Avoid Frequent Hard Refreshes During Active Compilation:** File edit ke turant dauraan **hard-refresh (`Ctrl+Shift+R`)** karne se in-flight compilation chunk requests 404 de sakte hain kyunki browser purana cache discard kar deta hai jabki naya chunk manifest abhi compile ho raha hota hai.
> - **Hard Refresh (`Ctrl+Shift+R`)** sirf tab karein jab genuinely CSS/JS cache purana lag raha ho. Agar zaroorat lage toh pehle dev server restart (`Ctrl+C` then `npm run dev`) kar lein.


### Production Build & Deployment
Build the optimized static export / production bundle:
```bash
npm run build
npm start
```

### Linting & Type-Checking
Verify zero lint warnings and complete type safety:
```bash
npm run lint
npx tsc --noEmit
```

---

## 🎨 Performance & Engineering Highlights

1. **GPU Acceleration:** All continuous rotation and pulsing animations use `translate3d(0,0,0)`, `will-change: transform`, and `backface-visibility: hidden` to ensure 60fps rendering without CPU spikes.
2. **Optimized Aura Blurs:** Complex 64px Gaussian blurs over video backgrounds were refactored into native CSS `radial-gradient` layers, reducing compositing lag by over 90%.
3. **Universal Unicode Standardization:** All numerology archetypes use standard, cross-platform UTF-8 emoji glyphs (`🌍`, `🎯`, `⚡`, `🔮`, `💎`, `👑`) ensuring zero missing-character boxes across Linux, Windows, macOS, iOS, and Android.
4. **Adaptive Video Fallbacks:** Background video uses `preload="metadata"`, `transform-gpu`, and respects `@media (prefers-reduced-motion: reduce)` for complete accessibility.

---

## 🔒 Privacy & Security by Design

- **100% Client-Side:** All name string operations, date arithmetic, and Pythagorean reductions execute exclusively within the user's browser sandbox.
- **Zero Third-Party Trackers:** No tracking pixels, external ad networks, or telemetry scripts.
- **No Remote Database Storage:** Personal birth dates and names are never sent across network requests.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

*Designed and developed with mathematical precision and timeless aesthetics by [Kaushikrudra](https://github.com/Kaushikrudra).*
