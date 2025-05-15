import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Analytics } from '@vercel/analytics/next';

const Layout: FC = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <main>
        <Outlet />
      </main>
      <Analytics />
    </div>
  );
};

export default Layout;
