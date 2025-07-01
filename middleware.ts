import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  domains: [
    { domain: 'motoauto.ch', defaultLocale: 'pl' },
    { domain: 'de.motoauto.ch', defaultLocale: 'de' },
    { domain: 'fr.motoauto.ch', defaultLocale: 'fr' },
    { domain: 'it.motoauto.ch', defaultLocale: 'it' }
  ]
});
export const config = { matcher: ['/((?!api|_next|favicon.ico).*)'] };
