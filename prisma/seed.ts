import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.info('Starting seed...');

  // Clear existing data
  await prisma.reservation.deleteMany();
  await prisma.departure.deleteMany();
  await prisma.excursion.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.cruiseShip.deleteMany();

  // Create cruise ships (premium lines)
  const ships = await Promise.all([
    prisma.cruiseShip.create({ data: { name: 'Royal Caribbean - Symphony of the Seas' } }),
    prisma.cruiseShip.create({ data: { name: 'MSC Meraviglia' } }),
    prisma.cruiseShip.create({ data: { name: 'Norwegian Epic' } }),
  ]);

  console.info(`Created ${ships.length} cruise ships`);

  // Create destinations
  const destinations = await Promise.all([
    prisma.destination.create({ data: { name: 'Cozumel, México' } }),
    prisma.destination.create({ data: { name: 'Grand Cayman, Islas Caimán' } }),
    prisma.destination.create({ data: { name: 'Nassau, Bahamas' } }),
    prisma.destination.create({ data: { name: 'St. Thomas, Islas Vírgenes' } }),
  ]);

  console.info(`Created ${destinations.length} destinations`);

  // Create authentic excursions with professional Unsplash images
  const excursions = await Promise.all([
    // Cozumel excursions
    prisma.excursion.create({
      data: {
        title: 'Snorkeling en el Paraíso de Arrecifes de Cozumel',
        description:
          'Descubre los vibrantes arrecifes de coral del Parque Nacional Chankanaab. Esta excursión de medio día incluye equipo de snorkel profesional, guía certificado, y acceso a playas privadas. Observa peces tropicales, tortugas marinas y mantarrayas en aguas cristalinas. Duración: 4 horas. Nivel: Fácil. Incluye: transporte, equipo, bebidas y snacks.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        destinationId: destinations[0].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Ruinas Mayas de Tulum y Playa del Carmen',
        description:
          'Viaja en el tiempo visitando las impresionantes ruinas mayas de Tulum con vista al Mar Caribe. Tu guía experto te contará la historia de esta antigua ciudad amurallada. Después, disfruta tiempo libre en Playa del Carmen para compras y almuerzo. Duración: 6 horas. Nivel: Moderado. Incluye: transporte, guía certificado, entrada a ruinas.',
        imageUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80',
        destinationId: destinations[0].id,
      },
    }),

    // Grand Cayman excursions
    prisma.excursion.create({
      data: {
        title: 'Stingray City - Nado con Rayas en Aguas Cristalinas',
        description:
          'Experimenta el encuentro más famoso de las Islas Caimán nadando con rayas amigables en su hábitat natural. Esta aventura única incluye snorkel en el arrecife de coral cercano. Duración: 3.5 horas. Nivel: Fácil. Apto para todas las edades. Incluye: bote, equipo de snorkel, guía profesional, bebidas.',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        destinationId: destinations[1].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Seven Mile Beach y Snorkel en Arrecife de Coral',
        description:
          'Relájate en una de las playas más hermosas del Caribe. Combina tiempo de playa con snorkel en arrecifes protegidos llenos de vida marina. Duración: 4 horas. Nivel: Fácil. Incluye: transporte, sillas de playa, equipo de snorkel, instructor, refrescos y aperitivos locales.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        destinationId: destinations[1].id,
      },
    }),

    // Nassau excursions
    prisma.excursion.create({
      data: {
        title: 'Atlantis Aquaventure - Parque Acuático Todo Incluido',
        description:
          'Acceso completo al legendario resort Atlantis Paradise Island. Disfruta toboganes acuáticos de clase mundial, río lento, playas privadas y hábitats marinos con más de 50,000 animales. Duración: 6 horas. Nivel: Fácil. Incluye: entrada general, toallas, casilleros, almuerzo buffet.',
        imageUrl: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80',
        destinationId: destinations[2].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Safari Histórico y Playas de Nassau',
        description:
          'Recorrido en jeep descapotable explorando la rica historia de Nassau. Visita el Fuerte Charlotte, la Escalera de la Reina, y playas escondidas locales. Incluye degustación de comida bahameña auténtica. Duración: 5 horas. Nivel: Fácil. Incluye: guía local, transporte, entradas, degustaciones culinarias.',
        imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
        destinationId: destinations[2].id,
      },
    }),

    // St. Thomas excursions
    prisma.excursion.create({
      data: {
        title: 'Magens Bay y Teleférico Paradise Point',
        description:
          'Asciende en teleférico a 700 pies sobre el nivel del mar para vistas panorámicas de 360 grados. Después, relájate en Magens Bay, nombrada una de las 10 mejores playas del mundo. Duración: 5 horas. Nivel: Fácil. Incluye: transporte, teleférico, entrada a playa, silla y sombrilla.',
        imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80',
        destinationId: destinations[3].id,
      },
    }),
    prisma.excursion.create({
      data: {
        title: 'Coral World Ocean Park y Coki Beach',
        description:
          'Parque marino interactivo con observatorio submarino, encuentros con leones marinos, piscinas táctiles y exhibiciones de tiburones. Continúa con snorkel en Coki Beach, conocida por su diversa vida marina. Duración: 4.5 horas. Nivel: Fácil. Incluye: entrada al parque, todas las exhibiciones, equipo de snorkel.',
        imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
        destinationId: destinations[3].id,
      },
    }),
  ]);

  console.info(`Created ${excursions.length} excursions`);

  // Create departures for next 3 months
  let departureCount = 0;
  const today = new Date();

  for (const [index, excursion] of excursions.entries()) {
    const shipIndex = index % ships.length;
    const daysToAdd = [7, 14, 21, 28]; // Weekly departures for a month

    for (const days of daysToAdd) {
      const departureDate = new Date(today);
      departureDate.setDate(today.getDate() + days);

      await prisma.departure.create({
        data: {
          excursionId: excursion.id,
          date: departureDate,
          cruiseShipId: ships[shipIndex].id,
          minParticipants: 4,
          maxParticipants: 20,
          currentParticipants: Math.floor(Math.random() * 8), // 0-7 participants
          status: Math.random() > 0.5 ? 'confirmed' : 'pending',
        },
      });

      departureCount++;
    }
  }

  console.info(`Created ${departureCount} departures`);
  console.info('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
