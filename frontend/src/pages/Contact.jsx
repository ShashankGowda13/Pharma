import { useState } from 'react';
import { COMPANY_NAME } from '../constants/branding';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-lg pb-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Contact</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">We&apos;re listening</h1>
      <p className="mt-3 text-slate-600">
        Questions about orders, catalogue, or partnerships with {COMPANY_NAME}? Use the form below (demo — no email is
        sent).
      </p>

      {sent ? (
        <p className="mt-10 rounded-2xl border border-emerald-200/80 bg-emerald-50 p-5 text-sm font-medium text-emerald-900">
          Thanks — this demo does not send email. Connect this form to your API or provider in production.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-3xl border border-brand-200/50 bg-white/95 p-8 shadow-xl"
        >
          <div>
            <label className="text-sm font-semibold text-brand-900" htmlFor="cname">
              Name
            </label>
            <input
              id="cname"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-brand-900" htmlFor="cemail">
              Email
            </label>
            <input
              id="cemail"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-brand-900" htmlFor="cmsg">
              Message
            </label>
            <textarea
              id="cmsg"
              required
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-brand-900 py-3.5 text-sm font-bold text-white shadow-lg"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
