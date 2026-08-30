import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, CreditCard, MapPin, PackageSearch, ShoppingBag, Truck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/format'

export default function OrderSuccess() {
  usePageMeta({ title: 'Order Placed', description: 'Thank you for choosing Devansh — your order has been placed.' })
  const [params] = useSearchParams()
  const { orders } = useApp()

  const id = params.get('id')
  const order = orders.find((o) => o.id === id) || orders[0]

  if (!order) {
    return (
      <div className="container-x animate-page-in pb-20 pt-40 text-center">
        <PackageSearch size={44} className="mx-auto text-ink/30" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-forest">No recent order found</h1>
        <Link to="/shop" className="btn-primary mt-6">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container-x animate-page-in max-w-3xl pb-20 pt-32 sm:pt-36">
      <div className="text-center">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="inline-grid h-20 w-20 place-items-center rounded-full bg-leaf-pale ring-8 ring-white"
        >
          <CheckCircle2 size={42} className="text-leaf" />
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5 font-display text-3xl font-semibold text-forest sm:text-4xl"
        >
          Order Placed Successfully!
        </motion.h1>
        <p className="mt-2 text-sm text-ink/60">Thank you for choosing Devansh. Pure dairy is on its way.</p>
        <p className="mt-4 inline-block rounded-full bg-forest px-5 py-2 font-mono text-sm font-bold tracking-widest text-gold-light">
          {order.id}
        </p>
      </div>

      <div className="card mt-10 overflow-hidden">
        {/* items */}
        <ul className="divide-y divide-forest/6 p-2 sm:p-3">
          {order.items.map((i) => (
            <li key={i.key} className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-cream-100/60">
              <SmartImage src={i.image} alt={i.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{i.name}</p>
                <p className="text-xs text-ink/50">{i.weight} × {i.qty}</p>
              </div>
              <span className="text-sm font-bold text-forest">{formatPrice(i.price)}</span>
            </li>
          ))}
        </ul>

        {/* totals */}
        <dl className="space-y-2 border-t border-dashed border-forest/15 bg-cream-100/50 p-6 text-sm">
          <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="font-semibold">{formatPrice(order.totals.subtotal)}</dd></div>
          {order.totals.discount > 0 && (
            <div className="flex justify-between"><dt className="text-ink/60">Discount</dt><dd className="font-semibold text-leaf">− {formatPrice(order.totals.discount)}</dd></div>
          )}
          <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd className="font-semibold">{order.totals.deliveryFee === 0 ? 'FREE' : formatPrice(order.totals.deliveryFee)}</dd></div>
          <div className="flex justify-between border-t border-forest/10 pt-2">
            <dt className="font-display text-base font-bold text-forest">Total Amount</dt>
            <dd className="font-display text-lg font-bold text-forest">{formatPrice(order.totals.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <InfoCard icon={MapPin} title="Delivery Address">
          <p>{order.address.fullName}</p>
          <p>{order.address.address}, {order.address.city}, {order.address.state} — {order.address.pincode}</p>
          <p>Phone: {order.address.phone}</p>
        </InfoCard>
        <InfoCard icon={CreditCard} title="Payment Method">
          <p>{order.payment}</p>
          <p className="mt-1 text-xs">Status: {order.status}</p>
        </InfoCard>
        <InfoCard icon={Truck} title="Estimated Delivery">
          <p className="font-semibold">{order.estimatedDelivery}</p>
          <p className="mt-1 text-xs">{order.deliveryMethod}</p>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary group">
          <ShoppingBag size={15} /> Continue Shopping
        </Link>
        <Link to="/account" className="btn-outline group">
          View My Orders <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-ink/45">
        <Clock size={13} /> A confirmation would normally be emailed — this is a frontend demo.
      </p>
    </div>
  )
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="card p-5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf">
        <Icon size={14} /> {title}
      </p>
      <div className="mt-2 space-y-0.5 text-xs leading-relaxed text-ink/65">{children}</div>
    </div>
  )
}
