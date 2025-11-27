import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Get departure info
    const departure = await prisma.departure.findUnique({
      where: { id: departureId },
    });

    if (!departure) {
      return NextResponse.json(
        { error: 'Departure not found' },
        { status: 404 }
      );
    }

    // Check if full
    if (departure.currentParticipants >= departure.maxParticipants) {
      return NextResponse.json(
        { error: 'This departure is full' },
        { status: 400 }
      );
    }

    // Calculate new participant count
    const newParticipantCount = departure.currentParticipants + 1;

    // Determine reservation status
    const reservationStatus =
      newParticipantCount >= departure.minParticipants
        ? 'confirmed'
        : 'pending';

    // Determine departure status
    const departureStatus =
      newParticipantCount >= departure.maxParticipants
        ? 'full'
        : newParticipantCount >= departure.minParticipants
        ? 'confirmed'
        : 'pending';

    // Create reservation and update departure in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create reservation
      const reservation = await tx.reservation.create({
        data: {
          departureId,
          userName,
          userEmail,
          status: reservationStatus,
        },
      });

      // Update departure
      await tx.departure.update({
        where: { id: departureId },
        data: {
          currentParticipants: newParticipantCount,
          status: departureStatus,
        },
      });

      // If departure just became confirmed, update all pending reservations
      if (
        departure.currentParticipants < departure.minParticipants &&
        newParticipantCount >= departure.minParticipants
      ) {
        await tx.reservation.updateMany({
          where: {
            departureId,
            status: 'pending',
          },
          data: {
            status: 'confirmed',
          },
        });
      }

      return reservation;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}
