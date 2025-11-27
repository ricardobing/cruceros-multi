import SearchForm from '@/components/SearchForm';
import ExcursionCard from '@/components/ExcursionCard';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // Fetch featured excursions (first 6)
  const featuredExcursions = await prisma.excursion.findMany({
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
      <div className="relative flex h-[500px] items-center justify-center bg-gradient-to-br from-ocean-blue to-ocean-dark text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">{t('title')}</h1>
          <p className="text-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container relative z-20 -mt-16 mx-auto px-4">
        <SearchForm />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.key} className="text-center">
              <div className="bg-coral mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Excursions Section */}
      {featuredExcursions.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                {locale === 'es' ? 'Excursiones Destacadas' : 'Featured Excursions'}
              </h2>
              <Link
                href={`/${locale}/excursions`}
                className="text-ocean-blue hover:text-ocean-dark transition-colors"
              >
                {locale === 'es' ? 'Ver todas →' : 'View all →'}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredExcursions.map((excursion) => (
                <ExcursionCard
                  key={excursion.id}
                  excursion={excursion}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
