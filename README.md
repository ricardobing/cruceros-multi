# 🚢 Cruceros Multi - Cruise Excursions Booking Platform

A modern, full-stack cruise excursions booking platform built with Next.js 15, TypeScript, PostgreSQL, and Prisma ORM. Features intelligent booking status management, multilingual support (English/Spanish), and a beautiful maritime-themed UI.

## ✨ Features

- 🌍 **Multilingual**: Full support for English and Spanish
- 📅 **Smart Booking System**: Automatic status updates (pending → confirmed) based on participant thresholds
- 🔍 **Advanced Search**: Filter by cruise ship, destination, and date
- 📊 **Real-time Availability**: Live participant counts and availability status
- 🎨 **Maritime Theme**: Beautiful ocean-inspired design with TailwindCSS
- 🗄️ **PostgreSQL Database**: Robust relational data with Prisma ORM
- ⚡ **Next.js 15**: Latest features with App Router and Server Components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.3 with App Router
- **Language**: TypeScript 5.6.3
- **Database**: PostgreSQL with Prisma ORM 5.22.0
- **Styling**: TailwindCSS 3.4.14
- **i18n**: next-intl 3.23.0
- **React**: 19.0.0

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL**: Version 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git**: For version control ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone the Repository

```powershell
cd c:\tmp
git clone https://github.com/ricardobing/cruceros-multi.git
cd cruceros-multi
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Database Setup

#### Create PostgreSQL Database

```powershell
# Connect to PostgreSQL (default user)
psql -U postgres

# Inside psql, create database
CREATE DATABASE cruceros_db;

# Exit psql
\q
```

#### Configure Environment Variables

```powershell
# Copy example environment file
Copy-Item .env.example .env

# Edit .env file with your database credentials
# Update DATABASE_URL:
# DATABASE_URL="postgresql://postgres:your_password@localhost:5432/cruceros_db"
```

### 4. Run Database Migrations

```powershell
npm run prisma:migrate
```

### 5. Seed Database with Sample Data

```powershell
npm run prisma:seed
```

This will populate your database with:
- 3 cruise ships (Oasis of the Seas, Norwegian Escape, Carnival Vista)
- 4 destinations (Cozumel, Grand Cayman, Nassau, St. Thomas)
- 8 diverse excursions (beach tours, snorkeling, cultural tours)
- 32 departure dates with varying availability

### 6. Start Development Server

```powershell
npm run dev
```

Visit [http://localhost:3005](http://localhost:3005) to see your application! 🎉

## 📂 Project Structure

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
