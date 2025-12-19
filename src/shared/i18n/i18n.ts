import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enHome from './locales/en/home.json';
import enShared from './locales/en/shared.json';
import esHome from './locales/es/home.json';
import esShared from './locales/es/shared.json';

export const DEFAULT_LANGUAGE = 'en' as const;

export const i18nNamespaces = ['shared', 'home'] as const;
export type I18nNamespace = (typeof i18nNamespaces)[number];

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  ns: i18nNamespaces,
  defaultNS: 'shared',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      shared: enShared,
      home: enHome,
    },
    es: {
      shared: esShared,
      home: esHome,
    },
  },
});

export { i18n };
