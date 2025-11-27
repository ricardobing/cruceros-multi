'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeparturesListProps {
  departures: any[];
  excursionId: string;
  locale: string;
}

export default function DeparturesList({
  departures,
  excursionId,
  locale,
}: DeparturesListProps) {
  const t = useTranslations('detail');
  const router = useRouter();
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [formData, setFormData] = useState({ userName: '', userEmail: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeparture) return;

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

      if (response.ok) {
        const reservation = await response.json();
        router.push(`/${locale}/thank-you?reservation=${reservation.id}`);
      } else {
        alert('Error creating reservation');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      alert('Error creating reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (departures.length === 0) {
    return (
      <p className="text-gray-600 text-center py-4">No dates available</p>
    );
  }

  return (
    <div className="space-y-4">
      {departures.map((departure) => (
        <div
          key={departure.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedDeparture === departure.id
              ? 'border-ocean-blue bg-ocean-blue/5'
              : 'border-gray-200 hover:border-ocean-blue'
          }`}
          onClick={() => setSelectedDeparture(departure.id)}
        >
          <div className="flex justify-between items-start mb-2">
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
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                departure.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : departure.status === 'full'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {departure.status === 'confirmed'
                ? t('confirmed')
                : departure.status === 'full'
                ? t('full')
                : t('pending')}
            </span>
          </div>

          {departure.status !== 'full' && (
            <div className="text-sm text-gray-600">
              {departure.maxParticipants - departure.currentParticipants}{' '}
              {t('spotsLeft')}
            </div>
          )}
        </div>
      ))}

      {selectedDeparture && (
        <form onSubmit={handleReserve} className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-4">{t('reserveForm.title')}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
