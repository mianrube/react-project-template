import { useMsal } from '@azure/msal-react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router';

import { getAccountRoles } from '@shared/auth';
import { useScopedTranslation } from '@shared/hooks';
import { filterNavItemsByRoles, navItems } from '@shared/navigation';

import { setMobileSidebarOpen, toggleSidebarExpanded, type UiState } from '@features/ui/store';

import { useAppDispatch, useAppSelector } from '@store';

const NAVIGATION_KEY = 'navigation';
const SIDEBAR_KEY = 'sidebar';
const DESKTOP_SIDEBAR_WIDTH = 240;
const COLLAPSED_SIDEBAR_WIDTH = 72;
const MOBILE_SIDEBAR_WIDTH = 280;

export const Sidebar = () => {
  const { tScoped: tNavigation } = useScopedTranslation(NAVIGATION_KEY, { ns: 'shared' });
  const { tScoped: tSidebar } = useScopedTranslation(SIDEBAR_KEY, { ns: 'shared' });
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarExpanded = useAppSelector((state: { ui: UiState }) => state.ui.sidebarExpanded);
  const mobileSidebarOpen = useAppSelector((state: { ui: UiState }) => state.ui.mobileSidebarOpen);

  const { instance, accounts } = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  const roles = getAccountRoles(account);

  const items = filterNavItemsByRoles(navItems, roles);
  const isDesktopExpanded = !isMobile && sidebarExpanded;
  const currentDesktopWidth = isDesktopExpanded ? DESKTOP_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH;

  const handleToggleDesktopSidebar = () => {
    dispatch(toggleSidebarExpanded());
  };

  const handleCloseMobileSidebar = () => {
    dispatch(setMobileSidebarOpen(false));
  };

  const collapseTooltip = isDesktopExpanded
    ? tSidebar('collapseNavigation')
    : tSidebar('expandNavigation');

  const renderNavigationList = (showLabels: boolean) => {
    return (
      <List dense sx={{ px: 1, py: 1 }}>
        {items.map((item) => {
          const label = tNavigation(item.id);

          const button = (
            <ListItemButton
              key={item.id}
              aria-label={label}
              component={NavLink}
              onClick={isMobile ? handleCloseMobileSidebar : undefined}
              to={item.to}
              sx={{
                borderRadius: 2,
                justifyContent: showLabels ? 'initial' : 'center',
                minHeight: 44,
                px: showLabels ? 1.5 : 1,
                '&.active': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              {item.icon ? (
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    justifyContent: 'center',
                    minWidth: showLabels ? 36 : 'auto',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              ) : null}

              {showLabels ? <ListItemText primary={label} /> : null}
            </ListItemButton>
          );

          if (showLabels) {
            return button;
          }

          return (
            <Tooltip key={item.id} title={label} placement="right" arrow>
              {button}
            </Tooltip>
          );
        })}
      </List>
    );
  };

  const sidebarContent = (
    <Stack sx={{ height: '100%' }}>
      <Stack
        direction="row"
        spacing={1}
        sx={(currentTheme) => ({
          alignItems: 'center',
          backgroundColor: alpha(currentTheme.palette.background.paper, 0.92),
          justifyContent: isMobile || isDesktopExpanded ? 'space-between' : 'center',
          p: 1,
          position: 'relative',
          zIndex: 1,
          boxShadow: `inset 0 -1px 0 ${alpha(currentTheme.palette.text.primary, 0.06)}`,
        })}
      >
        {isMobile || isDesktopExpanded ? (
          <Typography noWrap sx={{ px: 1 }} variant="subtitle2">
            {tSidebar('navigation')}
          </Typography>
        ) : null}

        <Tooltip title={isMobile ? tSidebar('closeNavigation') : collapseTooltip} arrow>
          <IconButton
            aria-label={isMobile ? tSidebar('closeNavigation') : collapseTooltip}
            onClick={isMobile ? handleCloseMobileSidebar : handleToggleDesktopSidebar}
            size="small"
            sx={{
              borderRadius: 2,
            }}
          >
            {isMobile ? <CloseOutlinedIcon /> : null}
            {!isMobile ? (
              <ViewSidebarOutlinedIcon
                sx={{
                  transform: isDesktopExpanded ? 'scaleX(1)' : 'scaleX(-1)',
                  transition: theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              />
            ) : null}
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {renderNavigationList(isMobile || isDesktopExpanded)}
      </Box>
    </Stack>
  );

  if (isMobile) {
    return (
      <Drawer
        ModalProps={{ keepMounted: true }}
        onClose={handleCloseMobileSidebar}
        open={mobileSidebarOpen}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.paper,
            boxSizing: 'border-box',
            boxShadow: `8px 0 32px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.12 : 0.36)}`,
            width: MOBILE_SIDEBAR_WIDTH,
          },
        }}
        variant="temporary"
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: `8px 0 24px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.04 : 0.24)}`,
        display: { xs: 'none', md: 'block' },
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        transition: theme.transitions.create(['width', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: currentDesktopWidth,
        '&::after': {
          background: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.04 : 0.12)} 100%)`,
          content: '""',
          inset: '0 0 0 auto',
          pointerEvents: 'none',
          position: 'absolute',
          width: 12,
        },
      }}
    >
      {sidebarContent}
    </Box>
  );
};
