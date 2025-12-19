import { useMsal } from '@azure/msal-react';
import type { PropsWithChildren } from 'react';

import { getAccountRoles, hasAnyRole } from '@shared/auth/claims';

type RequireRolesProps = PropsWithChildren & {
  allowedRoles: string[];
};

export const RequireRoles = ({ allowedRoles, children }: RequireRolesProps) => {
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  const roles = getAccountRoles(account);

  const isAllowed = hasAnyRole(roles, allowedRoles);

  if (!isAllowed) {
    return <div>Unauthorized</div>;
  }

  return children;
};
