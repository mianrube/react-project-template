const STORAGE_KEY = 'auth.returnUrl';

export const storeReturnUrl = (url: string): void => {
  sessionStorage.setItem(STORAGE_KEY, url);
};

export const consumeReturnUrl = (): string | null => {
  const url = sessionStorage.getItem(STORAGE_KEY);
  if (!url) return null;
  sessionStorage.removeItem(STORAGE_KEY);
  return url;
};
