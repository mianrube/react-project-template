export const mapI18nLanguageToLocale = (language: string): string => {
  // Normalize possible values like "en-US" or "es-ES"
  if (language.startsWith('es')) return 'es';
  return 'en';
};
