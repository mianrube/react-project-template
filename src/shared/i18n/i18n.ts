import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enFaqs from './locales/en/faqs.json';
import enHome from './locales/en/home.json';
import enShared from './locales/en/shared.json';
import enTenders from './locales/en/tenders.json';
import esFaqs from './locales/es/faqs.json';
import esHome from './locales/es/home.json';
import esShared from './locales/es/shared.json';
import esTenders from './locales/es/tenders.json';

export const DEFAULT_LANGUAGE = 'en' as const;

export const i18nNamespaces = ['shared', 'home', 'tenders', 'faqs'] as const;
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
      faqs: enFaqs,
      tenders: enTenders,
    },
    es: {
      shared: esShared,
      home: esHome,
      faqs: esFaqs,
      tenders: esTenders,
    },
  },
});

export { i18n };
