// Mock data for when database is unavailable
export const mockShips = [
  { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise', createdAt: new Date(), updatedAt: new Date() },
];

export const mockDestinations = [
  { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Alaska', country: 'USA', description: 'Glaciers and wildlife', createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Northern Europe', country: 'Multiple', description: 'Fjords and culture', createdAt: new Date(), updatedAt: new Date() },
];

export const mockExcursions = [
  {
    id: '1',
    title: 'Snorkeling Adventure',
    description: 'Explore vibrant coral reefs and marine life',
    price: 89.99,
    duration: 4,
    destinationId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '1',
        date: new Date('2025-12-15'),
        currentParticipants: 15,
        minParticipants: 10,
        maxParticipants: 25,
        availableSpots: 10,
        status: 'confirmed' as const,
        cruiseShipId: '1',
        excursionId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  },
  {
    id: '2',
    title: 'Historic City Tour',
    description: 'Discover ancient ruins and local culture',
    price: 129.99,
    duration: 6,
    destinationId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '2',
        date: new Date('2025-12-20'),
        currentParticipants: 20,
        minParticipants: 15,
        maxParticipants: 30,
        availableSpots: 10,
        status: 'confirmed' as const,
        cruiseShipId: '2',
        excursionId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  },
  {
    id: '3',
    title: 'Glacier Expedition',
    description: 'Witness breathtaking glaciers up close',
    price: 199.99,
    duration: 8,
    destinationId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '3', name: 'Alaska', country: 'USA', description: 'Glaciers and wildlife', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '3',
        date: new Date('2025-12-25'),
        currentParticipants: 12,
        minParticipants: 10,
        maxParticipants: 20,
        availableSpots: 8,
        status: 'confirmed' as const,
        cruiseShipId: '3',
        excursionId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  },
  {
    id: '4',
    title: 'Wine Tasting Experience',
    description: 'Sample the finest local wines and cuisine',
    price: 149.99,
    duration: 5,
    destinationId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '4',
        date: new Date('2026-01-05'),
        currentParticipants: 8,
        minParticipants: 10,
        maxParticipants: 15,
        availableSpots: 7,
        status: 'pending' as const,
        cruiseShipId: '1',
        excursionId: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  },
  {
    id: '5',
    title: 'Beach Paradise',
    description: 'Relax on pristine white sand beaches',
    price: 79.99,
    duration: 4,
    destinationId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '5',
        date: new Date('2026-01-10'),
        currentParticipants: 25,
        minParticipants: 20,
        maxParticipants: 35,
        availableSpots: 10,
        status: 'confirmed' as const,
        cruiseShipId: '2',
        excursionId: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  },
  {
    id: '6',
    title: 'Northern Lights Chase',
    description: 'Experience the magical aurora borealis',
    price: 249.99,
    duration: 10,
    destinationId: '4',
    imageUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    createdAt: new Date(),
    updatedAt: new Date(),
    destination: { id: '4', name: 'Northern Europe', country: 'Multiple', description: 'Fjords and culture', createdAt: new Date(), updatedAt: new Date() },
    departures: [
      {
        id: '6',
        date: new Date('2026-01-15'),
        currentParticipants: 14,
        minParticipants: 12,
        maxParticipants: 18,
        availableSpots: 4,
        status: 'confirmed' as const,
        cruiseShipId: '3',
        excursionId: '6',
        createdAt: new Date(),
        updatedAt: new Date(),
        cruiseShip: { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise', createdAt: new Date(), updatedAt: new Date() }
      }
    ]
  }
];
