import { useTranslations } from 'next-intl';
import { prisma } from '@/lib/prisma';
import { mockExcursions } from '@/lib/mockData';
import ExcursionCard from '@/components/ExcursionCard';
import Link from 'next/link';

interface SearchParams {
  ship?: string;
  destination?: string;
  date?: string;
}

export default async function ExcursionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const { destination, date } = await searchParams;

  // Build query
  const where: any = {};

  if (destination) {
    where.destinationId = destination;
  }

  // Fetch excursions with their departures with error handling
  let excursions: any[] = [];
  try {
    excursions = await prisma.excursion.findMany({
      where,
      include: {
        destination: true,
        departures: {
          where: date
            ? {
                date: {
                  gte: new Date(date),
                  lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
                },
              }
            : {},
          orderBy: {
            date: 'asc',
          },
          include: {
            cruiseShip: true,
          },
        },
      },
    });
    // If database is empty, use mock data
    if (excursions.length === 0) {
      excursions = mockExcursions;
      // Apply filters to mock data
      if (destination) {
        excursions = excursions.filter(e => e.destinationId === destination);
      }
    }
  } catch (error) {
    console.error('Failed to fetch excursions:', error);
    // Use mock data if database fails
    excursions = mockExcursions;
    // Apply filters to mock data
    if (destination) {
      excursions = excursions.filter(e => e.destinationId === destination);
    }
  }

  // Filter excursions that have departures
  const filteredExcursions = excursions.filter(
    (exc) => exc.departures.length > 0
  );

  const t = useTranslations('excursions');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-ocean-blue hover:text-ocean-dark flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('title')}
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>

      {filteredExcursions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExcursions.map((excursion) => (
            <ExcursionCard
              key={excursion.id}
              excursion={excursion}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
