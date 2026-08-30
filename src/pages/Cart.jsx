import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Tag, Trash2, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/format'

const FREE_DELIVERY_AT = 499
const DELIVERY_FEE = 40

export default function Cart() {
  usePageMeta({ title: 'Your Cart', description: 'Review your Devansh cart and proceed to checkout.' })
  const { items, subtotal, savings, clearCart, couponCode, couponDiscount, applyCouponCode, removeCoupon } = useCart()
  const { applyCoupon, toast } = useApp()
  const [code, setCode] = useState('')

  const discount = couponDiscount
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
  const total = Math.max(0, subtotal - discount + deliveryFee)
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)

  const tryCoupon = () => {
    if (!code.trim()) return
    const res = applyCoupon(code, subtotal)
    if (res.ok) {
      applyCouponCode(res.coupon.code, res.discount)
      toast(`Coupon ${res.coupon.code} applied — you saved ${formatPrice(res.discount)}!`)
      setCode('')
    } else {
      toast(res.message, 'error')
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-x animate-page-in pb-20 pt-36 sm:pt-40">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is feeling a little empty."
          subtitle="Fill it with farm-fresh milk, paneer, ghee and more — delivered before sunrise."
          action={<Link to="/shop" className="btn-primary">Explore Dairy Products</Link>}
          className="max-w-xl mx-auto"
        />
      </div>
    )
  }

  return (
    <div className="container-x animate-page-in pb-20 pt-28 sm:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Almost There</span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">Your Cart</h1>
          <p className="mt-1 text-sm text-ink/55">{items.length} product{items.length > 1 ? 's' : ''} in your basket</p>
        </div>
        <button onClick={clearCart} className="inline-flex items-center gap-1.5 text-xs font-semibold text-clay hover:text-red-600">
          <Trash2 size={13} /> Clear cart
        </button>
      </div>

      {/* free delivery progress */}
      <motion.div layout className="mt-6 rounded-2xl bg-white p-4 shadow-card ring-1 ring-forest/5 sm:flex items-center gap-4">
        <p className="flex items-center gap-2 text-sm font-medium text-ink/70">
          <Truck size={16} className="shrink-0 text-leaf" />
          {deliveryFee === 0 ? (
            <span><strong className="text-leaf">Hooray!</strong> You've unlocked free delivery.</span>
          ) : (
            <span>Add <strong>{formatPrice(FREE_DELIVERY_AT - subtotal)}</strong> more for free delivery</span>
          )}
        </p>
        <span className="hidden h-2 flex-1 overflow-hidden rounded-full bg-sand sm:block">
          <motion.span
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="block h-full rounded-full bg-gradient-to-r from-leaf to-gold"
          />
        </span>
      </motion.div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item) => <CartItem key={item.key} item={item} />)}
          </AnimatePresence>
        </ul>

        <aside className="sticky top-24 space-y-4">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-forest">Order Summary</h2>

            {/* coupon */}
            <div className="mt-4">
              {couponCode ? (
                <div className="flex items-center justify-between rounded-xl bg-leaf-pale px-4 py-3 text-sm ring-1 ring-leaf/30">
                  <span className="flex items-center gap-2 font-bold text-forest"><Tag size={14} /> {couponCode}</span>
                  <button onClick={() => { removeCoupon(); toast('Coupon removed', 'error') }} className="text-xs font-semibold text-clay hover:text-red-500">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                    className="input !py-2.5 !text-xs uppercase"
                  />
                  <button onClick={tryCoupon} className="btn-outline shrink-0 !px-4 !py-2.5 !text-xs">Apply</button>
                </div>
              )}
              {!couponCode && <p className="mt-2 text-[11px] text-ink/45">Try “FRESH20” for 20% off your first order.</p>}
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-forest/8 pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              {discount > 0 && <Row label={`Discount (${couponCode})`} value={`− ${formatPrice(discount)}`} green />}
              <Row label="Delivery Fee" value={deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)} green={deliveryFee === 0} />
              <div className="!mt-4 flex justify-between border-t border-dashed border-forest/15 pt-4">
                <dt className="font-display text-base font-bold text-forest">Total</dt>
                <dd className="font-display text-xl font-bold text-forest">{formatPrice(total)}</dd>
              </div>
            </dl>

            {savings > 0 && (
              <p className="mt-3 rounded-xl bg-gold/15 px-3 py-2 text-center text-xs font-bold text-gold-deep">
                You're saving {formatPrice(savings + discount)} on this order
              </p>
            )}

            <Link to="/checkout" className="btn-primary mt-5 w-full group">
              Proceed to Checkout <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-xs font-semibold text-leaf hover:text-forest">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink/60">{label}</dt>
      <dd className={`font-semibold ${green ? 'text-leaf' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}
