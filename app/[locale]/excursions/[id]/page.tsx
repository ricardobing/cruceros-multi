import { useTranslations } from 'next-intl';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeparturesList from '@/components/DeparturesList';

export default async function ExcursionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const excursion = await prisma.excursion.findUnique({ where: { id }, include: { destination: true, departures: { where: { date: { gte: new Date() }, status: { not: 'full' } }, orderBy: { date: 'asc' } } } });
  if (!excursion) { notFound(); }
  const t = useTranslations('detail');
  return ( <div className="container mx-auto px-4 py-8"> <div className="mb-6"> <Link href={`/${locale}/excursions`} className="text-ocean-blue hover:text-ocean-dark flex items-center gap-2"> <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> </svg> {t('backToList')} </Link> </div> <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div className="lg:col-span-2"> <div className="card p-8"> <div className="flex items-center gap-2 text-ocean-blue mb-4"> <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> <span className="font-semibold">{excursion.destination.name}</span> </div> <h1 className="text-4xl font-bold text-gray-900 mb-6">{excursion.title}</h1> <div className="mb-8"> <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2> <p className="text-gray-700 leading-relaxed whitespace-pre-line">{excursion.description}</p> </div> <div className="h-64 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800)' }} /> </div> </div> <div> <div className="card p-6 sticky top-4"> <h2 className="text-2xl font-semibold mb-4">{t('availableDates')}</h2> <DeparturesList departures={excursion.departures} excursionId={excursion.id} locale={locale} /> </div> </div> </div> </div> );
}
