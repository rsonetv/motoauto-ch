export const locales = ['pl', 'de', 'fr', 'it'] as const;
export const defaultLocale = 'pl' as const;
export const localeConfig = {
  pl: { name: 'Polski', currency: 'CHF', numberFormat: 'pl-PL' },
  de: { name: 'Deutsch', currency: 'CHF', numberFormat: 'de-CH' },
  fr: { name: 'Français', currency: 'CHF', numberFormat: 'fr-CH' },
  it: { name: 'Italiano', currency: 'CHF', numberFormat: 'it-CH' }
};
