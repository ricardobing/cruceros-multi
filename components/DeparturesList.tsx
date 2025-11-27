'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Departure = {
  id: string;
  date: string | Date;
  currentParticipants: number;
  maxParticipants: number;
  status: string;
  cruiseShip?: { name: string } | null;
};

interface DeparturesListProps {
  departures: Departure[];
  locale: string;
}

export default function DeparturesList({ departures, locale }: DeparturesListProps) {
  const t = useTranslations('detail');
  const router = useRouter();
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [formData, setFormData] = useState({ userName: '', userEmail: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeparture) {
      alert(t('reserveForm.selectDeparture'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departureId: selectedDeparture,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Reservation failed');
      }

      const reservation = await response.json();
      router.push(`/${locale}/thank-you?reservation=${reservation.id}`);
    } catch (error) {
      console.error('Reservation error:', error);
      alert(t('reserveForm.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (departures.length === 0) {
    return <p className="py-4 text-center text-gray-600">{t('noDates')}</p>;
  }

  return (
    <div className="space-y-4">
      {departures.map((departure) => {
        const isFull = departure.status === 'full';
        const isSelected = selectedDeparture === departure.id;

        return (
          <div
            key={departure.id}
            role="button"
            tabIndex={0}
            aria-disabled={isFull}
            className={`rounded-lg border p-4 transition-colors ${
              isFull
                ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
                : isSelected
                ? 'border-ocean-blue bg-ocean-blue/5'
                : 'cursor-pointer border-gray-200 hover:border-ocean-blue'
            }`}
            onClick={() => {
              if (!isFull) {
                setSelectedDeparture(departure.id);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isFull) {
                setSelectedDeparture(departure.id);
              }
            }}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="font-semibold">
                  {new Date(departure.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {departure.currentParticipants}/{departure.maxParticipants}{' '}
                  {t('participants')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('shipLabel')}: {departure.cruiseShip?.name ?? t('shipFallback')}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold ${
                  departure.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : isFull
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {departure.status === 'confirmed'
                  ? t('confirmed')
                  : isFull
                  ? t('full')
                  : t('pending')}
              </span>
            </div>

            {!isFull && (
              <div className="text-sm text-gray-600">
                {departure.maxParticipants - departure.currentParticipants}{' '}
                {t('spotsLeft')}
              </div>
            )}
          </div>
        );
      })}

      {selectedDeparture && (
        <form onSubmit={handleReserve} className="mt-6 border-t pt-6">
          <h3 className="mb-4 font-semibold">{t('reserveForm.title')}</h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('reserveForm.name')}
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('reserveForm.email')}
              </label>
              <input
                type="email"
                required
                value={formData.userEmail}
                onChange={(e) =>
                  setFormData({ ...formData, userEmail: e.target.value })
                }
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-secondary w-full"
            >
              {isSubmitting ? t('reserveForm.submitting') : t('reserveForm.submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
