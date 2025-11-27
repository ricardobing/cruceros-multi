import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ships = await prisma.cruiseShip.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(ships);
  } catch (error) {
    console.error('Ships fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ships' },
      { status: 500 }
    );
  }
}
