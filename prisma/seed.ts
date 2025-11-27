import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.info('Starting seed...');

  await prisma.reservation.deleteMany();
  await prisma.departure.deleteMany();
  await prisma.excursion.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.cruiseShip.deleteMany();

  const ships = await Promise.all([
    prisma.cruiseShip.create({ data: { name: 'Ocean Explorer' } }),
    prisma.cruiseShip.create({ data: { name: 'Caribbean Dream' } }),
    prisma.cruiseShip.create({ data: { name: 'Pacific Voyager' } }),
  ]);
  console.info(`Created ${ships.length} cruise ships`);

  const destinations = await Promise.all([
    prisma.destination.create({ data: { name: 'Cozumel, Mexico' } }),
    prisma.destination.create({ data: { name: 'Grand Cayman' } }),
    prisma.destination.create({ data: { name: 'Nassau, Bahamas' } }),
    prisma.destination.create({ data: { name: 'St. Thomas' } }),
  ]);
  console.info(`Created ${destinations.length} destinations`);

  const excursions = await Promise.all([
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
          "Relax on one of the Caribbean's most beautiful beaches. Enjoy crystal-clear waters, soft white sand, and complimentary beach chairs and umbrellas.",
        destinationId: destinations[1].id,
      },
    }),
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
          "Explore Nassau's hidden gems in an open-air jeep. Visit local beaches, historical sites, and enjoy authentic Bahamian cuisine.",
        destinationId: destinations[2].id,
      },
    }),
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
  console.info(`Created ${excursions.length} excursions`);

  let departureCount = 0;
  const today = new Date();

  for (const [index, excursion] of excursions.entries()) {
    for (let week = 0; week < 4; week++) {
      const date = new Date(today);
      date.setDate(today.getDate() + 7 + week * 7 + index);

      const ship = ships[(index + week) % ships.length];
      const currentParticipants = (() => {
        if (week === 0) return 3;
        if (week === 1) return 5;
        if (week === 2) return 12;
        return 20;
      })();
      const status =
        currentParticipants >= 20
          ? 'full'
          : currentParticipants >= 4
          ? 'confirmed'
          : 'pending';

      await prisma.departure.create({
        data: {
          excursionId: excursion.id,
          cruiseShipId: ship.id,
          date,
          minParticipants: 4,
          maxParticipants: 20,
          currentParticipants,
          status,
        },
      });

      departureCount += 1;
    }
  }

  console.info(`Created ${departureCount} departures`);
  console.info('Seed completed successfully!');
}

main()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
