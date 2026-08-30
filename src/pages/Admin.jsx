import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BadgeDollarSign,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Lock,
  Menu,
  MessageSquareQuote,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Tags,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'
import { formatPrice, formatDate } from '../utils/format'
import { MONTHLY_REVENUE } from '../data/site'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Boxes },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'coupons', label: 'Coupons', icon: BadgeDollarSign },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'settings', label: 'Settings', icon: RotateCcw },
]

const ORDER_STATUSES = ['Placed', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

const EMPTY_PRODUCT = {
  name: '', slug: '', category: 'Milk', price: 0, originalPrice: 0,
  rating: 4.5, reviews: 10, stock: 20,
  shortDescription: '', description: '',
  ingredients: ['Fresh Cow Milk'],
  nutrition: { calories: '-', protein: '-', fat: '-' },
  storage: 'Keep refrigerated.', deliveryInfo: 'Delivered fresh every morning.',
  image: '', featured: false, bestseller: false, createdAt: new Date().toISOString().slice(0, 10),
}

export default function Admin() {
  usePageMeta({ title: 'Admin Dashboard (Demo)', description: 'Devansh frontend-only admin simulation using localStorage.' })
  const app = useApp()
  const [entered, setEntered] = useState(() => sessionStorage.getItem('devansh_admin') === '1')
  const [tab, setTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!entered) return <Gate onEnter={() => { setEntered(true); sessionStorage.setItem('devansh_admin', '1') }} />

  const ctxProps = {
    setTab,
    tab,
    sidebarOpen,
    closeSidebar: () => setSidebarOpen(false),
  }

  return (
    <div className="min-h-screen bg-cream-100/60">
      <AdminShell {...ctxProps}>{tabContent(tab, app)}</AdminShell>
    </div>
  )
}

function Gate({ onEnter }) {
  return (
    <div className="grid min-h-screen place-items-center bg-forest-deeper px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-[2rem] bg-cream-50 p-8 text-center shadow-lift"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-pale text-forest">
          <Lock size={26} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-forest">Demo Admin</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">
          This is a frontend simulation — no real authentication. All changes are stored in your browser's localStorage only.
        </p>
        <button onClick={onEnter} className="btn-primary mt-6 w-full">Enter Dashboard</button>
        <Link to="/" className="mt-3 inline-block text-xs font-semibold text-leaf hover:text-forest">← Back to store</Link>
      </motion.div>
    </div>
  )
}

function AdminShell({ children, tab, setTab, sidebarOpen, closeSidebar }) {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-forest-deeper p-5 text-cream-50 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-forest-deeper">DD</span>
          Devansh Admin
        </Link>
        <nav className="flex-1 space-y-1" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); closeSidebar() }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-gold text-forest-deeper' : 'text-cream-50/70 hover:bg-white/10 hover:text-cream-50'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </nav>
        <Link to="/" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-cream-50/60 hover:bg-white/10">
          <ArrowLeft size={14} /> Back to Storefront
        </Link>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={closeSidebar} />}

      {/* content */}
      <main className="min-w-0 flex-1 p-4 sm:p-8">
        <button onClick={() => setSidebarOpen(true)} className="btn-primary mb-4 !px-4 !py-2 !text-xs lg:hidden">
          <Menu size={14} /> Menu
        </button>
        {children}
      </main>
    </div>
  )
}

/* ============ DASHBOARD ============ */
function Dashboard({ products, orders, customers }) {
  const totalSales = orders.reduce((s, o) => s + o.totals.total, 0)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5)
  const outOfStock = products.filter((p) => p.stock === 0)
  void MONTHLY_REVENUE

  const stats = [
    { label: 'Total Sales', value: formatPrice(totalSales || 287430), sub: `${orders.length} orders recorded` },
    { label: 'Total Orders', value: orders.length || 12, sub: 'from this browser' },
    { label: 'Total Customers', value: customers.length, sub: 'incl. sample users' },
    { label: 'Total Products', value: products.length, sub: 'live in storefront' },
    { label: 'Low Stock Products', value: lowStock.length + outOfStock.length, sub: `${outOfStock.length} out of stock` },
    { label: 'Monthly Revenue', value: formatPrice(364300), sub: 'December (sample)' },
  ]

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Dashboard Overview</h1>
      <p className="mt-1 text-xs text-ink/45">Frontend demo — numbers blend your localStorage activity with sample data.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-forest/6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/45">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-forest">{s.value}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-leaf"><TrendingUp size={11} /> {s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <RevenueChart />
        <LowStockTable items={[...lowStock, ...outOfStock]} />
      </div>
    </>
  )
}

function RevenueChart() {
  const max = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue))
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-forest/6">
      <p className="font-display text-lg font-semibold text-forest">Monthly Revenue — 2026 (Sample)</p>
      <div className="mt-6 flex h-56 items-end gap-2 sm:gap-3">
        {MONTHLY_REVENUE.map((m, i) => (
          <div key={m.month} className="group relative flex h-full flex-1 flex-col justify-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(m.revenue / max) * 100}%` }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-t-lg bg-gradient-to-t from-forest to-leaf opacity-85 transition-opacity group-hover:opacity-100"
            />
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-forest px-2 py-1 text-[10px] font-bold text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
              {formatPrice(m.revenue)}
            </span>
            <span className="mt-2 text-center text-[10px] font-bold text-ink/45">{m.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LowStockTable({ items }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-forest/6">
      <p className="font-display text-lg font-semibold text-forest">Stock Alerts</p>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-ink/50">All products are comfortably stocked.</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {items.slice(0, 6).map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="min-w-0 flex-1 truncate font-semibold text-ink/75">{p.name}</span>
              <span className={`chip ${p.stock === 0 ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
                {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ============ PRODUCTS ============ */
function ProductsTab({ app }) {
  const { products, upsertProduct, deleteProduct, categories } = app
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Products ({products.length})</h1>
        <div className="flex items-center gap-2.5">
          <label className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="input !w-52 !py-2 !pl-9 !text-xs" />
          </label>
          <button onClick={() => setEditing({ ...EMPTY_PRODUCT })} className="btn-primary !px-4 !py-2 !text-xs">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-forest/6">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-forest/8 text-xs uppercase tracking-wider text-ink/45">
              <th className="px-5 py-3.5">Product</th>
              <th className="px-3 py-3.5">Category</th>
              <th className="px-3 py-3.5">Price</th>
              <th className="px-3 py-3.5">Stock</th>
              <th className="px-3 py-3.5">Rating</th>
              <th className="px-3 py-3.5">Tags</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-cream-50/60">
                <td className="px-5 py-3 font-semibold text-forest">{p.name}</td>
                <td className="px-3 py-3 text-ink/60">{p.category}</td>
                <td className="px-3 py-3 font-bold">{formatPrice(p.price)}</td>
                <td className="px-3 py-3">
                  <span className={`chip ${p.stock === 0 ? 'bg-red-50 text-red-500' : p.stock <= 5 ? 'bg-amber-50 text-amber-600' : 'bg-leaf-pale text-leaf'}`}>{p.stock}</span>
                </td>
                <td className="px-3 py-3">★ {Number(p.rating).toFixed(1)}</td>
                <td className="px-3 py-3">
                  {p.bestseller && <span className="chip mr-1 bg-forest-pale text-forest">Bestseller</span>}
                  {p.featured && <span className="chip bg-gold/20 text-gold-deep">Featured</span>}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button onClick={() => setEditing(p)} aria-label={`Edit ${p.name}`} className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-forest-pale hover:text-forest"><Pencil size={14} /></button>
                    <button onClick={() => setDeleting(p)} aria-label={`Delete ${p.name}`} className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-5 py-8 text-center text-sm text-ink/50">No products match “{q}”.</p>}
      </div>

      {/* edit modal — keyed so state resets each time it opens */}
      {editing !== null && (
        <ProductForm
          key={editing.id ?? 'new'}
          product={{ ...EMPTY_PRODUCT, ...editing }}
          categories={categories}
          onClose={() => setEditing(null)}
          onSave={(p) => { upsertProduct(p); setEditing(null); }}
        />
      )}

      {/* delete confirm */}
      <ConfirmModal
        open={!!deleting}
        title={`Delete “${deleting?.name}”?`}
        body="This removes the product from the storefront (localStorage only)."
        confirmLabel="Delete Product"
        onCancel={() => setDeleting(null)}
        onConfirm={() => { deleteProduct(deleting.id); setDeleting(null) }}
      />
    </>
  )
}

function ProductForm({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState(product)
  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'price' || k === 'originalPrice' || k === 'stock') v = Number(v.replace(/\D/g, '')) || 0
    if (k === 'rating') v = Math.min(5, Math.max(0, Number(v) || 0))
    setForm((f) => ({
      ...f,
      [k]: v,
      ...(k === 'name' && !(f.id) ? { slug: v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') } : {}),
    }))
  }

  return (
    <Modal open onClose={onClose} title={product.id ? `Edit — ${product.name}` : 'Add New Product'} maxWidth="max-w-2xl">
      <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!form.name.trim() || form.price <= 0) return
              onSave({
                ...form,
                slug: form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + (Date.now() % 1000),
                discount: form.originalPrice > form.price ? Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100) : 0,
                weights: form.weights || [{ label: 'Standard', mult: 1 }],
                images: form.images || [],
                image: form.image || undefined,
              })
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput label="Name *" value={form.name} onChange={set('name')} required />
              <label className="block"><span className="label">Category</span>
                <select className="input cursor-pointer" value={form.category} onChange={set('category')}>
                  {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </label>
              <LabeledInput label="Price (₹) *" type="number" min="1" value={form.price} onChange={set('price')} required />
              <LabeledInput label="Original Price (₹)" type="number" min="0" value={form.originalPrice} onChange={set('originalPrice')} />
              <LabeledInput label="Stock" type="number" min="0" value={form.stock} onChange={set('stock')} />
              <LabeledInput label="Rating (0–5)" type="number" step="0.1" value={form.rating} onChange={set('rating')} />
              <div className="sm:col-span-2">
                <label className="block"><span className="label">Image URL (optional — fallback art is used if empty or broken)</span>
                  <input className="input" placeholder="Paste an image URL or leave empty for fallback" value={form.image || ''} onChange={set('image')} />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block"><span className="label">Short Description</span>
                  <input className="input" value={form.shortDescription} onChange={set('shortDescription')} />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block"><span className="label">Full Description</span>
                  <textarea rows={3} className="input resize-none" value={form.description} onChange={set('description')} />
                </label>
              </div>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-ink/70">
                <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="h-4 w-4 accent-[#1E4633]" />
                Featured
              </label>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-ink/70">
                <input type="checkbox" checked={!!form.bestseller} onChange={(e) => setForm((f) => ({ ...f, bestseller: e.target.checked }))} className="h-4 w-4 accent-[#1E4633]" />
                Bestseller
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
              <button type="submit" className="btn-primary !px-5 !py-2.5 !text-xs">Save Product</button>
            </div>
          </form>
        </Modal>
  )
}

function LabeledInput({ label, ...rest }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="input" {...rest} />
    </label>
  )
}

function ConfirmModal({ open, title, body, confirmLabel, onCancel, onConfirm }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm leading-relaxed text-ink/65">{body}</p>
      <div className="mt-5 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
        <button onClick={onConfirm} className="!rounded-full bg-red-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-600">{confirmLabel}</button>
      </div>
    </Modal>
  )
}

/* ============ CATEGORIES ============ */
function CategoriesTab({ app }) {
  const { categories, upsertCategory, deleteCategory } = app
  const [form, setForm] = useState(null)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Categories ({categories.length})</h1>
        <button onClick={() => setForm({ name: '', description: '' })} className="btn-primary !px-4 !py-2 !text-xs"><Plus size={14} /> Add Category</button>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.id} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-forest/6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-forest">{c.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">{c.description}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button onClick={() => setForm(c)} aria-label="Edit category" className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-forest-pale hover:text-forest"><Pencil size={13} /></button>
                <button onClick={() => deleteCategory(c.id)} aria-label="Delete category" className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-red-50 hover:text-red-500"><Trash2 size={13} /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? 'Edit Category' : 'Add Category'}>
        {form && (
          <form onSubmit={(e) => { e.preventDefault(); upsertCategory(form); setForm(null) }}>
            <LabeledInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <div className="mt-3">
              <label className="block"><span className="label">Description</span>
                <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setForm(null)} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
              <button type="submit" className="btn-primary !px-5 !py-2.5 !text-xs">Save</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}

/* ============ ORDERS ============ */
function OrdersTab({ app }) {
  const { orders, updateOrderStatus } = app
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Orders ({orders.length})</h1>
      {orders.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">
          No orders yet. Place one from the storefront and it appears here instantly.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-forest/6">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-forest/8 text-xs uppercase tracking-wider text-ink/45">
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-3 py-3.5">Customer</th>
                <th className="px-3 py-3.5">Items</th>
                <th className="px-3 py-3.5">Total</th>
                <th className="px-3 py-3.5">Payment</th>
                <th className="px-3 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream-50/60">
                  <td className="px-5 py-3">
                    <p className="font-mono text-xs font-bold text-forest">{o.id}</p>
                    <p className="text-[11px] text-ink/40">{formatDate(o.createdAt)}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-semibold text-ink/80">{o.customer.name}</p>
                    <p className="text-[11px] text-ink/45">{o.customer.phone}</p>
                  </td>
                  <td className="px-3 py-3 text-ink/60">{o.items.reduce((s, i) => s + i.qty, 0)} units</td>
                  <td className="px-3 py-3 font-bold text-forest">{formatPrice(o.totals.total)}</td>
                  <td className="px-3 py-3 text-ink/60">{o.payment}</td>
                  <td className="px-3 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="cursor-pointer rounded-full border border-forest/15 bg-cream-50 px-3 py-1.5 text-xs font-bold outline-none focus:border-leaf"
                    >
                      {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

/* ============ CUSTOMERS ============ */
function CustomersTab({ app }) {
  const { customers } = app
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Customers ({customers.length})</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-forest/6">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-forest/8 text-xs uppercase tracking-wider text-ink/45">
              <th className="px-5 py-3.5">Name</th>
              <th className="px-3 py-3.5">Phone</th>
              <th className="px-3 py-3.5">City</th>
              <th className="px-3 py-3.5">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {customers.map((c, i) => (
              <tr key={c.phone || c.email || i} className="hover:bg-cream-50/60">
                <td className="px-5 py-3">
                  <p className="font-semibold text-forest">{c.name}</p>
                  <p className="text-[11px] text-ink/45">{c.email || '—'}</p>
                </td>
                <td className="px-3 py-3 text-ink/60">{c.phone || '—'}</td>
                <td className="px-3 py-3 text-ink/60">{c.city || '—'}</td>
                <td className="px-3 py-3 font-bold">{c.orders ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink/45">Includes sample marketing personas merged with real checkout entries from this browser.</p>
    </>
  )
}

/* ============ COUPONS ============ */
function CouponsTab({ app }) {
  const { coupons, upsertCoupon, deleteCoupon } = app
  const [form, setForm] = useState(null)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Discount Coupons</h1>
        <button onClick={() => setForm({ code: '', type: 'percent', value: 10, active: true, note: '' })} className="btn-primary !px-4 !py-2 !text-xs"><Plus size={14} /> Add Coupon</button>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => (
          <li key={c.id} className="rounded-2xl border-2 border-dashed border-gold/50 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg font-bold tracking-[0.2em] text-forest">{c.code}</p>
              <span className={`chip ${c.active ? 'bg-leaf-pale text-leaf' : 'bg-red-50 text-red-400'}`}>{c.active ? 'Active' : 'Paused'}</span>
            </div>
            <p className="mt-2 text-sm font-bold text-gold-deep">{c.type === 'percent' ? `${c.value}% OFF` : `${formatPrice(c.value)} OFF`}</p>
            {c.note && <p className="mt-1 text-xs text-ink/50">{c.note}</p>}
            <div className="mt-4 flex gap-2">
              <button onClick={() => upsertCoupon({ ...c, active: !c.active })} className="btn-outline !px-3 !py-1.5 !text-[11px]">
                {c.active ? 'Pause' : 'Activate'}
              </button>
              <button onClick={() => deleteCoupon(c.id)} className="!rounded-full px-3 py-1.5 text-[11px] font-bold text-clay ring-1 ring-clay/25 hover:bg-red-50 hover:text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal open={!!form} onClose={() => setForm(null)} title="Add Coupon">
        {form && (
          <form onSubmit={(e) => { e.preventDefault(); upsertCoupon({ ...form, code: form.code.toUpperCase().replace(/\s+/g, '') }); setForm(null) }}>
            <LabeledInput label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required placeholder="DDF25" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block"><span className="label">Type</span>
                <select className="input cursor-pointer" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="percent">Percent %</option>
                  <option value="flat">Flat ₹</option>
                </select>
              </label>
              <LabeledInput label="Value" type="number" min="1" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) || 0 })} />
            </div>
            <div className="mt-3">
              <LabeledInput label="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Summer campaign" />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setForm(null)} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
              <button type="submit" className="btn-primary !px-5 !py-2.5 !text-xs">Save Coupon</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}

/* ============ TESTIMONIALS ============ */
function TestimonialsTab({ app }) {
  const { testimonials, upsertTestimonial, deleteTestimonial } = app
  const [form, setForm] = useState(null)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Testimonials ({testimonials.length})</h1>
        <button onClick={() => setForm({ name: '', location: '', rating: 5, text: '' })} className="btn-primary !px-4 !py-2 !text-xs"><Plus size={14} /> Add Testimonial</button>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.id} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-forest/6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-forest">{t.name}</p>
                <p className="text-xs text-ink/45">{t.location} · ★ {t.rating}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setForm(t)} aria-label="Edit" className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-forest-pale hover:text-forest"><Pencil size={13} /></button>
                <button onClick={() => deleteTestimonial(t.id)} aria-label="Delete" className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-red-50 hover:text-red-500"><Trash2 size={13} /></button>
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">“{t.text}”</p>
          </li>
        ))}
      </ul>
      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? 'Edit Testimonial' : 'Add Testimonial'} maxWidth="max-w-xl">
        {form && (
          <form onSubmit={(e) => { e.preventDefault(); upsertTestimonial(form); setForm(null) }} className="grid gap-3 sm:grid-cols-2">
            <LabeledInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <LabeledInput label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <LabeledInput label="Rating (1–5)" type="number" step="0.5" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            <div className="sm:col-span-2">
              <label className="block"><span className="label">Review</span>
                <textarea rows={3} className="input resize-none" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
              </label>
            </div>
            <div className="flex justify-end gap-3 sm:col-span-2">
              <button type="button" onClick={() => setForm(null)} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
              <button type="submit" className="btn-primary !px-5 !py-2.5 !text-xs">Save</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}

/* ============ SETTINGS ============ */
function SettingsTab({ app }) {
  const { resetProducts, resetCategories, clearOrders } = app
  const [confirming, setConfirming] = useState(null)
  void confirming

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">Settings & Data Controls</h1>
      <p className="mt-1 text-xs text-ink/45">All admin changes persist in localStorage under the <code className="rounded bg-sand px-1.5 py-0.5 font-mono text-[11px]">devansh_*</code> keys.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Reset Products', desc: 'Restore the original 18 demo products.', action: () => resetProducts(), key: 'products' },
          { title: 'Reset Categories', desc: 'Restore default dairy categories.', action: () => resetCategories(), key: 'categories' },
          { title: 'Clear All Orders', desc: 'Delete order history saved in this browser.', action: () => clearOrders(), key: 'orders' },
        ].map((r) => (
          <div key={r.key} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-forest/6">
            <p className="font-display text-lg font-semibold text-forest">{r.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{r.desc}</p>
            <button onClick={r.action} className="btn-outline mt-4 !px-4 !py-2 !text-xs">
              <RotateCcw size={13} /> Reset Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-card ring-1 ring-forest/6">
        <p className="font-display text-base font-semibold text-forest">Export Data (JSON)</p>
        <p className="mt-1 text-xs text-ink/55">Download everything currently stored by the demo.</p>
        <button
          onClick={() => {
            const dump = {}
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i)
              if (k.startsWith('devansh_')) dump[k] = JSON.parse(localStorage.getItem(k) || 'null')
            }
            const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'devansh-data.json'
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="btn-primary mt-4 !px-4 !py-2 !text-xs"
        >
          Download JSON
        </button>
      </div>
    </>
  )
}

/* dispatcher */
function tabContent(tab, app) {
  switch (tab) {
    case 'dashboard': return <Dashboard products={app.products} orders={app.orders} customers={app.customers} />
    case 'products': return <ProductsTab app={app} />
    case 'categories': return <CategoriesTab app={app} />
    case 'orders': return <OrdersTab app={app} />
    case 'customers': return <CustomersTab app={app} />
    case 'coupons': return <CouponsTab app={app} />
    case 'testimonials': return <TestimonialsTab app={app} />
    case 'settings': return <SettingsTab app={app} />
    default: return null
  }
}
