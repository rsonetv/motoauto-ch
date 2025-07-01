export const routing = defineRouting({
  locales: ['pl', 'de', 'fr', 'it'],
  defaultLocale: 'pl',
  pathnames: {
    '/': '/',
    '/auctions': { pl: '/aukcje', de: '/auktionen', fr: '/encheres', it: '/aste' },
    '/vehicles': { pl: '/pojazdy', de: '/fahrzeuge', fr: '/vehicules', it: '/veicoli' }
  }
});
