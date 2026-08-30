import { motion } from 'framer-motion'
import {
  Bell,
  Heart,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Settings as SettingsIcon,
  ShieldAlert,
  ShoppingBag,
  Trash2,
  User as UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import SmartImage from '../components/SmartImage'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatDate, formatPrice, initials } from '../utils/format'

const TABS = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'settings', label: 'Account Settings', icon: SettingsIcon },
]

const STATUS_COLORS = {
  Placed: 'bg-blue-50 text-blue-600',
  Packed: 'bg-amber-50 text-amber-600',
  Shipped: 'bg-purple-50 text-purple-600',
  Delivered: 'bg-leaf-pale text-leaf',
  Cancelled: 'bg-red-50 text-red-500',
}

export default function Account() {
  usePageMeta({ title: 'My Account', description: 'Manage your Devansh profile, orders, wishlist and addresses.' })
  const {
    user, updateUser, loginDemo, logout,
    orders, clearOrders,
    addresses, addAddress, removeAddress, setDefaultAddress,
    subscriptions, cancelSubscription,
    toast,
  } = useApp()
  const cart = useCart()
  const wishlist = useWishlist()

  const [tab, setTab] = useState('profile')
  const [profileForm, setProfileForm] = useState({
    name: user.name === 'Guest User' ? '' : user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  })
  const [addrForm, setAddrForm] = useState({ label: '', line: '', city: '', pincode: '' })
  const [confirmClear, setConfirmClear] = useState(null)
  const [notifications, setNotifications] = useState({ orderUpdates: true, offers: true, morningReminder: false })

  const saveProfile = (e) => {
    e.preventDefault()
    if (!profileForm.name.trim()) return toast('Please enter your name', 'error')
    updateUser({ ...profileForm, loggedIn: true })
    toast('Profile updated successfully')
  }

  const saveAddress = (e) => {
    e.preventDefault()
    if (!addrForm.line.trim() || !addrForm.city.trim()) return toast('Address and city are required', 'error')
    addAddress({ ...addrForm })
    setAddrForm({ label: '', line: '', city: '', pincode: '' })
    toast('Address saved')
  }

  return (
    <div className="container-x animate-page-in pb-20 pt-28 sm:pt-32">
      {/* header */}
      <div className="card flex flex-wrap items-center gap-5 p-6 sm:p-8">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-leaf to-forest font-display text-xl font-bold text-cream-50">
          {initials(user.name)}
        </span>
        <div className="min-w-[180px] flex-1">
          <h1 className="font-display text-2xl font-semibold text-forest">{user.name}</h1>
          <p className="text-sm text-ink/55">{user.email || 'No email added yet'}</p>
          {!user.loggedIn && (
            <button onClick={() => { loginDemo(); toast('Signed in as demo user Aarav') }} className="btn-outline mt-3 !px-4 !py-2 !text-xs">
              <LogIn size={13} /> Sign In (Demo)
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 text-center sm:gap-8">
          <Stat icon={Package} value={orders.length} label="Orders" />
          <Stat icon={Heart} value={wishlist.count} label="Wishlist" />
          <Stat icon={ShoppingBag} value={cart.count} label="In Cart" />
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[240px_1fr]">
        {/* tab nav */}
        <nav aria-label="Account sections" className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                tab === t.id ? 'bg-forest text-cream-50 shadow-card' : 'bg-white text-ink/60 ring-1 ring-forest/8 hover:text-forest'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          {user.loggedIn && (
            <button onClick={logout} className="flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-clay transition-colors hover:text-red-500 lg:mt-2">
              <LogOut size={16} /> Sign Out
            </button>
          )}
        </nav>

        {/* content */}
        <motion.section key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-w-0">
          {tab === 'profile' && (
            <div className="space-y-6">
              <form onSubmit={saveProfile} className="card p-6 sm:p-7">
                <h2 className="font-display text-lg font-semibold text-forest">Edit Profile</h2>
                <p className="mt-1 text-xs text-ink/45">This information is stored locally in your browser (demo).</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="label">Full Name</span>
                    <input className="input" value={profileForm.name} onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                  </label>
                  <label className="block"><span className="label">Email</span>
                    <input type="email" className="input" value={profileForm.email} onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                  </label>
                  <label className="block sm:w-56"><span className="label">Phone</span>
                    <input className="input" value={profileForm.phone} onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))} placeholder="98765 43210" maxLength={10} />
                  </label>
                </div>
                <button type="submit" className="btn-primary mt-6 !px-5 !py-2.5 !text-xs">Save Changes</button>
              </form>

              <div className="card p-6 sm:p-7">
                <h2 className="font-display text-lg font-semibold text-forest">My Subscriptions</h2>
                {subscriptions.length === 0 ? (
                  <p className="mt-3 text-sm text-ink/55">
                    No active subscriptions yet.{' '}
                    <Link to="/#subscribe" className="font-semibold text-leaf hover:underline">Start a milk plan</Link> and never wake up to an empty fridge.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {subscriptions.map((s) => (
                      <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream-100/70 px-4 py-3 ring-1 ring-forest/8">
                        <div>
                          <p className="text-sm font-bold text-forest">{s.product} · {s.frequency}</p>
                          <p className="text-xs text-ink/50">Qty {s.qty} per delivery · ~{formatPrice(s.monthlyEstimate)}/month</p>
                        </div>
                        <span className="chip bg-leaf-pale text-leaf">Active</span>
                        <button onClick={() => { cancelSubscription(s.id); toast('Subscription cancelled', 'error') }} className="text-xs font-semibold text-clay hover:text-red-500">Cancel</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            orders.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No orders yet."
                subtitle="When you place an order it will show up here with live status."
                action={<Link to="/shop" className="btn-primary !px-5 !py-2.5 !text-xs">Start Your First Order</Link>}
              />
            ) : (
              <ul className="space-y-4">
                {orders.map((o) => (
                  <li key={o.id} className="card p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-forest/12 pb-4">
                      <div>
                        <p className="font-mono text-sm font-bold tracking-wide text-forest">{o.id}</p>
                        <p className="text-xs text-ink/45">Placed on {formatDate(o.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`chip ${STATUS_COLORS[o.status] || 'bg-cream-200 text-ink/70'}`}>{o.status}</span>
                        <span className="font-display text-lg font-bold text-forest">{formatPrice(o.totals.total)}</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      {o.items.map((i) => (
                        <div key={i.key} className="flex items-center gap-3 text-xs">
                          <span className="grid h-7 w-7 place-items-center rounded-lg bg-forest-pale font-bold text-forest">{i.qty}×</span>
                          <Link to={`/product/${i.slug}`} className="min-w-0 flex-1 truncate font-semibold text-ink/75 hover:text-leaf">{i.name}</Link>
                          <span className="text-ink/50">{i.weight}</span>
                          <span className="w-14 text-right font-bold text-forest">{formatPrice(i.price)}</span>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}

          {tab === 'wishlist' && (
            wishlist.items.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="Save your favorite dairy products here."
                subtitle="Tap the heart icon on any product to keep it handy."
                action={<Link to="/shop" className="btn-primary !px-5 !py-2.5 !text-xs">Browse Products</Link>}
              />
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {wishlist.items.map((w) => (
                  <li key={w.id} className="card flex items-center gap-4 p-4">
                    <SmartImage src={w.image} alt={w.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${w.slug}`} className="block truncate text-sm font-bold text-forest hover:text-leaf">{w.name}</Link>
                      <p className="text-xs font-semibold text-gold-deep">{formatPrice(w.price)}</p>
                    </div>
                    <button onClick={() => wishlist.removeFromWishlist(w.id)} aria-label="Remove" className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}

          {tab === 'addresses' && (
            <div className="space-y-5">
              {addresses.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((a) => (
                    <li key={a.id} className={`card p-5 ${a.isDefault ? 'ring-2 ring-leaf/50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-bold capitalize text-forest">{a.label || 'Address'} {a.isDefault && <span className="chip ml-1 bg-leaf-pale text-leaf">Default</span>}</p>
                        <button onClick={() => removeAddress(a.id)} aria-label="Delete address" className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-red-50 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-ink/60">{a.line}, {a.city} {a.pincode && `— ${a.pincode}`}</p>
                      {!a.isDefault && (
                        <button onClick={() => setDefaultAddress(a.id)} className="mt-3 text-xs font-bold text-leaf hover:text-forest">
                          Set as default
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink/55">No saved addresses yet. Add one for faster checkout.</p>
              )}

              <form onSubmit={saveAddress} className="card p-6">
                <h3 className="font-display text-base font-semibold text-forest">Add New Address</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input className="input" placeholder="Label (Home / Work)" value={addrForm.label} onChange={(e) => setAddrForm((f) => ({ ...f, label: e.target.value }))} />
                  <input className="input" placeholder="Pincode" maxLength={6} value={addrForm.pincode} onChange={(e) => setAddrForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, '') }))} />
                  <input className="input sm:col-span-2" placeholder="Full address" value={addrForm.line} onChange={(e) => setAddrForm((f) => ({ ...f, line: e.target.value }))} />
                  <input className="input" placeholder="City" value={addrForm.city} onChange={(e) => setAddrForm((f) => ({ ...f, city: e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary mt-4 !px-5 !py-2.5 !text-xs">Save Address</button>
              </form>
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-5">
              <div className="card p-6 sm:p-7">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest"><Bell size={17} className="text-leaf" /> Notifications</h2>
                <ul className="mt-4 divide-y divide-forest/6">
                  {[
                    ['orderUpdates', 'Order status updates'],
                    ['offers', 'Offers & new product alerts'],
                    ['morningReminder', 'Morning delivery reminder'],
                  ].map(([key, label]) => (
                    <li key={key} className="flex items-center justify-between py-3">
                      <span className="text-sm text-ink/70">{label}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications[key]}
                        onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                        className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? 'bg-leaf' : 'bg-sand'}`}
                      >
                        <motion.span layout transition={{ type: 'spring', damping: 24, stiffness: 400 }} className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${notifications[key] ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card border border-red-100 p-6 sm:p-7" style={{ boxShadow: 'none' }}>
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-red-600"><ShieldAlert size={17} /> Danger Zone</h2>
                <p className="mt-1 text-xs text-ink/45">Demo data lives only in this browser. Clear individual stores below.</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <DangerBtn label="Clear Cart" onClick={() => { cart.clearCart(); toast('Cart cleared', 'error') }} />
                  <DangerBtn label="Clear Orders" onClick={() => setConfirmClear('orders')} />
                  <DangerBtn label="Sign Out" onClick={logout} />
                  <DangerBtn label="Reset All Data" danger onClick={() => setConfirmClear('all')} />
                </div>
              </div>
            </div>
          )}
        </motion.section>
      </div>

      <Modal open={!!confirmClear} onClose={() => setConfirmClear(null)} title="Are you sure?">
        <p className="text-sm leading-relaxed text-ink/65">
          {confirmClear === 'all'
            ? 'This will wipe every Devansh key from localStorage — cart, wishlist, orders, profile and admin changes.'
            : 'This will permanently remove all saved orders from this browser.'}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setConfirmClear(null)} className="btn-outline !px-5 !py-2.5 !text-xs">Keep It</button>
          <button
            onClick={() => {
              if (confirmClear === 'orders') { clearOrders(); toast('Orders cleared', 'error') }
              else if (confirmClear === 'all') {
                Object.keys(localStorage).filter((k) => k.startsWith('devansh_')).forEach((k) => localStorage.removeItem(k))
                window.location.href = '/'
              }
              setConfirmClear(null)
            }}
            className="!rounded-full bg-red-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div>
      <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-forest">
        <Icon size={16} className="text-leaf" /> {value}
      </p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/45">{label}</p>
    </div>
  )
}

function DangerBtn({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-bold ring-1 transition-colors ${
        danger ? 'bg-red-500 text-white ring-red-500 hover:bg-red-600' : 'text-clay ring-clay/30 hover:bg-red-50 hover:text-red-500'
      }`}
    >
      {label}
    </button>
  )
}
