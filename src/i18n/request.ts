// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams, RequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams): Promise<RequestConfig> => {
  // Upewnij się, że locale nie jest undefined
  if (!locale) {
    throw new Error('Brak zdefiniowanego locale');
  }

  // Załaduj tłumaczenia dla danego locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,               // teraz zawsze string
    messages,             // załadowane tłumaczenia
    formats: {
      number: {
        price: { style: 'currency', currency: 'CHF' }
      }
    },
    timeZone: 'Europe/Zurich'
  };
});
