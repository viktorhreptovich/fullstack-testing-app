import { FC } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';

const Header: FC = () => {
  const isAuth = false;
  return (
    <header className="flex items-center bg-slate-800 px-4 py-2 shadow-sm backdrop-blur-sm" data-testid="header">
      <Link to="/" data-testid="link-logo">
        <FaBtc size={20} data-testid="icon" />
      </Link>
      {/*menu*/}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5" data-testid="menu">
            <li data-testid="menu-item">
              <NavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
                data-testid="link-home">
                Home
              </NavLink>
            </li>
            <li data-testid="menu-item">
              <NavLink
                to={'/categories'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
                data-testid="link-categories">
                Categories
              </NavLink>
            </li>
            <li data-testid="menu-item">
              <NavLink
                to={'/transactions'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
                data-testid="link-transactions">
                Transactions
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {/*auth*/}
      {isAuth ? (
        <button className="btn btn-red" data-testid="btn-logout">
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <div className="ml-auto py-2">
          <Link
            to={'signin'}
            className="ml-auto border-r px-2 py-2 text-white/50 hover:text-white"
            data-testid="link-login">
            Sign In
          </Link>
          <Link to={'signup'} className="ml-auto px-2 py-2 text-white/50 hover:text-white" data-testid="link-login">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
