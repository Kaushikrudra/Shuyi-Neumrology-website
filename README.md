# ✨ Shuyi (数意) — Numerology & Tarot Exploration Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4-purple?style=flat-square&logo=next.js)](https://next-auth.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

> **Harmonizing ancient numerological mathematics with reflective tarot symbolism and timeless editorial design.**

**Shuyi** is a modern, privacy-focused digital platform designed for personal introspection, archetypal discovery, and dynamic content publishing. By combining traditional Pythagorean and Chaldean reduction algorithms with tarot archetype symbolism, Shuyi delivers a quiet, high-precision environment for exploring Life Paths, Destiny Expression, and Soul Urge frequencies without noisy sensationalism or data harvesting.

---

## 📑 Table of Contents

- [✨ Shuyi (数意) — Numerology \& Tarot Exploration Platform](#-shuyi-数意--numerology--tarot-exploration-platform)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌌 Vision \& Philosophy](#-vision--philosophy)
  - [⚡ Core Features \& Release Phases](#-core-features--release-phases)
    - [Phase 1: Foundations \& Design Language](#phase-1-foundations--design-language)
    - [Phase 2: Editorial Atmosphere \& Full-Bleed Experience](#phase-2-editorial-atmosphere--full-bleed-experience)
    - [Phase 3: Interactive Calculation Engine](#phase-3-interactive-calculation-engine)
    - [Phase 4: User Authentication \& Personal Dashboard](#phase-4-user-authentication--personal-dashboard)
    - [Phase 5: Membership Tiers \& Simulated Upgrade Flow](#phase-5-membership-tiers--simulated-upgrade-flow)
    - [Phase 6: Admin Dashboard \& Content Management (RBAC)](#phase-6-admin-dashboard--content-management-rbac)
    - [Phase 7: Drag-and-Drop CMS Mini-version \& Dynamic Publishing](#phase-7-drag-and-drop-cms-mini-version--dynamic-publishing)
  - [🔢 Numerology Calculation Engine](#-numerology-calculation-engine)
    - [1. Pythagorean Letter Conversion Chart](#1-pythagorean-letter-conversion-chart)
    - [2. Life Path Number](#2-life-path-number)
    - [3. Expression (Destiny) Number](#3-expression-destiny-number)
    - [4. Soul Urge (Heart's Desire) Number](#4-soul-urge-hearts-desire-number)
    - [5. Master Numbers (11, 22, 33)](#5-master-numbers-11-22-33)
  - [🧱 CMS Block Architecture \& Publishing System](#-cms-block-architecture--publishing-system)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📂 Project Architecture](#-project-architecture)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Database Synchronization](#database-synchronization)
    - [Running Development Server](#running-development-server)
    - [Production Build \& Verification](#production-build--verification)
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
- **Modular Content Management:** Intuitive drag-and-drop page creation for editorial insights, articles, and landing pages.

---

## ⚡ Core Features & Release Phases

### Phase 1: Foundations & Design Language
- **Dual Theme System:** System-aware Light and Dark mode with instantaneous zero-flicker client hydration and local persistence.
- **Celestial Astrolabe Visual (`NumerologyHeroAnimation`):** Multi-layered concentric SVG astrolabe featuring orbiting numerology glyphs, cardinal axis indicators, and counter-rotating sacred geometry.
- **Accessible UI Primitives:** Standardized, reusable components for buttons, input fields, cards, modals, and animated accordions.

### Phase 2: Editorial Atmosphere & Full-Bleed Experience
- **Full-Bleed Video Hero Section:** Seamless edge-to-edge cinematic video layer with atmospheric ambient gradients and dark readability overlays.
- **About Page (`/about`):** Detailed mission, core values (Mindful Simplicity, Respect for Archetypes, Privacy by Default), and methodology breakdown.
- **FAQ Page (`/faq`):** Interactive accordion interface explaining Pythagorean math, master numbers, and data privacy.

### Phase 3: Interactive Calculation Engine
- **Dedicated Interactive Route (`/preview`):**
  - **Dynamic Input Form:** Name and Birth Date fields with instant client-side validation.
  - **Simulated Intuitive Synthesizer:** Smooth visual state transition guiding the user through reduction steps.
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
- **Simulated Checkout Modal:** Zero-risk, instant upgrade experience updating user membership tier in the SQLite database (`/api/user/upgrade`).
- **Dashboard Synchronization:** Dynamic plan badge indicators (`Free`, `Premium`, `Lifetime`) and personalized upgrade links.

### Phase 6: Admin Dashboard & Content Management (RBAC)
- **Role-Based Access Control (RBAC):** Strict hierarchy (`admin`, `editor`, `user`) enforced across Next.js edge middleware and server routes.
- **Central Admin Dashboard (`/admin`):** Executive overview with member plan distributions, recent registration tracking, and quick management links.
- **User Directory Management (`/admin/users`):** Admin-only controls for searching users, updating membership plans, and promoting/demoting staff roles.
- **Dynamic FAQ Content Management (`/admin/content`):** Live CRUD interface for public accordion items stored in SQLite.
- **Sitewide Announcement Banners (`/admin/banners`):** Emergency broadcasts, promotional banners, and status alerts displayed above the hero.

### Phase 7: Drag-and-Drop CMS Mini-version & Dynamic Publishing
- **Native HTML5 Drag-and-Drop Editor (`/admin/pages/[id]/edit`):** Reorder content blocks natively without heavy third-party npm libraries.
- **Modular Block System:**
  - 📝 **Text Block:** Section headings and formatted multiline body paragraphs.
  - 🖼️ **Image Block:** Direct URL pasting, caption annotations, and accessible alt-text with live thumbnail preview.
  - ⚡ **Call-to-Action (CTA) Block:** Compelling headlines and styled buttons linking to internal tools or external resources.
- **Draft vs. Published Workflow:** Explicit draft preservation with one-click live publishing and unpublishing.
- **Live Visual Preview:** In-editor preview toggle rendering the exact visitor view before changes go live.
- **Dynamic Public Route (`app/[slug]/page.tsx`):** SEO-friendly public page rendering with automatic 404 protection for drafts and reserved route protection.
- **Footer Showcase:** Dynamic integration displaying published editorial pages in the website footer.

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

## 🧱 CMS Block Architecture & Publishing System

Each CMS page stores blocks as an array of JSON objects inside the `CmsPage` table:

```typescript
export interface CmsBlock {
  id: string;
  type: 'text' | 'image' | 'cta';
  content: Record<string, any>;
  order: number;
}
```

```prisma
model CmsPage {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  blocks      String   // JSON string of block array
  status      String   @default("draft") // "draft" | "published"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- **Reordering:** Dragging cards updates the `order` index via native browser drag events (`dragstart`, `dragover`, `drop`). Accessible `↑` and `↓` buttons provide fallback ordering.
- **Routing:** Any published page is instantly accessible at `https://your-domain.com/[slug]`. If a page is in `draft` status or does not exist, Next.js triggers a clean 404 (`notFound()`).

---

## 🛠️ Tech Stack

- **Core Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Dynamic Client Boundaries)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) with local [SQLite](https://www.sqlite.org/) (`dev.db`)
- **Authentication:** [NextAuth.js v4](https://next-auth.js.org/) (Credentials Provider, JWT Sessions, RBAC)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with custom CSS Theme Variables
- **Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Serif) & [Inter](https://fonts.google.com/specimen/Inter) (Sans)
- **Animations:** CSS3 3D Transforms, Hardware-accelerated Keyframes, SVG Astrolabe Engine
- **Linting & Code Quality:** ESLint with Next.js Core Web Vitals configuration

---

## 📂 Project Architecture

```plaintext
shuyi-numerology-website/
├── app/
│   ├── [slug]/                   # Dynamic Public Route for Published CMS Pages (Phase 7)
│   │   └── page.tsx
│   ├── about/                    # About & Philosophy Page
│   │   └── page.tsx
│   ├── admin/                    # Admin Portal (Phase 6 & 7)
│   │   ├── banners/              # Announcement Banner Management
│   │   ├── content/              # Dynamic FAQ Management
│   │   ├── pages/                # CMS Page Listing & Creator
│   │   │   ├── [id]/edit/        # Drag-and-Drop Block Editor & Live Preview
│   │   │   └── page.tsx
│   │   ├── users/                # User & Role Management (Admin only)
│   │   ├── layout.tsx            # Admin authentication & RBAC boundary
│   │   └── page.tsx              # Analytics dashboard & metrics overview
│   ├── api/
│   │   ├── admin/                # Secure admin endpoints (Banners, FAQ, Users, CMS)
│   │   ├── auth/                 # NextAuth handlers & signup
│   │   └── user/upgrade/         # Membership upgrade endpoint
│   ├── dashboard/                # User account portal
│   ├── faq/                      # Public FAQ page
│   ├── login/ & signup/          # Authentication flows
│   ├── preview/                  # Numerology calculation engine
│   ├── pricing/                  # Membership plans & upgrade modal
│   ├── globals.css               # Theme variables & GPU animations
│   ├── layout.tsx                # Root layout with Header & Footer
│   └── page.tsx                  # Full-bleed Video Hero Homepage
├── components/
│   ├── admin/                    # Admin sidebar, table, and editor components
│   ├── cms/                      # Shared public block renderer
│   ├── layout/                   # Global Header & Footer
│   └── ui/                       # Accessible design system primitives
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── auth-utils.ts             # RBAC role checking helpers
│   ├── cms-types.ts              # CMS block interfaces & slugification
│   ├── numerology.ts             # Pythagorean calculation engine
│   └── prisma.ts                 # Prisma Client singleton
├── prisma/
│   ├── schema.prisma             # User, FaqItem, Banner, CmsPage models
│   └── dev.db                    # Local SQLite database
├── middleware.ts                 # Next.js edge route protection & RBAC
├── public/                       # Favicons, posters, videos
├── scripts/                      # Seed & management utilities
├── package.json
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

### Database Synchronization
Generate the Prisma Client and sync the SQLite database:
```bash
npx prisma db push
npx prisma generate
```

### Running Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Verification
Build the optimized production bundle and verify all routes:
```bash
npm run build
npm run lint
npm start
```

---

## 🎨 Performance & Engineering Highlights

1. **Native Drag & Drop:** Pure browser HTML5 Drag and Drop API avoids heavy third-party dependencies, keeping bundle sizes under 100kB First Load JS.
2. **GPU Acceleration:** All continuous rotation and pulsing animations use `translate3d(0,0,0)`, `will-change: transform`, and `backface-visibility: hidden` for 60fps rendering.
3. **Edge Route Protection:** Low-latency Next.js edge middleware checks user session and role tokens before page rendering begins.
4. **Resilient Public Routing:** Automatic reserved-route checking prevents CMS pages from accidentally shadowing system endpoints like `/login`, `/admin`, or `/pricing`.

---

## 🔒 Privacy & Security by Design

- **Role-Based Security:** Administrative endpoints require explicit `admin` or `editor` session privileges.
- **Local-First Numerology:** Client-side calculation ensures sensitive birth dates and personal names remain private.
- **Zero Third-Party Trackers:** No tracking pixels, external ad networks, or telemetry scripts.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

*Designed and developed with mathematical precision and timeless aesthetics by [Kaushikrudra](https://github.com/Kaushikrudra).*
