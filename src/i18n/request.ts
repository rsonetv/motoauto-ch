export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}.json`)).default,
  formats: {
    number: {
      price: { style: 'currency', currency: 'CHF' }
    }
  },
  timeZone: 'Europe/Zurich'
}));
