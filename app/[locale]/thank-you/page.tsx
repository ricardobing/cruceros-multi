import { useTranslations } from 'next-intl';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reservation?: string }>;
}) {
  const { locale } = await params;
  const { reservation: reservationId } = await searchParams;

  if (!reservationId) {
    notFound();
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      departure: {
        include: {
          excursion: {
            include: {
              destination: true,
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    notFound();
  }

  const t = useTranslations('thankyou');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('subtitle')}</p>

        <div className="bg-white rounded-lg shadow-lg p-8 text-left">
          {reservation.status === 'pending' ? (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
                {t('pending.title')}
              </h2>
              <p className="text-gray-700">{t('pending.description')}</p>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {t('confirmed.title')}
              </h2>
              <p className="text-gray-700">{t('confirmed.description')}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">{t('reservationDetails')}</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>{t('excursion')}:</strong> {reservation.departure.excursion.title}
              </p>
              <p>
                <strong>{t('date')}:</strong>{' '}
                {new Date(reservation.departure.date).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <strong>{t('status')}:</strong>{' '}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {reservation.status === 'confirmed'
                    ? t('status.confirmed')
                    : t('status.pending')}
                </span>
              </p>
            </div>
          </div>
        </div>

        <Link href={`/${locale}`} className="btn-primary inline-block mt-8">
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
