import { useCallback } from 'react';

import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { I18nNamespace } from '@shared/i18n/i18n';

export type UseScopedTranslationOptions = {
  ns?: I18nNamespace;
};

export const useScopedTranslation = (
  baseKey: string,
  options?: UseScopedTranslationOptions,
): { tScoped: TFunction; t: TFunction } => {
  const { t } = useTranslation(options?.ns);

  const tScoped: TFunction = useCallback(
    (key: string, translationOptions?: unknown) =>
      t(`${baseKey}.${key}`, translationOptions as never),
    [t, baseKey],
  ) as TFunction;

  return { tScoped, t };
};
