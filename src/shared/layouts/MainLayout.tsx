import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <div>
      <header>Main layout</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
