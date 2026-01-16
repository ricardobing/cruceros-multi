# 🏗️ Architecture Overview

Quick technical reference for code reviewers and future developers.

---

## 📐 System Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              Vercel Edge Network                │
│            (Next.js 15 Deployment)              │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│           Next.js App Router                    │
│  • Server Components (default)                  │
│  • Client Components ('use client')             │
│  • API Routes (/app/api)                        │
│  • Middleware (i18n routing)                    │
└──────────────┬──────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌─────▼──────────┐
│  Mock Data  │  │ Prisma Client  │
│  (Active)   │  │  (Configured)  │
└─────────────┘  └────────┬───────┘
                          │
                  ┌───────▼────────┐
                  │   PostgreSQL   │
                  │ (Not connected)│
                  └────────────────┘
```

---

## 🗂️ Folder Structure Explained

### `/app` - Next.js App Router

```
app/
├── [locale]/              ← Dynamic route segment for i18n
│   ├── layout.tsx         ← Root layout with Navigation/Footer
│   ├── page.tsx           ← Home: hero + SearchForm + featured cards
│   ├── excursions/
│   │   ├── page.tsx       ← Listing with filters (uses mock data)
│   │   └── [id]/
│   │       └── page.tsx   ← Detail view (uses mock data)
│   └── thank-you/
│       └── page.tsx       ← Confirmation page
└── api/                   ← API Routes (simplified for demo)
    ├── ships/route.ts     ← Returns mockShips[]
    ├── destinations/      ← Returns mockDestinations[]
    └── reservations/      ← Mock reservation handler
```

**Key Pattern:**
- All pages under `[locale]` are server components by default
- Client interactivity extracted to separate components with `'use client'`

### `/components` - Reusable UI

```
components/
├── Navigation.tsx         ← Client: language switcher, navigation
├── Footer.tsx             ← Static footer
├── SearchForm.tsx         ← Client: form with API calls
├── ExcursionCard.tsx      ← Display excursion with status badges
└── DeparturesList.tsx     ← Shows available dates for booking
```

**Pattern:** Server components by default, `'use client'` only when needed (forms, state, events).

### `/lib` - Utilities & Configuration

```
lib/
├── mockData.ts            ← Sample data (ships, destinations, excursions)
└── prisma.ts              ← Prisma client singleton (configured but not used)
```

### `/messages` - i18n Translations

```
messages/
├── en.json                ← English translations
└── es.json                ← Spanish translations
```

**Structure:**
```json
{
  "home": { "title": "...", "search": {...} },
  "excursions": { "title": "...", "noResults": "..." },
  "detail": { "backToList": "...", "description": "..." },
  "nav": { "brand": "..." }
}
```

### `/prisma` - Database Layer

```
prisma/
├── schema.prisma          ← 5 models: CruiseShip, Destination, 
│                            Excursion, Departure, Reservation
├── seed.ts                ← Seed script for sample data
└── migrations/            ← Version-controlled schema changes
```

**Models:**
- `CruiseShip` → `Departure` (one-to-many)
- `Destination` → `Excursion` (one-to-many)
- `Excursion` → `Departure` (one-to-many)
- `Departure` → `Reservation` (one-to-many)

---

## 🌍 Internationalization (i18n)

### Implementation: `next-intl`

**Flow:**

1. **Middleware** (`middleware.ts`):
   ```typescript
   // Intercepts all requests
   // Redirects / → /en or /es based on Accept-Language
   // Preserves locale in URLs
   ```

2. **Routing** (`i18n/routing.ts`):
   ```typescript
   export const routing = defineRouting({
     locales: ['en', 'es'],
     defaultLocale: 'en'
   });
   ```

3. **Usage in Server Components**:
   ```typescript
   import { getTranslations } from 'next-intl/server';
   
   const t = await getTranslations({ locale, namespace: 'home' });
   t('title'); // → "Discover Amazing..." or "Descubrí increíbles..."
   ```

4. **Usage in Client Components**:
   ```typescript
   'use client';
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('nav');
   ```

**URL Pattern:**
- `/en/excursions` → English
- `/es/excursions` → Spanish
- `/en/excursions/123` → English detail
- Language switcher updates URL, Next.js re-renders

---

## 🎨 Styling System

### TailwindCSS Configuration

**Custom Theme** ([tailwind.config.ts](tailwind.config.ts)):
```typescript
theme: {
  extend: {
    colors: {
      ocean: {
        light: '#4A90E2',
        blue: '#2E5C8A',
        dark: '#1A3A52'
      },
      coral: {
        light: '#FF6B9D',
        DEFAULT: '#FF4081',
        dark: '#C2185B'
      },
      sand: {
        light: '#FFF8E1',
        DEFAULT: '#FFECB3',
        dark: '#FFD54F'
      }
    }
  }
}
```

**Design System:**
- **Primary:** Ocean blue shades (navigation, links, buttons)
- **Accent:** Coral (CTAs, badges)
- **Background:** Sand tones (warmth, tropical feel)
- **Components:** Utility-first with semantic class names

---

## 📊 Data Flow

### Current Implementation (Mock Data)

```
User Request
    ↓
Server Component (excursions/page.tsx)
    ↓
mockExcursions.filter(...)  ← Simple array operations
    ↓
Props to ExcursionCard
    ↓
Render with Tailwind classes
```

### Designed Architecture (Future with Prisma)

```
User Request
    ↓
Server Component
    ↓
Prisma Query → PostgreSQL
    ↓
Prisma Client returns typed data
    ↓
Props to Components
```

**Current Strategy:**
- Mock data mimics Prisma structure exactly
- Easy swap: change imports, same component code works

---

## 🔐 Environment Variables

```bash
# Database (not used in demo)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Next.js
NODE_ENV="development" | "production"
```

**Production (Vercel):**
- No DATABASE_URL set → mock data used
- No secrets needed for demo

---

## 🚀 Deployment

### Vercel Configuration

**Build Command:**
```bash
prisma generate && next build
```

**Why `prisma generate`?**
- Generates Prisma Client types
- Required even without DB connection
- Enables type-safety in code

**Edge Functions:**
- API routes run on Vercel Edge
- Fast response times worldwide
- Stateless by design (perfect for mock data)

---

## 🧪 Testing Strategy (Recommended)

### Unit Tests
```
components/*.test.tsx    ← Component rendering
lib/mockData.test.ts     ← Data structure validation
```

### Integration Tests
```
app/api/*.test.ts        ← API route responses
app/[locale]/*.test.tsx  ← Page rendering with i18n
```

### E2E Tests
```
cypress/e2e/
  ├── navigation.cy.ts   ← Language switching
  ├── search.cy.ts       ← Filter functionality
  └── booking.cy.ts      ← Reservation flow
```

**Not implemented yet** (would be next step for production).

---

## 📦 Dependencies Rationale

| Package | Purpose | Why This One? |
|---------|---------|---------------|
| `next` 15.0.3 | Framework | Latest stable, App Router maturity |
| `next-intl` 3.23.0 | i18n | Best Next.js i18n lib, server component support |
| `@prisma/client` 5.22.0 | ORM | Type-safe, migration system, industry standard |
| `tailwindcss` 3.4.14 | CSS | Utility-first, rapid development, small bundle |
| `typescript` 5.6.3 | Language | Type safety, better DX, catches errors early |

**No extras:**
- No UI library (Tailwind suffices)
- No state management (Server Components reduce need)
- No form library (native HTML + validation)

---

## 🔧 Development Workflow

### Recommended Flow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Make changes:**
   - Components → Hot reload instant
   - Translations → Restart server
   - Schema → Run migration

3. **Type check:**
   ```bash
   npm run build  # Catches type errors
   ```

4. **Deploy:**
   ```bash
   git push  # Vercel auto-deploys
   ```

---

## 🎯 Design Decisions

### Why Server Components First?
- Faster initial page loads
- Smaller JavaScript bundles
- SEO-friendly by default
- Better performance for users

### Why Mock Data in Production?
- Zero infrastructure costs
- Instant global response times
- No database maintenance
- Demonstrates frontend skills clearly

### Why Prisma If Not Used?
- Shows database design capability
- Schema documents intended data model
- Easy to activate when client resumes
- Migration history shows planning

### Why next-intl Over Others?
- Native App Router support
- Server Component translations
- URL-based locale switching
- Active maintenance, good docs

---

## 🚨 Known Limitations

1. **No Authentication:**
   - Out of MVP scope
   - Would use NextAuth.js or Clerk

2. **No Real Payments:**
   - Would integrate Stripe
   - PCI compliance considerations

3. **No Backend Validation:**
   - Mock API accepts all requests
   - Real version would validate with Zod

4. **No Rate Limiting:**
   - Vercel provides some protection
   - Production needs Redis + rate limiting

5. **No Analytics:**
   - Would add Vercel Analytics or Plausible
   - Privacy-focused approach preferred

---

## 📚 Further Reading

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Last Updated:** January 2026  
**Maintained By:** Ricardo Bing
