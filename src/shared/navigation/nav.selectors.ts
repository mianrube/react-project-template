import type { NavItem } from './nav.types';

export const filterNavItemsByRoles = (items: NavItem[], roles: string[]): NavItem[] => {
  const set = new Set(roles);

  return items.filter((item) => {
    if (!item.allowedRoles || item.allowedRoles.length === 0) return true;
    return item.allowedRoles.some((r) => set.has(r));
  });
};