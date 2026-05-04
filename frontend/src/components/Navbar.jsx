import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { COMPANY_NAME } from '../constants/branding';

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-medium transition ${
    isActive
      ? 'bg-brand-700 text-white shadow-md shadow-brand-700/25'
      : 'text-slate-700 hover:bg-white/80 hover:text-brand-800'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-white/85 shadow-sm shadow-teal-900/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 font-display text-sm font-bold text-amber-100 shadow-lg shadow-brand-900/30 ring-2 ring-amber-400/30 transition group-hover:ring-amber-400/60">
            CP
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-brand-900 sm:text-lg">
              {COMPANY_NAME}
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-widest text-brand-600/90 sm:block">
              Wellness & care
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            {count > 0 && (
              <span className="ml-1.5 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-bold text-brand-950">{count}</span>
            )}
          </NavLink>
          <Link
            to="/cart"
            className="hidden rounded-xl bg-gradient-to-r from-accent-500 to-amber-500 px-3 py-2 text-sm font-bold text-brand-950 shadow-md shadow-amber-900/20 hover:from-accent-400 hover:to-amber-400 xl:inline-flex"
          >
            Place order
          </Link>
          <NavLink to="/track-order" className={linkClass}>
            Track order
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/orders" className={linkClass}>
              Orders
            </NavLink>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <span className="hidden max-w-[120px] truncate text-sm text-slate-600 xl:inline">Hi, {user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-800"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/90 hover:text-brand-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-800 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-brand-700/30 hover:from-brand-500 hover:to-brand-700 sm:px-4"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-t border-teal-900/5 bg-white/70 px-2 py-2 lg:hidden">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          Cart ({count})
        </NavLink>
        <NavLink to="/track-order" className={linkClass}>
          Track
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
        {user && (
          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>
        )}
      </div>
    </header>
  );
}
