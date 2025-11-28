import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockShips } from '@/lib/mockData';

export async function GET() {
  try {
    const ships = await prisma.cruiseShip.findMany({
      orderBy: { name: 'asc' },
    });
    // Return mock data if database is empty
    if (ships.length === 0) {
      return NextResponse.json(mockShips);
    }
    return NextResponse.json(ships);
  } catch (error) {
    console.error('Ships fetch error:', error);
    // Return mock data instead of error
    return NextResponse.json(mockShips);
  }
}
