'use client';

import type { Prisma } from '@prisma/client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type ExcursionWithRelations = Prisma.ExcursionGetPayload<{
  include: { destination: true; departures: { include: { cruiseShip: true } } };
}>;

interface ExcursionCardProps {
  excursion: ExcursionWithRelations;
  locale: string;
}

export default function ExcursionCard({ excursion, locale }: ExcursionCardProps) {
  const t = useTranslations('excursions');
  const firstDeparture = excursion.departures[0];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
      <div
        className="h-56 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${excursion.imageUrl || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-white">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold drop-shadow-lg">
              {excursion.destination.name}
            </span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {excursion.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {excursion.description}
        </p>

        {firstDeparture && (
          <div className="mb-4 space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-4 h-4 text-ocean-blue"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-medium">
                  {firstDeparture.currentParticipants}/{firstDeparture.maxParticipants} {t('participants')}
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  firstDeparture.status === 'confirmed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {firstDeparture.status === 'confirmed' ? t('confirmed') : t('pending')}
              </span>
            </div>
          </div>
        )}

        <Link
          href={`/${locale}/excursions/${excursion.id}`}
          className="block w-full bg-gradient-to-r from-ocean-blue to-ocean-light text-white text-center py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          {t('viewDetails')}
        </Link>
      </div>
    </div>
  );
}
