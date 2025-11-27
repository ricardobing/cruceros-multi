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
    <div className="card">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600)',
        }}
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-ocean-blue mb-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm font-medium">{excursion.destination.name}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {excursion.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {excursion.description}
        </p>

        {firstDeparture && (
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>
                {firstDeparture.currentParticipants}/{firstDeparture.maxParticipants}{' '}
                {t('participants')}
              </span>
            </div>

            <div className="text-gray-500">
              {t('shipLabel')}: {firstDeparture.cruiseShip?.name ?? t('shipFallback')}
            </div>

            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                firstDeparture.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {firstDeparture.status === 'confirmed' ? t('confirmed') : t('pending')}
            </span>
          </div>
        )}

        <Link
          href={`/${locale}/excursions/${excursion.id}`}
          className="btn-primary w-full block text-center"
        >
          {t('viewDetails')}
        </Link>
      </div>
    </div>
  );
}
