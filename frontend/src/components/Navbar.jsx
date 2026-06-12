import { Link, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // auth removed
// import { useCart } from '../context/CartContext';
import { COMPANY_NAME } from '../constants/branding';

const linkClass = ({ isActive }) =>
  `px-4 py-2 rounded-xl text-base font-bold transition ${isActive
    ? 'bg-brand-700 text-white shadow-md shadow-brand-700/25'
    : 'text-slate-700 hover:bg-white/80 hover:text-brand-800'
  }`;

export default function Navbar() {
  // Auth removed
  // useCart removed

  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-white/85 shadow-sm shadow-teal-900/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 font-display text-sm font-bold text-amber-100 shadow-lg shadow-brand-900/30 ring-2 ring-amber-400/30 transition group-hover:ring-amber-400/60">
            <img src="./logo.jpg"></img>
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

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>

        </nav>

        <div className="flex shrink-0 items-center gap-2">

        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-t border-teal-900/5 bg-white/70 px-2 py-2 lg:hidden">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

      </div>
    </header>
  );
}
