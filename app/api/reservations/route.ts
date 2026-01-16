import { NextResponse } from 'next/server';

// Demo API - Backend integration paused
// Ready for future Supabase/Prisma connection
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { departureId, userName, userEmail } = body;

    // Validate inputs
    if (!departureId || !userName || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock successful reservation for demo
    return NextResponse.json({
      success: true,
      reservation: {
        id: `demo-${Date.now()}`,
        departureId,
        userName,
        userEmail,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
      message: 'Demo mode: Reservation simulated successfully',
    });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }
}
