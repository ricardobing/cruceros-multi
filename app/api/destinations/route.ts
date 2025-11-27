import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Destinations fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}
