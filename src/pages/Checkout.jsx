import { motion } from 'framer-motion'
import { Banknote, CreditCard, MapPin, ShieldCheck, Smartphone, Truck, Wallet, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import usePageMeta from '../hooks/usePageMeta'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { estimatedDelivery, formatPrice } from '../utils/format'

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', desc: 'Arrives in 1–2 days, before 7 AM', fee: 40 },
  { id: 'express', label: 'Express Delivery', desc: 'Delivered today evening', fee: 99 },
]

const PAYMENT_METHODS = [
  { id: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when your dairy arrives' },
  { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'GPay / PhonePe / Paytm (demo)' },
  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay (demo)' },
  { id: 'netbanking', icon: Wallet, label: 'Online Payment', desc: 'Net banking & wallets (demo)' },
]

export default function Checkout() {
  usePageMeta({ title: 'Checkout', description: 'Complete your Devansh order — frontend demo checkout.' })
  const { items, subtotal, couponCode, couponDiscount, clearCart } = useCart()
  const { createOrderObject, addOrder, toast, user } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name && user.name !== 'Guest User' ? user.name : '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [errors, setErrors] = useState({})
  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [payment, setPayment] = useState('cod')
  const [placing, setPlacing] = useState(false)

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === 'express') return 99
    return subtotal >= 499 ? 0 : 40
  }, [deliveryMethod, subtotal])

  const total = Math.max(0, subtotal - couponDiscount + deliveryFee)

  const setField = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.fullName || form.fullName.trim().length < 3) er.fullName = 'Please enter your full name.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) er.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Enter a valid email address.'
    if (!form.address || form.address.trim().length < 8) er.address = 'Enter your complete address.'
    if (!form.city.trim()) er.city = 'City is required.'
    if (!form.state.trim()) er.state = 'State is required.'
    if (!/^\d{6}$/.test(form.pincode)) er.pincode = 'Enter a valid 6-digit pincode.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const placeOrder = (e) => {
    e.preventDefault()
    if (items.length === 0 || !validate() || placing) return
    setPlacing(true)
    setTimeout(() => {
      const totals = {
        subtotal,
        discount: couponDiscount,
        deliveryFee,
        total,
        estimatedDelivery: estimatedDelivery(deliveryMethod === 'express'),
      }
      const order = createOrderObject({
        items,
        totals,
        address: form,
        payment: PAYMENT_METHODS.find((p) => p.id === payment)?.label || payment,
        deliveryMethod: DELIVERY_OPTIONS.find((d) => d.id === deliveryMethod)?.label,
        couponCode,
      })
      addOrder(order)
      clearCart()
      toast('Order placed successfully!')
      navigate(`/order-success?id=${order.id}`, { replace: true })
    }, 1200)
  }

  if (items.length === 0) {
    return (
      <div className="container-x animate-page-in pb-20 pt-36 text-center sm:pt-40">
        <h1 className="font-display text-3xl font-semibold text-forest">Nothing to check out yet</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink/55">Your cart is empty. Add some farm-fresh goodness first.</p>
        <Link to="/shop" className="btn-primary mt-6">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="container-x animate-page-in pb-20 pt-28 sm:pt-32">
      <span className="eyebrow">Final Step</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">Checkout</h1>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-leaf">
        <ShieldCheck size={14} /> 100% secure — this is a frontend demo, no real payment is taken.
      </p>

      <form onSubmit={placeOrder} className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_400px]" noValidate>
        <div className="space-y-6">
          {/* customer info */}
          <section className="card p-6 sm:p-7">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
              <MapPin size={18} className="text-leaf" /> Customer Information
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={errors.fullName}>
                <input className={`input ${errors.fullName ? 'input-error' : ''}`} value={form.fullName} onChange={setField('fullName')} placeholder="Aarav Mehta" />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input className={`input ${errors.phone ? 'input-error' : ''}`} value={form.phone} onChange={setField('phone')} placeholder="98765 43210" maxLength={10} inputMode="numeric" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email Address" error={errors.email}>
                  <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={setField('email')} placeholder="you@example.com" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Address" error={errors.address}>
                  <textarea rows={2} className={`input resize-none ${errors.address ? 'input-error' : ''}`} value={form.address} onChange={setField('address')} placeholder="Flat / House no., street, landmark" />
                </Field>
              </div>
              <Field label="City" error={errors.city}>
                <input className={`input ${errors.city ? 'input-error' : ''}`} value={form.city} onChange={setField('city')} placeholder="Pune" />
              </Field>
              <Field label="State" error={errors.state}>
                <input className={`input ${errors.state ? 'input-error' : ''}`} value={form.state} onChange={setField('state')} placeholder="Maharashtra" />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input className={`input ${errors.pincode ? 'input-error' : ''}`} value={form.pincode} onChange={setField('pincode')} placeholder="411001" maxLength={6} inputMode="numeric" />
              </Field>
            </div>
          </section>

          {/* delivery */}
          <section className="card p-6 sm:p-7">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
              <Truck size={18} className="text-leaf" /> Delivery Option
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {DELIVERY_OPTIONS.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setDeliveryMethod(d.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    deliveryMethod === d.id
                      ? 'border-leaf bg-leaf-pale ring-2 ring-leaf/40'
                      : 'border-forest/12 bg-white hover:border-forest/30'
                  }`}
                >
                  <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${deliveryMethod === d.id ? 'border-leaf bg-leaf' : 'border-forest/30'}`}>
                    {deliveryMethod === d.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-forest">
                      {d.label}
                      {d.id === 'express' && <Zap size={12} className="ml-1 inline text-gold-deep" />}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink/55">{d.desc}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-sm font-bold text-forest">{d.fee === 0 ? 'FREE' : formatPrice(d.fee)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* payment */}
          <section className="card p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-forest">Payment Method</h2>
            <p className="mt-1 text-xs text-ink/45">UI selection only — no real charge happens in this demo.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    payment === p.id
                      ? 'border-leaf bg-leaf-pale ring-2 ring-leaf/40'
                      : 'border-forest/12 bg-white hover:border-forest/30'
                  }`}
                >
                  <p.icon size={19} className="shrink-0 text-forest" />
                  <span>
                    <span className="block text-sm font-bold text-forest">{p.label}</span>
                    <span className="block text-xs text-ink/55">{p.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* summary */}
        <aside className="sticky top-24 card p-6">
          <h2 className="font-display text-lg font-semibold text-forest">Your Order</h2>
          <ul className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-3">
                <span className="relative shrink-0">
                  <SmartImage src={i.image} alt={i.name} className="h-12 w-12 rounded-xl object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] font-bold text-cream-50">
                    {i.qty}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold text-ink">{i.name}</span>
                  <span className="block text-[11px] text-ink/50">{i.weight}</span>
                </span>
                <span className="text-xs font-bold text-forest">{formatPrice(i.price)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-forest/8 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
            {couponDiscount > 0 && (
              <div className="flex justify-between"><dt className="text-ink/60">Discount ({couponCode})</dt><dd className="font-semibold text-leaf">− {formatPrice(couponDiscount)}</dd></div>
            )}
            <div className="flex justify-between"><dt className="text-ink/60">Delivery Fee</dt><dd className={`font-semibold ${deliveryFee === 0 ? 'text-leaf' : ''}`}>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</dd></div>
            <div className="!mt-4 flex justify-between border-t border-dashed border-forest/15 pt-4">
              <dt className="font-display text-base font-bold text-forest">Total</dt>
              <dd className="font-display text-xl font-bold text-forest">{formatPrice(total)}</dd>
            </div>
          </dl>

          <motion.button
            type="submit"
            disabled={placing}
            whileTap={{ scale: placing ? 1 : 0.98 }}
            className="btn-primary mt-6 w-full"
          >
            {placing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream-50/40 border-t-cream-50" />
                Placing Order...
              </>
            ) : (
              <>Place Order · {formatPrice(total)}</>
            )}
          </motion.button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/45">
            Estimated delivery: <strong>{estimatedDelivery(deliveryMethod === 'express')}</strong>
          </p>
        </aside>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-red-500">{error}</span>}
    </label>
  )
}
