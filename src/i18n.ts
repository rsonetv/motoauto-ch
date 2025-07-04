import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './i18n.config';
import type { GetRequestConfigParams, RequestConfig } from 'next-intl/server';

export default getRequestConfig(
  async ({ locale }: GetRequestConfigParams): Promise<RequestConfig> => {
    // Jeśli locale nie jest ustawione lub nieobsługiwane, zwróć 404
    if (!locale || !locales.includes(locale as any)) {
      notFound();
    }

    // Załaduj plik z tłumaczeniami dla wybranego locale
    const messages = (await import(`../locales/${locale}.json`)).default;

    // Zwróć zarówno locale, jak i messages zgodnie z typem RequestConfig
    return {
      locale,
      messages
    };
  }
);
