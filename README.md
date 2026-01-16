# 🚢 Cruceros Multi - Cruise Excursions Platform

> **Status:** MVP Demo | Paused Development  
> **Live Demo:** [cruceros-multi.vercel.app/es](https://cruceros-multi.vercel.app/es)  
> **Tech Focus:** Next.js 15, TypeScript, i18n, Prisma Architecture

A modern cruise excursions booking platform showcasing full-stack architecture with Next.js 15, intelligent internationalization, and production-ready patterns.

---

## 🎯 Project Context

This is a **real client project** that was paused mid-development. Rather than leaving it incomplete, it's been carefully refined to serve as a **portfolio showcase** demonstrating:

- Clean, production-ready architecture
- Modern Next.js 15 patterns (App Router, Server Components)
- Professional i18n implementation
- Thoughtful handling of incomplete features
- Database design (Prisma schema)

**Current State:**
- ✅ Frontend fully functional with mock data
- ✅ Complete i18n (English/Spanish) 
- ✅ Prisma schema designed and ready
- ⏸️ Backend integration paused by client decision
- 🎨 Maritime-themed UI with TailwindCSS

**Why Mock Data?**  
The backend (Supabase/Prisma) exists architecturally but isn't connected to maintain zero costs and fast demo performance. The mock data demonstrates the intended functionality clearly.

---

## ✨ Key Features Implemented

### 🌍 Internationalization (i18n)
- Full English/Spanish support via `next-intl`
- Localized URLs (`/en/excursions`, `/es/excursions`)
- Language switcher with persistent routing
- Server-side translations for optimal performance

### 🎨 User Interface
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Maritime Theme**: Ocean-blue palette with coral accents
- **Modern UX**: Smooth animations, intuitive navigation
- **Component Architecture**: Reusable, maintainable components

### 🗄️ Database Architecture
- **5 Prisma Models**: CruiseShip, Destination, Excursion, Departure, Reservation
- **Relational Design**: Proper foreign keys and relationships
- **Ready for Production**: Migrations and seed scripts included

### 🔍 Search & Filtering
- Filter by cruise ship, destination, date
- Real-time result updates
- Smart fallbacks for missing data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15.0.3 (App Router) |
| **Language** | TypeScript 5.6.3 |
| **Styling** | TailwindCSS 3.4.14 |
| **i18n** | next-intl 3.23.0 |
| **Database** | PostgreSQL + Prisma ORM 5.22.0 |
| **React** | 19.0.0 |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (optional, mock data works without it)

### Installation

```bash
# Clone repo
git clone https://github.com/ricardobing/cruceros-multi.git
cd cruceros-multi

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3005](http://localhost:3005)

### Optional: Database Setup

If you want to test the database layer:

```bash
# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run migrations
npx prisma migrate deploy

# Seed with sample data
npm run prisma:seed
```

---

## 📂 Project Structure

```
cruceros-multi/
├── app/
│   ├── [locale]/              # i18n routing
│   │   ├── page.tsx           # Home with search
│   │   ├── excursions/        # Listing & detail pages
│   │   └── thank-you/         # Confirmation page
│   └── api/                   # API routes (mock mode)
├── components/                # Reusable UI components
├── lib/
│   ├── mockData.ts            # Demo data
│   └── prisma.ts              # Database client
├── messages/                  # i18n translations (en/es)
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data script
└── i18n.ts                    # i18n configuration
```

---

## 🎓 What This Project Demonstrates

### For Technical Reviewers

**Architecture:**
- Server Components + Client Components separation
- Route handlers with proper error handling
- Middleware for internationalization
- Type-safe database queries (Prisma)

**Code Quality:**
- TypeScript throughout
- Consistent component patterns
- Proper error boundaries
- Clean folder structure

**Production Readiness:**
- Environment variable management
- Database migrations
- Vercel deployment configured
- Mock data fallback strategy

**Real-World Patterns:**
- i18n from day one (not retrofitted)
- Relational data modeling
- Search/filter implementations
- Status management (pending/confirmed)

---

## 📋 Available Scripts

```bash
npm run dev          # Development server (port 3005)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run prisma:seed  # Populate database
```

---

## 🔮 Future Enhancements (If Resumed)

- [ ] Connect Supabase backend
- [ ] Payment integration (Stripe)
- [ ] User authentication
- [ ] Booking management dashboard
- [ ] Email notifications
- [ ] Review/rating system

---

## 📝 Notes for Evaluators

**This project intentionally:**
- Uses mock data for stability and cost-efficiency
- Includes database schema but doesn't require DB to run
- Focuses on frontend architecture and i18n patterns
- Demonstrates production-ready code organization

**Not included (by design):**
- Authentication (out of scope for MVP)
- Payment processing (client paused before this phase)
- Backend deployment (mock data serves demo purposes)

---

## 👤 Developer

**Ricardo Bing**  
Full-Stack Developer | Next.js Specialist

- GitHub: [@ricardobing](https://github.com/ricardobing)
- Demo: [cruceros-multi.vercel.app](https://cruceros-multi.vercel.app/es)

---

## 📄 License

Private project - All rights reserved

```
cruceros-multi/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Home page with search
│   │   ├── excursions/        # Excursions listing & detail
│   │   └── thank-you/         # Reservation confirmation
│   ├── api/                   # API routes
│   │   ├── reservations/      # Booking endpoints
│   │   ├── ships/             # Cruise ships data
│   │   └── destinations/      # Destinations data
│   └── globals.css            # Global styles
├── components/
│   ├── Navigation.tsx         # Header with language switcher
│   ├── SearchForm.tsx         # Advanced search component
│   ├── ExcursionCard.tsx      # Excursion preview card
│   └── DeparturesList.tsx     # Date selection & booking
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data
├── messages/                  # i18n translations
│   ├── en.json                # English
│   └── es.json                # Spanish
└── lib/                       # Utilities
    ├── prisma.ts              # Prisma client
    └── i18n.ts                # i18n config
```

## 🎯 Key Features Explained

### Booking Status Logic

The platform automatically manages excursion statuses:

1. **Pending**: When `currentParticipants < minParticipants`
2. **Confirmed**: When `currentParticipants >= minParticipants`
3. **Full**: When `currentParticipants >= maxParticipants`

When a departure reaches the minimum threshold, ALL pending reservations are automatically confirmed.

### Database Models

- **CruiseShip**: Cruise line vessels
- **Destination**: Port cities and locations
- **Excursion**: Tour packages at destinations
- **Departure**: Specific dates for excursions
- **Reservation**: Customer bookings

## 🌐 Available Scripts

```powershell
# Development
npm run dev              # Start dev server on port 3005

# Database
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed sample data
npm run prisma:studio    # Open Prisma Studio GUI

# Build
npm run build            # Create production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
```

## 🎨 Color Palette

The maritime theme uses:

- **Ocean Blue**: `#0077BE` - Primary actions
- **Ocean Dark**: `#004B7A` - Headers and emphasis
- **Ocean Light**: `#4DA8DA` - Hover states
- **Coral**: `#FF6B6B` - Accents and CTAs
- **Sand**: `#F4E4C1` - Backgrounds

## 📝 Environment Variables

Required in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cruceros_db"
```

## 🚢 Sample Data

After seeding, you'll have:

### Ships
- Oasis of the Seas (Royal Caribbean)
- Norwegian Escape (Norwegian Cruise Line)
- Carnival Vista (Carnival Cruise Line)

### Destinations
- Cozumel, Mexico
- Grand Cayman, Cayman Islands
- Nassau, Bahamas
- St. Thomas, U.S. Virgin Islands

### Excursion Types
- Beach & Snorkeling
- Cultural Tours
- Adventure Sports
- Historical Sites
- Nature Exploration

## 🔧 Troubleshooting

### Database Connection Issues

```powershell
# Verify PostgreSQL is running
Get-Service postgresql*

# Test connection
psql -U postgres -d cruceros_db -c "SELECT 1"
```

### Port Already in Use

If port 3005 is busy:

```powershell
# Find process using port 3005
Get-NetTCPConnection -LocalPort 3005 -ErrorAction SilentlyContinue

# Use different port
npm run dev -- -p 3006
```

### Prisma Issues

```powershell
# Reset database (WARNING: deletes all data)
npm run prisma:reset

# Regenerate Prisma client
npx prisma generate
```

## 📚 Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [next-intl Guide](https://next-intl-docs.vercel.app/)
- [TailwindCSS](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

### Database Hosting

Consider these PostgreSQL hosting options:
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Supabase](https://supabase.com/) - With auth included
- [Railway](https://railway.app/) - Simple deployment

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Built as a demo project showcasing modern web development practices.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Unsplash for destination images

---

Made with ❤️ and Next.js 15
