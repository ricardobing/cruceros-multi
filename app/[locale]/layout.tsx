import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import Navigation from '@/components/Navigation';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return ( <html lang={locale}> <body> <NextIntlClientProvider messages={messages}> <Navigation /> <main>{children}</main> </NextIntlClientProvider> </body> </html> );
}
