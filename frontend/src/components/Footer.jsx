import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_TAGLINE } from '../constants/branding';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

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
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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

            </ul>

          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/95 text-center">Administrative Office</p>
            <div className="mt-4 text-sm text-center text-teal-100/85">
              <p>Cherishya Pharma</p>
              <p>P.No. 11, 11/A, 11/B, Ground Floor, Shop No 1, 2nd Stage, Bogadi, Mysore – 570026</p>
              <p>
                <a href="https://maps.app.goo.gl/XZooaRHZuKHyqcNHA" target="_blank" rel="noopener noreferrer" className="underline text-teal-200 hover:text-white">
                  Location on Google map
                </a>
              </p>
              <p>Mobile – 8073353836</p>
              <p>Mail id – <a href="mailto:cherishyapharma@gmail.com" className="underline text-teal-200 hover:text-white">cherishyapharma@gmail.com</a></p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/95 text-center">Team</p>
            <div className="flex flex-col items-center mt-2">
              <Link
                to="/admin/login"
                className="inline-flex rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-amber-100 ring-1 ring-amber-400/30 transition hover:bg-white/15 hover:text-white hover:ring-amber-300/50"
              >
                Staff portal
              </Link>


            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://wa.me/918073353836" target="_blank" rel="noopener noreferrer" className="text-teal-200 hover:text-white" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" aria-label="WhatsApp" />
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-teal-200 hover:text-white" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" aria-label="Instagram" />
              </a>
            </div>
          </div>

        </div>
      </div>





    </footer>
  );
}
