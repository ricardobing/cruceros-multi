import { NextResponse } from 'next/server';
import { mockShips } from '@/lib/mockData';

// Demo API - Returns mock data
// Backend integration paused - ready for future connection
export async function GET() {
  return NextResponse.json(mockShips);
}
