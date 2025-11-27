# Vercel Deployment Setup

## ⚠️ Important: Database Required

This application requires a PostgreSQL database to function. Vercel cannot access your local database.

## Setup Steps

### 1. Create a PostgreSQL Database

Choose one of these options:

#### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Copy the `DATABASE_URL` provided

#### Option B: Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (Transaction mode)
5. Format: `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`

#### Option C: Neon (Free Tier Available)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

### 2. Configure Environment Variables in Vercel

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** Your PostgreSQL connection string
   - **Environment:** Production, Preview, Development

### 3. Run Prisma Migrations

After adding the database URL:

```bash
# In Vercel, the migrations run automatically via postinstall script
# But you need to seed the database manually first time:

# Option 1: Run locally against production DB
DATABASE_URL="your-production-url" npm run prisma:migrate
DATABASE_URL="your-production-url" npm run prisma:seed

# Option 2: Use Vercel CLI
vercel env pull
npm run prisma:migrate
npm run prisma:seed
```

### 4. Redeploy

After setting up the database and environment variables, trigger a new deployment:
- Go to Deployments → Click "..." → Redeploy

## Current Error

The error at 19:15 shows the application cannot connect to a database because:
1. `DATABASE_URL` environment variable is not set in Vercel, OR
2. The database is set but migrations haven't been run

## Verify Setup

Once deployed, the site should show:
- ✅ Ships from the database
- ✅ Destinations list
- ✅ Excursions with images
- ✅ Language switching (EN/ES)

## Need Help?

Check Vercel logs:
1. Go to your deployment
2. Click "View Function Logs"
3. Look for database connection errors
