import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockDestinations } from '@/lib/mockData';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
    });
    // Return mock data if database is empty
    if (destinations.length === 0) {
      return NextResponse.json(mockDestinations);
    }
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Destinations fetch error:', error);
    // Return mock data instead of error
    return NextResponse.json(mockDestinations);
  }
}
