import { Route, Routes } from 'react-router';

import { MainLayout, SimpleLayout } from '@shared/layouts';

import { HomePage } from '@features/home/pages/HomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/public" element={<div>Public area</div>} />
      </Route>
    </Routes>
  );
};
