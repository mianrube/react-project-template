import { Outlet } from 'react-router';

export const SimpleLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
