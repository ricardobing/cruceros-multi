'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const languageOptions = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function Navigation() {
  const t = useTranslations('nav');
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || 'en';

  const buildLocaleHref = (targetLocale: string) => {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return `/${targetLocale}`;
    }

    segments[0] = targetLocale;
    return `/${segments.join('/')}`;
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-ocean-blue to-ocean-light p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-ocean-dark to-ocean-blue bg-clip-text text-transparent">{t('brand')}</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="text-gray-700 font-medium transition-colors hover:text-ocean-blue relative group"
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-blue group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="flex gap-2 bg-gray-100 rounded-xl p-1" aria-label={t('language')}>
              {languageOptions.map((option) => (
                <Link
                  key={option.code}
                  href={buildLocaleHref(option.code)}
                  className={`rounded-lg px-4 py-2 font-semibold transition-all duration-300 ${
                    locale === option.code
                      ? 'bg-gradient-to-r from-ocean-blue to-ocean-light text-white shadow-soft'
                      : 'text-gray-600 hover:text-ocean-blue'
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
