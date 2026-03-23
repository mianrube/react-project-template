import { Outlet, Route, Routes } from 'react-router';

import { RequireAuth, RequireRoles } from '@shared/auth';
import { MainLayout, SimpleLayout } from '@shared/layouts';
import { NotFoundPage, UnauthorizedPage } from '@shared/pages';

import { AdminPage } from '@features/admin/pages/AdminPage';
import { FaqManagementPage, FaqsPage } from '@features/faqs/pages';
import { HomePage } from '@features/home/pages/HomePage';
import { ProtectedPage } from '@features/protected/pages/ProtectedPage';
import { TendersListPage } from '@features/tenders/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/tenders" element={<TendersListPage />} />

        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RequireRoles allowedRoles={['Chat.Admin']}>
                <Outlet />
              </RequireRoles>
            </RequireAuth>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="faqs" element={<FaqManagementPage />} />
        </Route>
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/public" element={<div>Public area</div>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
