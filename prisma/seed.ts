import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌊 Starting seed...');

  // Clear existing data
  await prisma.reservation.deleteMany();
  await prisma.departure.deleteMany();
  await prisma.excursion.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.cruiseShip.deleteMany();

  // Create Cruise Ships
  const ships = await Promise.all([
    prisma.cruiseShip.create({
      data: { name: 'Ocean Explorer' },
    }),
    prisma.cruiseShip.create({
      data: { name: 'Caribbean Dream' },
    }),
    prisma.cruiseShip.create({
      data: { name: 'Pacific Voyager' },
    }),
  ]);

  console.log(`✅ Created ${ships.length} cruise ships`);

  // Create Destinations
  const destinations = await Promise.all([
    prisma.destination.create({
      data: { name: 'Cozumel, Mexico' },
    }),
    prisma.destination.create({
      data: { name: 'Grand Cayman' },
    }),
    prisma.destination.create({
      data: { name: 'Nassau, Bahamas' },
    }),
    prisma.destination.create({
      data: { name: 'St. Thomas' },
    }),
  ]);

  console.log(`✅ Created ${destinations.length} destinations`);

  // Create Excursions
  const excursions = await Promise.all([
    // Cozumel
    prisma.excursion.create({
      data: {
        title: 'Snorkeling Paradise',
        description:
          'Explore the crystal-clear waters of Cozumel with our guided snorkeling tour. Discover vibrant coral reefs, tropical fish, and maybe even sea turtles! All equipment included.',
        destinationId: destinations[0].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Mayan Ruins Discovery',
        description:
          'Journey back in time with a visit to ancient Mayan ruins. Expert guides will share the fascinating history and culture of this ancient civilization.',
        destinationId: destinations[0].id,
      },
    }),
    // Grand Cayman
    prisma.excursion.create({
      data: {
        title: 'Stingray City Adventure',
        description:
          'Get up close and personal with friendly stingrays in their natural habitat. This unforgettable experience includes swimming and feeding these gentle creatures.',
        destinationId: destinations[1].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Seven Mile Beach Escape',
        description:
          'Relax on one of the Caribbean\'s most beautiful beaches. Enjoy crystal-clear waters, soft white sand, and complimentary beach chairs and umbrellas.',
        destinationId: destinations[1].id,
      },
    }),
    // Nassau
    prisma.excursion.create({
      data: {
        title: 'Atlantis Aquaventure',
        description:
          'Experience the world-famous Atlantis resort and water park. Includes access to all water slides, lazy river, beaches, and marine habitats.',
        destinationId: destinations[2].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Island Jeep Safari',
        description:
          'Explore Nassau\'s hidden gems in an open-air jeep. Visit local beaches, historical sites, and enjoy authentic Bahamian cuisine.',
        destinationId: destinations[2].id,
      },
    }),
    // St. Thomas
    prisma.excursion.create({
      data: {
        title: 'Mountain Top Scenic Tour',
        description:
          'Ascend to the highest point in St. Thomas for breathtaking 360-degree views. Shop for local crafts and enjoy complimentary banana daiquiris.',
        destinationId: destinations[3].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Coral World Ocean Park',
        description:
          'Interactive marine park experience with underwater observatory, sea lion shows, and touch pools. Perfect for families!',
        destinationId: destinations[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${excursions.length} excursions`);

  // Create Departures (multiple dates for each excursion)
  const today = new Date();
  const departures = [];

  for (const excursion of excursions) {
    for (let i = 0; i < 4; i++) {
      const departureDate = new Date(today);
      departureDate.setDate(today.getDate() + 7 + i * 7); // Next 4 weeks

      const departure = await prisma.departure.create({
        data: {
          excursionId: excursion.id,
          date: departureDate,
          minParticipants: 4,
          maxParticipants: 20,
          currentParticipants: i === 0 ? 3 : i === 1 ? 5 : 0, // Some with participants
          status: i === 1 ? 'confirmed' : 'pending',
        },
      });

      departures.push(departure);
    }
  }

  console.log(`✅ Created ${departures.length} departures`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
