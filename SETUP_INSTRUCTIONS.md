# 🚀 Setup Instructions - Cruceros Multi

Complete step-by-step guide to get the project running locally.

## Prerequisites Checklist

Before starting, ensure you have:

- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/windows/)
- ✅ **Git** - [Download](https://git-scm.com/download/win)
- ✅ **Text Editor** - VS Code recommended

## Step 1: PostgreSQL Installation (Windows)

### 1.1 Download and Install

1. Download PostgreSQL from [official website](https://www.postgresql.org/download/windows/)
2. Run the installer
3. **Remember the password** you set for the `postgres` user
4. Keep the default port: `5432`
5. Install with default components (including pgAdmin 4)

### 1.2 Verify Installation

```powershell
# Open PowerShell and verify PostgreSQL is installed
psql --version
# Expected output: psql (PostgreSQL) 14.x or higher
```

### 1.3 Start PostgreSQL Service

```powershell
# Check if service is running
Get-Service postgresql*

# If not running, start it
Start-Service postgresql-x64-14
```

## Step 2: Database Creation

### 2.1 Connect to PostgreSQL

```powershell
# Connect as postgres user (will prompt for password)
psql -U postgres
```

### 2.2 Create Database

Inside the psql prompt:

```sql
-- Create the database
CREATE DATABASE cruceros_db;

-- Verify it was created
\l

-- Connect to the new database
\c cruceros_db

-- Exit psql
\q
```

### Alternative: Using pgAdmin 4

1. Open **pgAdmin 4** from Start Menu
2. Right-click on **Databases**
3. Select **Create > Database...**
4. Name: `cruceros_db`
5. Owner: `postgres`
6. Click **Save**

## Step 3: Project Setup

### 3.1 Navigate to Project

```powershell
cd c:\tmp\cruceros-multi
```

### 3.2 Install Dependencies

```powershell
npm install
```

This will:
- Install all Node.js packages
- Automatically run `prisma generate` (via postinstall script)
- Should complete in 2-3 minutes

### 3.3 Configure Environment Variables

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit the .env file
notepad .env
```

**Update the DATABASE_URL:**

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cruceros_db"
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

**Example:**
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/cruceros_db"
```

💡 **Tip**: If your password contains special characters, you may need to URL-encode them.

## Step 4: Database Migrations

### 4.1 Run Migrations

```powershell
npm run prisma:migrate
```

This will:
- Create all database tables (CruiseShip, Destination, Excursion, Departure, Reservation)
- Set up relationships and indexes
- Generate Prisma Client

**Expected output:**
```
✔ Generated Prisma Client
✔ Database synchronized with schema
```

### 4.2 Verify Tables Created

```powershell
# Connect to database
psql -U postgres -d cruceros_db

# List tables
\dt

# Expected tables:
# - CruiseShip
# - Destination
# - Excursion
# - Departure
# - Reservation
# - _prisma_migrations

# Exit
\q
```

## Step 5: Seed Sample Data

### 5.1 Run Seed Script

```powershell
npm run prisma:seed
```

This populates the database with:
- **3 Cruise Ships**: Oasis of the Seas, Norwegian Escape, Carnival Vista
- **4 Destinations**: Cozumel, Grand Cayman, Nassau, St. Thomas
- **8 Excursions**: Various tours (beach, snorkeling, cultural, adventure)
- **32 Departures**: Multiple dates for each excursion

**Expected output:**
```
Database has been seeded successfully!
✔ Seeded 3 ships
✔ Seeded 4 destinations
✔ Seeded 8 excursions
✔ Seeded 32 departures
```

### 5.2 Verify Data

```powershell
# Open Prisma Studio to browse data
npm run prisma:studio
```

Browser opens at `http://localhost:5555` with GUI to explore all data.

## Step 6: Start Development Server

```powershell
npm run dev
```

**Expected output:**
```
▲ Next.js 15.0.3
- Local:        http://localhost:3005
- Network:      http://192.168.x.x:3005

✓ Ready in 2.5s
```

🎉 **Success!** Open browser at [http://localhost:3005](http://localhost:3005)

## Step 7: Verify Application

### 7.1 Test Features

1. **Home Page**:
   - Should display hero section
   - Search form with ship/destination/date filters
   - Feature cards

2. **Language Toggle**:
   - Click **EN** / **ES** buttons in header
   - Content should switch between English and Spanish

3. **Search**:
   - Select a destination (e.g., "Cozumel")
   - Select a date
   - Click "Search Excursions" / "Buscar Excursiones"

4. **Browse Excursions**:
   - Should display filtered results
   - Each card shows: image, title, destination, participant count, status

5. **View Details**:
   - Click "View Details" on any excursion
   - Should show full description
   - Available dates listed on the right

6. **Make Reservation**:
   - Select a departure date
   - Fill in: Name and Email
   - Click "Confirm Reservation" / "Confirmar Reserva"
   - Should redirect to thank-you page

7. **Check Status**:
   - Reservation should show "Pending" or "Confirmed"
   - Depends on if minimum participants threshold was reached

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: Database connection error

**Symptoms:**
```
Error: P1001: Can't reach database server
```

**Solutions:**

1. **Verify PostgreSQL is running:**
   ```powershell
   Get-Service postgresql*
   # Should show "Running"
   ```

2. **Check connection string:**
   ```powershell
   # Test connection manually
   psql -U postgres -d cruceros_db
   ```

3. **Verify password:**
   - Ensure `.env` has correct password
   - No spaces around `=` sign
   - Special characters may need URL encoding

4. **Check port:**
   ```powershell
   netstat -an | findstr 5432
   # Should show PostgreSQL listening
   ```

### Issue: Port 3005 already in use

**Solution:**
```powershell
# Find process using port 3005
Get-NetTCPConnection -LocalPort 3005

# Kill the process (replace PID)
Stop-Process -Id <PID> -Force

# Or use different port
npm run dev -- -p 3006
```

### Issue: Prisma migration fails

**Symptoms:**
```
Error: P3009: migrate found failed migrations
```

**Solution:**
```powershell
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Run migrations again
npm run prisma:migrate

# Re-seed data
npm run prisma:seed
```

### Issue: Build errors with TypeScript

**Solution:**
```powershell
# Regenerate Prisma Client
npx prisma generate

# Clear Next.js cache
Remove-Item -Path .next -Recurse -Force

# Rebuild
npm run build
```

### Issue: Next.js build warnings about i18n

**Warning:**
```
[next-intl] Reading request configuration from ./i18n.ts is deprecated
```

**Note:** This is a deprecation warning, not an error. The app still works. Can be fixed in future by moving config to `./i18n/request.ts`.

## Useful Commands

```powershell
# Development
npm run dev              # Start dev server on port 3005
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed sample data
npm run prisma:studio    # Open Prisma Studio GUI
npx prisma migrate reset # Reset database (WARNING: deletes all data)
npx prisma generate      # Regenerate Prisma Client

# Git
git status               # Check file changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to GitHub
```

## Next Steps

After successful setup:

1. ✅ Test all features (search, book, language switch)
2. ✅ Explore code structure (see README.md)
3. ✅ Customize excursions in `prisma/seed.ts`
4. ✅ Add more features or modify existing ones
5. ✅ Deploy to production (see README for deployment guide)

## Support

If you encounter issues:

1. Check this document first
2. Review error messages carefully
3. Verify all prerequisites are installed
4. Check `.env` configuration
5. Ensure PostgreSQL service is running

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

**Last Updated:** January 2025  
**Version:** 1.0.0
