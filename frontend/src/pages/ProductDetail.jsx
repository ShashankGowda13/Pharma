import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { mediaUrl } from '../services/api';
// Cart removed
import { useCatalog } from '../context/CatalogContext';
import { formatINR } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const { catalogVersion } = useCatalog();
  const [product, setProduct] = useState(null);
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
