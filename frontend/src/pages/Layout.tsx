import { FC } from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header.tsx';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white">
      <Header />
      <div className="container" data-testid="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
