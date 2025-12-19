import { Route, Routes } from 'react-router';

import { RequireAuth, RequireRoles } from '@shared/auth';
import { MainLayout, SimpleLayout } from '@shared/layouts';

import { AdminPage } from '@features/admin/pages/AdminPage';
import { HomePage } from '@features/home/pages/HomePage';
import { ProtectedPage } from '@features/protected/pages/ProtectedPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

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
                <AdminPage />
              </RequireRoles>
            </RequireAuth>
          }
        />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/public" element={<div>Public area</div>} />
      </Route>
    </Routes>
  );
};
