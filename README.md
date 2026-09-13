# ✨ Shuyi (数意) — Sacred Numerology, Tarot Exploration & Drag-and-Drop CMS Platform

> **A full-stack, editorial web application harmonizing ancient Pythagorean mathematical algorithms with reflective tarot archetypes, role-based administration, and a modular block-based CMS.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4-purple?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Local_DB-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![Recharts](https://img.shields.io/badge/Recharts-Analytics-22c55e?style=for-the-badge)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](#license)

---

## 📖 Overview

**Shuyi (数意)** is a modern, privacy-first digital sanctuary designed for introspective numerological inquiry, tarot contemplation, and custom editorial publishing. 

Unlike conventional fortune-telling sites that rely on loud ads, deterministic claims, or telemetry tracking, Shuyi treats numbers as archetypal mirrors. Combining traditional Pythagorean reduction mathematics with clean editorial typography and an intuitive drag-and-drop block CMS, Shuyi provides an atmospheric, library-like experience built with modern web standards.

---

## ⚡ Core Features & Capabilities

### 🔢 1. Interactive Pythagorean Numerology Engine
- **Life Path Calculation:** Reduces birth year, month, and day independently before final synthesis.
- **Destiny (Expression) Analysis:** Sums full name characters using standard Pythagorean letter-to-digit conversion.
- **Soul Urge Frequency:** Isolates vowel resonance ($A, E, I, O, U$) to decode intrinsic subconscious drivers.
- **Master Number Preservation:** Accurately identifies and honors higher-octave master numbers (`11`, `22`, `33`) without single-digit reduction.
- **Client-Side Calculation Sandbox:** 100% private in-browser math execution—no personal birth data is sent over the network.

### 🔐 2. Authentication & Personal Sanctuary
- **Credentials-Based Auth:** Secure registration and login backed by bcrypt password hashing and NextAuth.js JWT sessions.
- **Member Dashboard (`/dashboard`):** Real-time profile details, active session management, tier badges, and quick calculator actions.

### 💳 3. Multi-Tier Membership & Simulated Upgrades
- **Tiered Offerings:**
  - **Free Seeker (₹0):** Fundamental Pythagorean calculations and core archetype summaries.
  - **Mystic Seeker (₹199/mo):** Full 78-card tarot arcana spreads and destiny synthesis.
  - **Celestial Master (₹999 Lifetime):** Lifetime access, master numbers synthesis, VIP badge, and PDF exports.
- **Zero-Risk Checkout Flow:** Interactive upgrade modal with instant database tier synchronization via `/api/user/upgrade`.

### 🛡️ 4. Role-Based Admin Portal & Metrics
- **Multi-Level Authorization (RBAC):** Strict hierarchy (`admin`, `editor`, `user`) protected at the edge via Next.js middleware.
- **Executive Analytics (`/admin`):** Visual membership distribution charts powered by Recharts, user counts, and system metrics.
- **User Directory (`/admin/users`):** Admin-exclusive table with live search, role elevation/demotion, and plan modifications.
- **Dynamic Content & FAQ Management (`/admin/content`):** Real-time CRUD operations for public accordion items stored in SQLite.
- **Sitewide Announcement Banners (`/admin/banners`):** Emergency broadcasts and promotional strips displayed prominently above the hero.

### 🧱 5. Native Drag-and-Drop Block CMS Mini-Version
- **Pure Browser Drag-and-Drop:** Native HTML5 Drag and Drop API (`draggable`, `dragover`, `drop`) for block reordering without heavy third-party bundle weight.
- **Accessible Fallbacks:** Keyboard/mobile-friendly Move Up (`↑`) and Move Down (`↓`) controls.
- **Modular Block Types:**
  - 📝 **Text Block:** Section headings and formatted multiline body paragraphs.
  - 🖼️ **Image Block:** URL embedding with caption annotations, alt-text, and live thumbnail previews.
  - ⚡ **Call-to-Action (CTA) Block:** Customizable headlines and themed action buttons linking to internal tools or external URLs.
- **Draft & Publish Workflow:** Explicit draft preservation with one-click live publishing and unpublishing.
- **Live In-Editor Preview:** Instant split-free visual preview mode rendering exact public typography and styles.
- **Dynamic Public Route (`/[slug]`):** Dynamic publishing with automatic 404 handling for draft states and system-reserved slugs.

### 🎨 6. Design System & Accessibility
- **Dual Mode System:** System-aware Light & Dark themes with zero hydration flicker and local persistence.
- **Celestial Astrolabe Visual:** Multi-layered concentric SVG astrolabe with orbiting glyphs and counter-rotating sacred geometry.
- **Responsive Layouts:** Mobile drawers, responsive tables with horizontal scroll wrappers, and accessible ARIA attributes across all forms.
- **Resilient Error Handling:** Custom 404 page, root error boundary (`app/error.tsx`), and automated loading skeletons across all routes.

---

## 🖼️ Application Preview & Screenshots

> *Add your screenshots to the `./screenshots/` directory to display them here.*

| Homepage & Full-Bleed Video Hero | Interactive Calculator (`/preview`) |
| :---: | :---: |
| ![Homepage](./screenshots/homepage.png) | ![Calculator](./screenshots/preview-calculator.png) |

| Member Dashboard (`/dashboard`) | Membership & Pricing (`/pricing`) |
| :---: | :---: |
| ![Dashboard](./screenshots/dashboard.png) | ![Pricing](./screenshots/pricing.png) |

| Admin Dashboard & Analytics (`/admin`) | Drag-and-Drop CMS Editor (`/admin/pages/[id]/edit`) |
| :---: | :---: |
| ![Admin Dashboard](./screenshots/admin-dashboard.png) | ![CMS Editor](./screenshots/cms-editor.png) |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Dynamic Client Boundaries)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Type Safety)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with semantic CSS theme variables
- **Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Serif Headlines) & [Inter](https://fonts.google.com/specimen/Inter) (Sans Body)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) paired with local [SQLite](https://www.sqlite.org/) (`prisma/dev.db`)
- **Authentication:** [NextAuth.js v4](https://next-auth.js.org/) (Credentials Provider with bcrypt password hashing & JWT tokens)
- **Data Visualization:** [Recharts](https://recharts.org/) (Plan distribution charts)
- **SEO & Routing:** Next.js Dynamic Metadata, OpenGraph & Twitter Cards, `sitemap.ts`, and `robots.ts`

---

## 📂 Project Structure

```plaintext
shuyi-numerology-website/
├── app/
│   ├── [slug]/                   # Dynamic Public CMS Pages Route
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── about/                    # About & Philosophy Page
│   ├── admin/                    # Admin Portal
│   │   ├── banners/              # Announcement Banners Management
│   │   ├── content/              # Dynamic FAQ Management
│   │   ├── pages/                # CMS Page Listing & Creator
│   │   │   ├── [id]/edit/        # Drag-and-Drop Block Editor & Live Preview
│   │   │   └── page.tsx
│   │   ├── users/                # User & Role Directory (Admin only)
│   │   ├── layout.tsx            # Admin authentication & RBAC boundary
│   │   ├── loading.tsx           # Admin loading skeleton
│   │   └── page.tsx              # Analytics dashboard & metrics overview
│   ├── api/
│   │   ├── admin/                # Secure Admin API endpoints (Banners, FAQ, Users, CMS)
│   │   ├── auth/                 # NextAuth route handler & signup endpoint
│   │   └── user/upgrade/         # Membership upgrade handler
│   ├── dashboard/                # User Account & Sanctuary Portal
│   ├── faq/                      # Public FAQ & Methodology
│   ├── login/ & signup/          # Authentication pages
│   ├── preview/                  # Interactive Numerology Calculator
│   ├── pricing/                  # Membership Tiers & Upgrade Modal
│   ├── error.tsx                 # Root Error Boundary
│   ├── globals.css               # Theme tokens & GPU keyframe animations
│   ├── layout.tsx                # Root layout with Header, Footer, SEO & OG Tags
│   ├── loading.tsx               # Global loading state
│   ├── not-found.tsx             # Custom 404 Not Found screen
│   ├── page.tsx                  # Video Hero Landing Page
│   ├── robots.ts                 # Search engine crawler policies
│   └── sitemap.ts                # Dynamic XML sitemap generator
├── components/
│   ├── admin/                    # Admin sidebar, tables, charts, and CMS editor
│   ├── cms/                      # Shared public block renderer
│   ├── layout/                   # Header & dynamic Footer showcase
│   └── ui/                       # Accessible design primitives (Button, Card, Input, Modal)
├── lib/
│   ├── auth.ts                   # NextAuth options & credentials provider
│   ├── auth-utils.ts             # Role-based authorization helpers
│   ├── cms-types.ts              # Block interfaces & slug sanitization
│   ├── numerology.ts             # Pythagorean mathematical engine
│   └── prisma.ts                 # Prisma Client singleton
├── prisma/
│   ├── schema.prisma             # User, FaqItem, Banner, CmsPage schema
│   └── dev.db                    # Local SQLite database
├── middleware.ts                 # Edge route protection & RBAC
├── public/                       # Favicons, posters, video assets
├── scripts/                      # Admin promotion & database seed utilities
└── README.md
```

---

## 🚀 Local Development Setup

Follow these steps to run Shuyi locally on your machine:

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/Kaushikrudra/Shuyi-Neumrology-website.git
cd Shuyi-Neumrology-website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a local `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-development-secret-key-replace-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Initialize Database & Seed Content
Push the Prisma schema to generate the local SQLite database and populate baseline content:
```bash
npx prisma db push
npx prisma generate
node scripts/seed-faq.mjs
```

*(Optional)* To elevate any registered account to the **Admin** role:
```bash
node scripts/make-admin.mjs <your-account-email>
```

### 6. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Verification & Production Build
To verify type correctness, linting rules, and build output:
```bash
npm run lint
npm run build
```

---

## 💡 Engineering Highlights & Case Study Reflections

### 1. Native Drag-and-Drop vs. Heavy External Libraries
- **Challenge:** Implementing an intuitive, smooth block reordering editor without inflating bundle size with heavy dependencies like `react-beautiful-dnd` or `@dnd-kit`.
- **Solution:** Utilized native HTML5 Drag and Drop APIs (`draggable`, `dragstart`, `dragover`, `drop`) synchronized with React state. Provided accessible Move Up (`↑`) and Move Down (`↓`) controls as a dual-input paradigm ensuring first-class usability on touch screens and mobile devices.

### 2. Role-Based Access Control at the Edge
- **Challenge:** Guaranteeing that non-authenticated seekers or standard users cannot access administrative views or mutate content, without adding round-trip server latency.
- **Solution:** Enforced role tokens directly in Next.js Edge Middleware (`middleware.ts`). Routes under `/admin/*` verify `admin` or `editor` status at the edge before rendering starts, while sensitive operations like user role elevation are strictly restricted to `admin` principals.

### 3. Dynamic CMS Slug Collisions & Reserved Route Shielding
- **Challenge:** Allowing administrators to create dynamic routes (`/[slug]`) without accidentally shadowing core application routes like `/pricing`, `/faq`, or `/login`.
- **Solution:** Introduced a system-level reserved slug registry (`RESERVED_SLUGS`) and automatic slug sanitization. Both the CMS API and the dynamic route handler gracefully intercept reserved words and un-published draft states with Next.js `notFound()` 404 responses.

### 4. Zero-Flicker Theme Hydration
- **Challenge:** Eliminating flash-of-unstyled-content (FOUC) when loading dark mode on client hydration.
- **Solution:** Embedded an inline, zero-dependency theme injection script inside the root `<head>` that synchronizes `localStorage` preferences and system `prefers-color-scheme` before the DOM renders.

---

## 🔒 Privacy & Security

- **Local Calculation Engine:** Sensitive birth dates and names are evaluated strictly in the user's browser runtime.
- **Zero Third-Party Trackers:** No Google Analytics, Meta Pixel, or data brokering scripts.
- **Password Security:** Credentials hashed using industry-standard `bcryptjs` salt rounds before database storage.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <em>Crafted with architectural care, mathematical precision, and timeless aesthetics by <a href="https://github.com/Kaushikrudra">Kaushikrudra</a>.</em>
</p>
