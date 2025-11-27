-- Complete database setup for Supabase
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ibpzqpwgcqpklawtvgox/sql

-- Drop existing tables if they exist (optional - uncomment if needed)
-- DROP TABLE IF EXISTS "Reservation" CASCADE;
-- DROP TABLE IF EXISTS "Departure" CASCADE;
-- DROP TABLE IF EXISTS "Excursion" CASCADE;
-- DROP TABLE IF EXISTS "Destination" CASCADE;
-- DROP TABLE IF EXISTS "CruiseShip" CASCADE;

-- CreateTable CruiseShip
CREATE TABLE IF NOT EXISTS "CruiseShip" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CruiseShip_pkey" PRIMARY KEY ("id")
);

-- CreateTable Destination
CREATE TABLE IF NOT EXISTS "Destination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable Excursion
CREATE TABLE IF NOT EXISTS "Excursion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "destinationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Excursion_pkey" PRIMARY KEY ("id")
);

-- CreateTable Departure
CREATE TABLE IF NOT EXISTS "Departure" (
    "id" TEXT NOT NULL,
    "excursionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cruiseShipId" TEXT NOT NULL,
    "minParticipants" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "currentParticipants" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
);

-- CreateTable Reservation
CREATE TABLE IF NOT EXISTS "Reservation" (
    "id" TEXT NOT NULL,
    "departureId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Excursion" ADD CONSTRAINT "Excursion_destinationId_fkey" 
FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departure" ADD CONSTRAINT "Departure_excursionId_fkey" 
FOREIGN KEY ("excursionId") REFERENCES "Excursion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departure" ADD CONSTRAINT "Departure_cruiseShipId_fkey" 
FOREIGN KEY ("cruiseShipId") REFERENCES "CruiseShip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_departureId_fkey" 
FOREIGN KEY ("departureId") REFERENCES "Departure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
