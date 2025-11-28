const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function main() {
  console.log('Checking database connection...');
  
  try {
    const ships = await prisma.cruiseShip.findMany();
    console.log('\n✓ Ships:', ships.length);
    
    const destinations = await prisma.destination.findMany();
    console.log('✓ Destinations:', destinations.length);
    
    const excursions = await prisma.excursion.findMany();
    console.log('✓ Excursions:', excursions.length);
    
    const departures = await prisma.departure.findMany();
    console.log('✓ Departures:', departures.length);
    
    if (ships.length === 0) {
      console.log('\n⚠️  Database is empty! Running seed...');
      const { exec } = require('child_process');
      exec('npm run prisma:seed', (error, stdout, stderr) => {
        if (error) {
          console.error('Seed error:', error);
          return;
        }
        console.log(stdout);
      });
    } else {
      console.log('\n✓ Database has data!');
    }
  } catch (error) {
    console.error('\n✗ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
