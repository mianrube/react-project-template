import type { AccountInfo } from '@azure/msal-browser';

type IdTokenClaimsWithRoles = {
  roles?: string[];
};

export const getAccountRoles = (account: AccountInfo | null): string[] => {
  const claims = account?.idTokenClaims as IdTokenClaimsWithRoles | undefined;
  return claims?.roles ?? [];
};

export const hasAnyRole = (userRoles: string[], allowedRoles: string[]): boolean => {
  if (allowedRoles.length === 0) return true;
  const set = new Set(userRoles);
  return allowedRoles.some((r) => set.has(r));
};
