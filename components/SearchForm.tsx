'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchForm() {
  const t = useTranslations('home.search');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [ships, setShips] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [formData, setFormData] = useState({ ship: '', destination: '', date: '' });

  useEffect(() => {
    Promise.all([ fetch('/api/ships').then((r) => r.json()), fetch('/api/destinations').then((r) => r.json()) ]).then(([shipsData, destinationsData]) => { setShips(shipsData); setDestinations(destinationsData); });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (formData.ship) searchParams.set('ship', formData.ship);
    if (formData.destination) searchParams.set('destination', formData.destination);
    if (formData.date) searchParams.set('date', formData.date);
    router.push(`/${locale}/excursions?${searchParams.toString()}`);
  };

  return ( <form onSubmit={handleSubmit} className="card p-8 max-w-4xl mx-auto"> <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-2">{t('ship')}</label> <select value={formData.ship} onChange={(e) => setFormData({ ...formData, ship: e.target.value })} className="input-field"> <option value="">{t('allShips')}</option> {ships.map((ship) => ( <option key={ship.id} value={ship.id}>{ship.name}</option> ))} </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-2">{t('destination')}</label> <select value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className="input-field"> <option value="">{t('allDestinations')}</option> {destinations.map((dest) => ( <option key={dest.id} value={dest.id}>{dest.name}</option> ))} </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-2">{t('date')}</label> <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="input-field" min={new Date().toISOString().split('T')[0]} /> </div> <div className="flex items-end"> <button type="submit" className="btn-primary w-full">{t('button')}</button> </div> </div> </form> );
}
