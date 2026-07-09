# Aryan Art Gallery Web Application

A premium, elegant, and production-ready web application built for **Aryan Art Gallery** using the latest Next.js 15+ App Router, React 19, Tailwind CSS v4, Framer Motion, and Prisma ORM.

---

## 🏛️ Branding & Design Guidelines

- **Gallery Name**: Aryan Art Gallery
- **Primary Color Accent**: Burgundy `#5C1414` (Light Mode: warm cream backdrop, Dark Mode: deep charcoal and gold accents)
- **Typography**: `Cormorant Garamond` (classic serif for headings) paired with `Inter` (sans-serif for body descriptions and forms)
- **Aesthetic**: Minimalist luxury museum inspired, with fluid page transitions, card hover scales, and image magnifiers.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15+, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Database & Backend**: PostgreSQL, Prisma ORM, Route Handlers (Next.js APIs)
- **Security & SEO**: Rate Limiting middleware, XSS input sanitization, CSRF origin verification, HTTP security headers, metadata layouts, dynamic sitemap, and robots.txt.

---

## 📁 Project Architecture & Directory Layout

The codebase implements a clean, scalable production folder architecture:

- `/app` - Next.js page routes, layouts, and API endpoints.
  - `/api/search` - Live query index search API (artists & subjects).
  - `/api/enquiry` - Artwork inquiry endpoint with validation, CSRF, and rate-limiting.
  - `sitemap.ts` & `robots.ts` - Search engine optimization.
- `/components` - Reusable UI widgets and layout headers/footers.
  - `/Layout` - Sticky Navbar and Footer blocks.
  - `SearchModal` - Keyboard-accessible live search module.
  - `EnquiryModal` - Inquiry form panel with validation and API hooks.
  - `ImageZoom` - Cursor magnifier lens + click full screen zoom lightbox.
  - `ThemeProvider` - Next-themes visual mode provider (Light/Dark).
- `/prisma` - Database schema models and seed datasets.
- `/lib` - Helper modules (Prisma client, rate limiter, security helper, Tailwind utility).
- `/services` - Database service layer with automatic mock fail-safes.
- `/hooks` - Custom debouncer hook.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ or v20+
- **NPM** or **PNPM** installed
- A **PostgreSQL** database instance (e.g. Neon, Supabase, Vercel Postgres, or Docker)

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
# PostgreSQL Database URLs (Prisma connection)
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?schema=public"
DIRECT_URL="postgresql://username:password@hostname:5432/database_name?schema=public"

# Google Maps Destination Link
NEXT_PUBLIC_GOOGLE_MAPS_URL="https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London"

# Production deployment URL (for sitemaps and search engines)
NEXT_PUBLIC_SITE_URL="https://aryanartgallery.com"
```

### 3. Database Initialization & Seeding
Initialize your database schema and run the seed script to populate mock artists, artworks, exhibitions, events, publications, and press articles:

```bash
# Generate the local Prisma Client types
npx prisma generate

# Apply migrations to prepare database schemas
npx prisma db push

# Execute the seed data script
npx prisma db seed
```

### 4. Running the Development Server

```bash
# Install dependencies (if needed)
npm install

# Launch NextJS hot-reloading development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the application.

---

## 🧪 Testing and Quality Checks

Ensure production builds and compilation schemas compile without warnings:

```bash
# Run TypeScript compilation checks
npx tsc --noEmit

# Run project linting checks
npm run lint

# Build production bundle
npm run build
```

---

## 🛡️ Resilience & Fail-safes
To ensure high developer experience and cloud preview deployments (e.g., Vercel previews), the gallery features an automatic database fail-safe. If no `DATABASE_URL` is set or the query fails, the application **automatically falls back to a mock file dataset**. The application will never crash on build or start, and will seamlessly transition to PostgreSQL once the environment variables are active.
