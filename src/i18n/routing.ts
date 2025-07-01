import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],         // lista obsługiwanych języków
  defaultLocale: 'pl',           // domyślny język
  localePrefix: 'as-needed'      // brak prefiksu dla domyślnego locale
});
