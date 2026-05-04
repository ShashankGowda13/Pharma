import { COMPANY_NAME, COMPANY_TAGLINE } from '../constants/branding';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl pb-12">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">About us</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{COMPANY_NAME}</h1>
      <p className="mt-4 text-xl font-medium text-brand-800/90">{COMPANY_TAGLINE}</p>
      <p className="mt-6 text-lg leading-relaxed text-slate-600">
        {COMPANY_NAME} is crafted as a modern wellness storefront — calm visuals, clear navigation, and a smooth path
        from discovery to checkout. We support cash on delivery and a mock online payment flow for demos, with prices
        shown in Indian Rupees (INR).
      </p>
      <p className="mt-6 leading-relaxed text-slate-600">
        This experience does not replace licensed pharmacy operations or medical advice. Always consult a qualified
        healthcare professional before using medications or supplements.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-200/60 bg-white/90 p-6 shadow-md">
          <h2 className="font-display text-lg font-bold text-brand-900">Quality & clarity</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Structured catalogue, stock visibility, and careful UI copy.</p>
        </div>
        <div className="rounded-2xl border border-brand-200/60 bg-white/90 p-6 shadow-md">
          <h2 className="font-display text-lg font-bold text-brand-900">Operations-ready</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Separate staff tools with dashboards and order management.</p>
        </div>
      </div>
    </div>
  );
}
