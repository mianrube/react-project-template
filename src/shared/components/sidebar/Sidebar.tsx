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
      <List dense sx={{ display: 'grid', gap: 0.5, px: 1.25, py: 1.25 }}>
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
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2.5,
                justifyContent: showLabels ? 'initial' : 'center',
                minHeight: 44,
                color: 'text.secondary',
                px: showLabels ? 1.5 : 1,
                transition: (currentTheme) =>
                  currentTheme.transitions.create(['background-color', 'color', 'transform'], {
                    duration: currentTheme.transitions.duration.shorter,
                  }),
                '&:hover': {
                  bgcolor: 'action.hover',
                  color: 'text.primary',
                },
                '&.active': {
                  bgcolor: (currentTheme) => alpha(currentTheme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  boxShadow: (currentTheme) =>
                    `inset 0 0 0 1px ${alpha(currentTheme.palette.primary.main, 0.18)}`,
                },
                '&.active::before': {
                  content: '""',
                  position: 'absolute',
                  left: 8,
                  top: 9,
                  bottom: 9,
                  width: 3,
                  borderRadius: 999,
                  bgcolor: 'primary.main',
                },
              }}
            >
              {item.icon ? (
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    justifyContent: 'center',
                    minWidth: showLabels ? 38 : 'auto',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              ) : null}

              {showLabels ? (
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: { fontSize: 14, fontWeight: 600, lineHeight: 1.2 },
                  }}
                />
              ) : null}
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
    <Stack sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <Stack
        direction="row"
        spacing={1}
        sx={(currentTheme) => ({
          alignItems: 'center',
          backgroundColor: alpha(currentTheme.palette.background.paper, 0.92),
          justifyContent: isMobile || isDesktopExpanded ? 'space-between' : 'center',
          px: 1.25,
          py: 1,
          position: 'relative',
          zIndex: 1,
          boxShadow: `inset 0 -1px 0 ${alpha(currentTheme.palette.text.primary, 0.06)}`,
        })}
      >
        {isMobile || isDesktopExpanded ? (
          <Typography
            noWrap
            sx={{ px: 0.75, color: 'text.secondary', fontWeight: 700, letterSpacing: 0.4 }}
            variant="subtitle2"
          >
            {tSidebar('navigation')}
          </Typography>
        ) : null}

        <Tooltip title={isMobile ? tSidebar('closeNavigation') : collapseTooltip} arrow>
          <IconButton
            aria-label={isMobile ? tSidebar('closeNavigation') : collapseTooltip}
            onClick={isMobile ? handleCloseMobileSidebar : handleToggleDesktopSidebar}
            size="small"
            sx={(currentTheme) => ({
              borderRadius: 2,
              color: 'text.secondary',
              border: `1px solid ${alpha(currentTheme.palette.text.primary, 0.08)}`,
              bgcolor:
                currentTheme.palette.mode === 'light'
                  ? alpha(currentTheme.palette.background.default, 0.9)
                  : alpha(currentTheme.palette.common.white, 0.04),
              transition: currentTheme.transitions.create(
                ['background-color', 'border-color', 'color'],
                {
                  duration: currentTheme.transitions.duration.shortest,
                },
              ),
              '&:hover': {
                color: 'text.primary',
                borderColor: alpha(currentTheme.palette.text.primary, 0.12),
                bgcolor:
                  currentTheme.palette.mode === 'light'
                    ? alpha(currentTheme.palette.primary.main, 0.06)
                    : alpha(currentTheme.palette.common.white, 0.08),
              },
            })}
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
            boxShadow: `2px 0 12px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.08 : 0.28)}`,
            borderRight: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.1 : 0.06)}`,
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
        borderRight: (currentTheme) =>
          `1px solid ${alpha(currentTheme.palette.text.primary, currentTheme.palette.mode === 'light' ? 0.1 : 0.05)}`,
        boxShadow: `2px 0 8px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.03 : 0.18)}`,
        display: { xs: 'none', md: 'block' },
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        transition: theme.transitions.create(['width', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: currentDesktopWidth,
        '&::after': {
          background: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.025 : 0.08)} 100%)`,
          content: '""',
          inset: '0 0 0 auto',
          pointerEvents: 'none',
          position: 'absolute',
          width: 8,
        },
      }}
    >
      {sidebarContent}
    </Box>
  );
};
