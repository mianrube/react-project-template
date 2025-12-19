import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@store';

export const I18nStoreSync = () => {
  const { i18n } = useTranslation();
  const language = useAppSelector((state) => state.ui.language);

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return null;
};
