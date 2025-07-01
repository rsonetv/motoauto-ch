import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// Middleware obsługuje negocjację locale i przekierowania
export default createMiddleware(routing);

export const config = {
  // dopasuj wszystkie ścieżki oprócz /api, /_next i plików statycznych
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};