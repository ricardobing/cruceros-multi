'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-ocean-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xl font-bold text-ocean-blue">
              Cruise Excursions
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-ocean-blue transition-colors"
            >
              {t('home')}
            </Link>

            <div className="flex gap-2">
              <Link
                href="/en"
                className={`px-3 py-1 rounded ${
                  locale === 'en'
                    ? 'bg-ocean-blue text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                EN
              </Link>
              <Link
                href="/es"
                className={`px-3 py-1 rounded ${
                  locale === 'es'
                    ? 'bg-ocean-blue text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                ES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
