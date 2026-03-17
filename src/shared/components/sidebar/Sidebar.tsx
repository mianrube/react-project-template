import { useMsal } from '@azure/msal-react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router';

import { getAccountRoles } from '@shared/auth';
import { useScopedTranslation } from '@shared/hooks';
import { filterNavItemsByRoles, navItems } from '@shared/navigation';

const BASE_KEY = 'navigation';

export const Sidebar = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'shared' });

  const { instance, accounts } = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  const roles = getAccountRoles(account);

  const items = filterNavItemsByRoles(navItems, roles);

  return (
    <Box sx={{ width: 240, borderRight: 1, borderColor: 'divider' }}>
      <List dense>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            component={NavLink}
            to={item.to}
            sx={{
              '&.active': {
                bgcolor: 'action.selected',
              },
            }}
          >
            {item.icon ? <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon> : null}
            <ListItemText primary={tScoped(item.id)} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
