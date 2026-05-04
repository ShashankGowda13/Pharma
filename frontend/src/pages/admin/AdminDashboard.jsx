import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import api from '../../services/api';
import { formatINR } from '../../utils/formatPrice';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-900/95 px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 font-semibold text-slate-200">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-slate-300">
          <span className="text-slate-500">{p.name}:</span>{' '}
          {p.dataKey === 'orders' ? p.value : formatINR(p.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: d } = await api.get('/api/admin/dashboard', { admin: true });
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) {
          setErr(
            e.response?.data?.message ||
              (e.response?.status === 401 ? 'Session expired — log in again.' : 'Failed to load dashboard')
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const chartKey = useMemo(() => (data ? `${data.totalOrders}-${data.monthly?.length}` : '0'), [data]);

  if (err) {
    return (
      <div className="rounded-2xl border border-red-800/50 bg-red-950/40 p-6 text-red-300">
        <p className="font-semibold">Dashboard unavailable</p>
        <p className="mt-2 text-sm text-red-200/80">{err}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
        <p>Loading analytics…</p>
      </div>
    );
  }

  const monthly = data.monthly || [];
  const weekly = data.weekly || [];

  const kpi = [
    {
      label: 'Lifetime revenue',
      value: formatINR(data.totalRevenue ?? 0),
      sub: 'All non-cancelled orders',
      accent: 'from-teal-500/20 to-teal-900/20',
    },
    {
      label: 'Est. gross profit',
      value: formatINR(data.totalProfit ?? 0),
      sub: 'From sale price − cost price × qty',
      accent: 'from-amber-500/20 to-amber-900/20',
    },
    {
      label: 'Total orders',
      value: data.totalOrders ?? 0,
      sub: 'All time',
      accent: 'from-indigo-500/20 to-indigo-950/30',
    },
    {
      label: 'Customers',
      value: data.totalUsers ?? 0,
      sub: 'Registered shoppers',
      accent: 'from-cyan-500/20 to-cyan-950/30',
    },
    {
      label: 'Live products',
      value: data.totalProducts ?? 0,
      sub: 'Active in storefront',
      accent: 'from-emerald-500/20 to-emerald-950/30',
    },
  ];

  return (
    <div className="space-y-10 pb-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Analytics dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Monthly & weekly order volume, revenue, and profit (set <strong className="text-teal-300">cost price</strong> on
          each product for accurate margin).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpi.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border border-slate-700/80 bg-gradient-to-br ${c.accent} p-5 shadow-lg backdrop-blur`}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{c.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-white">{c.value}</p>
            <p className="mt-1 text-xs text-slate-500">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-xl">
          <h2 className="font-display text-lg font-semibold text-white">This month — daily performance</h2>
          <p className="mt-1 text-xs text-slate-500">Orders (bars) · Revenue (teal) · Profit (gold line)</p>
          <div className="mt-4 h-80 w-full min-w-0">
            <ResponsiveContainer key={`m-${chartKey}`} width="100%" height="100%" debounce={50}>
              <ComposedChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis yAxisId="orders" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} width={36} />
                <YAxis
                  yAxisId="inr"
                  orientation="right"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
                  width={44}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar yAxisId="orders" dataKey="orders" name="Orders" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar yAxisId="inr" dataKey="revenue" name="Revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line
                  yAxisId="inr"
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#fbbf24"
                  strokeWidth={2.5}
                  dot={{ fill: '#fbbf24', r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-xl">
          <h2 className="font-display text-lg font-semibold text-white">This week — by weekday</h2>
          <p className="mt-1 text-xs text-slate-500">Sun–Sat · same metrics</p>
          <div className="mt-4 h-80 w-full min-w-0">
            <ResponsiveContainer key={`w-${chartKey}`} width="100%" height="100%" debounce={50}>
              <BarChart data={weekly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} width={36} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  width={44}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="profit" name="Profit" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-teal-800/40 bg-teal-950/30 p-5 text-sm text-teal-100/90">
        <p className="font-semibold text-teal-200">Tips</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-teal-100/70">
          <li>Add <strong>cost price</strong> when editing a product — profit charts use (selling price − cost) × quantity.</li>
          <li>Charts include every day of the current month (zeros on quiet days) so the axes stay stable.</li>
        </ul>
      </div>
    </div>
  );
}
