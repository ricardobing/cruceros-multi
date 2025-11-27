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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-ocean-blue"
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
            <span className="text-xl font-bold text-ocean-blue">{t('brand')}</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-gray-700 transition-colors hover:text-ocean-blue"
            >
              {t('home')}
            </Link>

            <div className="flex gap-2" aria-label={t('language')}>
              {languageOptions.map((option) => (
                <Link
                  key={option.code}
                  href={buildLocaleHref(option.code)}
                  className={`rounded px-3 py-1 ${
                    locale === option.code
                      ? 'bg-ocean-blue text-white'
                      : 'bg-gray-200 text-gray-700'
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
