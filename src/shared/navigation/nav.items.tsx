import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import type { NavItem } from './nav.types';

export const navItems: NavItem[] = [
  {
    id: 'home',
    labelKey: 'shared.navigation.home',
    to: '/',
    icon: <HomeIcon fontSize="small" />,
  },
  {
    id: 'faqs',
    labelKey: 'shared.navigation.faqs',
    to: '/faqs',
    icon: <QuestionAnswerOutlinedIcon fontSize="small" />,
  },
  {
    id: 'tenders',
    labelKey: 'shared.navigation.tenders',
    to: '/tenders',
    icon: <AssignmentOutlinedIcon fontSize="small" />,
  },
  {
    id: 'protected',
    labelKey: 'shared.navigation.protected',
    to: '/protected',
    icon: <LockIcon fontSize="small" />,
  },
  {
    id: 'admin',
    labelKey: 'shared.navigation.admin',
    to: '/admin',
    icon: <AdminPanelSettingsIcon fontSize="small" />,
    allowedRoles: ['Chat.Admin'],
  },
];
