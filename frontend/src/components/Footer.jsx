import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_TAGLINE } from '../constants/branding';

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-gradient-to-br from-cyan-900 via-teal-950 to-indigo-950 text-slate-200 shadow-[0_-12px_40px_-12px_rgba(15,118,110,0.35)]">
      <div
        className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-teal-400 to-indigo-400"
        aria-hidden
      />
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-teal-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">{COMPANY_NAME}</p>
            <p className="mt-2 bg-gradient-to-r from-amber-200 to-teal-200 bg-clip-text text-sm font-semibold text-transparent">
              {COMPANY_TAGLINE}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-teal-100/85">
              Quality-assured health essentials with a calm, modern shopping experience. Always follow your physician&apos;s
              guidance for medicines.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/95">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-teal-100/90 transition hover:translate-x-0.5 hover:text-white inline-block"
                >
                  Shop catalogue
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-teal-100/90 transition hover:translate-x-0.5 hover:text-white inline-block"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-teal-100/90 transition hover:translate-x-0.5 hover:text-white inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-teal-100/90 transition hover:translate-x-0.5 hover:text-white inline-block"
                >
                  Place order
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-teal-100/90 transition hover:translate-x-0.5 hover:text-white inline-block"
                >
                  Track order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/95">Team</p>
            <p className="mt-5 text-sm">
              <Link
                to="/admin/login"
                className="inline-flex rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-amber-100 ring-1 ring-amber-400/30 transition hover:bg-white/15 hover:text-white hover:ring-amber-300/50"
              >
                Staff portal
              </Link>
            </p>
            <p className="mt-6 text-xs leading-relaxed text-teal-200/45">
              Demo storefront — not for dispensing prescription medication without proper licensing.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 py-5 text-center text-xs text-teal-200/55 backdrop-blur-sm">
        © {new Date().getFullYear()} {COMPANY_NAME}
      </div>
    </footer>
  );
}
