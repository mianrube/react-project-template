import type { ReactNode } from "react";

export type NavItem = {
  id: string;
  labelKey: string; // i18n key for the label
  to: string;
  icon?: ReactNode;
  allowedRoles?: string[]; // undefined => public
}