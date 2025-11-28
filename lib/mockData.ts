// Mock data for when database is unavailable
export const mockShips = [
  { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship' },
  { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel' },
  { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise' },
];

export const mockDestinations = [
  { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise' },
  { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline' },
  { id: '3', name: 'Alaska', country: 'USA', description: 'Glaciers and wildlife' },
  { id: '4', name: 'Northern Europe', country: 'Multiple', description: 'Fjords and culture' },
];

export const mockExcursions = [
  {
    id: '1',
    name: 'Snorkeling Adventure',
    description: 'Explore vibrant coral reefs and marine life',
    price: 89.99,
    duration: 4,
    destinationId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    destination: { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise' },
    departures: [
      {
        id: '1',
        date: new Date('2025-12-15'),
        availableSpots: 25,
        cruiseShipId: '1',
        cruiseShip: { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship' }
      }
    ]
  },
  {
    id: '2',
    name: 'Historic City Tour',
    description: 'Discover ancient ruins and local culture',
    price: 129.99,
    duration: 6,
    destinationId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    destination: { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline' },
    departures: [
      {
        id: '2',
        date: new Date('2025-12-20'),
        availableSpots: 30,
        cruiseShipId: '2',
        cruiseShip: { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel' }
      }
    ]
  },
  {
    id: '3',
    name: 'Glacier Expedition',
    description: 'Witness breathtaking glaciers up close',
    price: 199.99,
    duration: 8,
    destinationId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    destination: { id: '3', name: 'Alaska', country: 'USA', description: 'Glaciers and wildlife' },
    departures: [
      {
        id: '3',
        date: new Date('2025-12-25'),
        availableSpots: 20,
        cruiseShipId: '3',
        cruiseShip: { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise' }
      }
    ]
  },
  {
    id: '4',
    name: 'Wine Tasting Experience',
    description: 'Sample the finest local wines and cuisine',
    price: 149.99,
    duration: 5,
    destinationId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    destination: { id: '2', name: 'Mediterranean', country: 'Multiple', description: 'Historic coastline' },
    departures: [
      {
        id: '4',
        date: new Date('2026-01-05'),
        availableSpots: 15,
        cruiseShipId: '1',
        cruiseShip: { id: '1', name: 'Ocean Majesty', capacity: 3000, description: 'Luxury cruise ship' }
      }
    ]
  },
  {
    id: '5',
    name: 'Beach Paradise',
    description: 'Relax on pristine white sand beaches',
    price: 79.99,
    duration: 4,
    destinationId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    destination: { id: '1', name: 'Caribbean', country: 'Multiple', description: 'Tropical paradise' },
    departures: [
      {
        id: '5',
        date: new Date('2026-01-10'),
        availableSpots: 35,
        cruiseShipId: '2',
        cruiseShip: { id: '2', name: 'Caribbean Dream', capacity: 2500, description: 'Modern vessel' }
      }
    ]
  },
  {
    id: '6',
    name: 'Northern Lights Chase',
    description: 'Experience the magical aurora borealis',
    price: 249.99,
    duration: 10,
    destinationId: '4',
    imageUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    destination: { id: '4', name: 'Northern Europe', country: 'Multiple', description: 'Fjords and culture' },
    departures: [
      {
        id: '6',
        date: new Date('2026-01-15'),
        availableSpots: 18,
        cruiseShipId: '3',
        cruiseShip: { id: '3', name: 'Sea Explorer', capacity: 2800, description: 'Adventure cruise' }
      }
    ]
  }
];
