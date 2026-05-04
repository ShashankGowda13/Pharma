import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { mediaUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { formatINR } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const { catalogVersion } = useCatalog();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    setErr('');
    (async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setErr('Product not found');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, catalogVersion]);

  if (err) {
    return (
      <div className="rounded-2xl border border-red-200/80 bg-red-50 p-8 text-red-900 shadow-sm">
        {err}.{' '}
        <Link to="/products" className="font-bold text-brand-800 underline">
          Back to products
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p className="py-20 text-center font-medium text-slate-500">Loading…</p>;
  }

  const max = Math.max(1, product.stock || 0);
  const safeQty = Math.min(qty, max);

  const handleAdd = () => {
    if (product.stock < 1) {
      setMsg('');
      setErr('Out of stock');
      return;
    }
    addItem(product, safeQty);
    setErr('');
    setMsg('Added to cart');
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl ring-1 ring-slate-100">
        <img src={mediaUrl(product.image)} alt="" className="aspect-square w-full object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">{product.category}</p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-brand-950 sm:text-4xl">{product.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">{product.description}</p>
        <p className="mt-8 font-display text-4xl font-bold text-brand-900">{formatINR(product.price)}</p>
        <p className="mt-2 text-sm text-slate-500">
          SKU: {product.sku || '—'} · In stock: <span className="font-semibold text-brand-800">{product.stock}</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <label className="text-sm font-semibold text-brand-900" htmlFor="qty">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            max={max}
            value={safeQty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-28 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock < 1}
            className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/30 transition hover:from-brand-500 hover:to-brand-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Add to cart
          </button>
        </div>
        {msg && <p className="mt-4 text-sm font-bold text-emerald-700">{msg}</p>}
        {err && <p className="mt-4 text-sm font-bold text-red-600">{err}</p>}

        <Link
          to="/products"
          className="mt-auto pt-10 text-sm font-bold text-brand-700 hover:text-brand-900 hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  );
}
