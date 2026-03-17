import { useMsal } from '@azure/msal-react';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { getAccountRoles, hasAnyRole } from '@shared/auth';

type RequireRolesProps = PropsWithChildren & {
  allowedRoles: string[];
};

export const RequireRoles = ({ allowedRoles, children }: RequireRolesProps) => {
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  const roles = getAccountRoles(account);

  const isAllowed = hasAnyRole(roles, allowedRoles);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
