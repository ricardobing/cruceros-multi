import SearchForm from '@/components/SearchForm';
import ExcursionCard from '@/components/ExcursionCard';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { mockExcursions } from '@/lib/mockData';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // Fetch featured excursions (first 6) with error handling
  let featuredExcursions: any[] = [];
  try {
    featuredExcursions = await prisma.excursion.findMany({
      take: 6,
      include: {
        destination: true,
        departures: {
          where: {
            date: {
              gte: new Date(),
            },
          },
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
    if (featuredExcursions.length === 0) {
      featuredExcursions = mockExcursions.slice(0, 6);
    }
  } catch (error) {
    console.error('Failed to fetch excursions:', error);
    // Use mock data if database fails
    featuredExcursions = mockExcursions.slice(0, 6);
  }

  const features = [
    {
      key: 'easySearch',
      title: t('features.easySearch.title'),
      description: t('features.easySearch.description'),
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      key: 'flexibleBooking',
      title: t('features.flexibleBooking.title'),
      description: t('features.flexibleBooking.description'),
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      key: 'verifiedTours',
      title: t('features.verifiedTours.title'),
      description: t('features.verifiedTours.description'),
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="relative flex h-[600px] items-center justify-center bg-gradient-to-br from-ocean-dark to-ocean-blue text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/80 via-ocean-blue/60 to-ocean-dark/80" />
        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
          <h1 className="mb-6 text-6xl font-bold leading-tight drop-shadow-2xl">{t('title')}</h1>
          <p className="text-2xl font-light leading-relaxed drop-shadow-lg opacity-95">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container relative z-20 -mt-20 mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-soft-lg p-8">
          <SearchForm />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.key} className="text-center group">
              <div className="bg-gradient-to-br from-ocean-blue to-ocean-light mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-soft group-hover:shadow-soft-lg transition-all duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Excursions Section */}
      {featuredExcursions.length > 0 && (
        <div className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {locale === 'es' ? 'Excursiones Destacadas' : 'Featured Excursions'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Descubre las experiencias más populares seleccionadas especialmente para ti' 
                  : 'Discover the most popular experiences specially selected for you'}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
              {featuredExcursions.map((excursion) => (
                <ExcursionCard
                  key={excursion.id}
                  excursion={excursion}
                  locale={locale}
                />
              ))}
            </div>
            <div className="text-center">
              <Link
                href={`/${locale}/excursions`}
                className="inline-flex items-center gap-2 bg-ocean-dark text-white px-8 py-4 rounded-xl font-semibold hover:bg-ocean-blue transition-colors duration-300 shadow-soft hover:shadow-soft-lg"
              >
                {locale === 'es' ? 'Ver todas las excursiones' : 'View all excursions'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
