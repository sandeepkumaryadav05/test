import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck,
  ChevronDown,
  Heart,
  Leaf,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Star,
  ThermometerSnowflake,
  Truck,
  Zap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import QuantitySelector from '../components/QuantitySelector'
import RatingStars from '../components/RatingStars'
import SmartImage from '../components/SmartImage'
import usePageMeta from '../hooks/usePageMeta'
import { useApp, priceFor } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice, initials } from '../utils/format'

const LOVE_POINTS = [
  { icon: Leaf, title: 'Farm Fresh', text: 'Milked or set the same morning it ships.' },
  { icon: ShieldCheck, title: 'No Preservatives', text: 'Short labels. Nothing artificial, ever.' },
  { icon: BadgeCheck, title: 'Quality Tested', text: '26 lab checks before it leaves our dairy.' },
  { icon: PackageCheck, title: 'Hygienically Packed', text: 'Sealed in a fully automated plant.' },
]

const MOCK_REVIEWS = [
  { name: 'Meera Iyer', date: '2026-07-28', rating: 5, title: 'Consistently excellent', text: 'Third month reordering. Quality has never dipped once — the freshness is unmistakable from the first sip.' },
  { name: 'Karan Johar', date: '2026-07-14', rating: 4.5, text: 'Really good quality and delivery is punctual. Packaging is sturdy and keeps everything cold even in summer afternoons.' },
  { name: 'Fatima Sheikh', date: '2026-06-30', rating: 5, text: 'My toddler is very picky but finishes his glass every morning now. Feels good knowing exactly where it comes from.' },
]

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest/8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-forest"
      >
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-forest/8 px-5 py-4 text-sm leading-relaxed text-ink/70">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProduct, products } = useApp()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const product = getProduct(id)

  const [activeImage, setActiveImage] = useState(0)
  const [weight, setWeight] = useState(product?.weights?.[0]?.label)
  const [qty, setQty] = useState(1)

  usePageMeta({
    title: product ? product.name : 'Product Not Found',
    description: product?.shortDescription || 'Fresh dairy products from Devansh.',
  })

  const price = useMemo(() => (product ? priceFor(product, weight) : 0), [product, weight])

  if (!product) {
    return (
      <div className="container-x pb-20 pt-40">
        <EmptyState
          icon={PackageCheck}
          title="Product not found."
          subtitle="The product you're looking for may have been removed or renamed."
          action={<Link to="/shop" className="btn-primary !px-5 !py-2.5 !text-xs">Back to Shop</Link>}
        />
      </div>
    )
  }

  const outOfStock = product.stock <= 0

  const add = () => {
    addToCart(product, { qty, weight })
  }

  const buyNow = () => {
    add()
    navigate('/checkout')
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const ratingDist = [72, 18, 7, 2, 1]

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink/45">
          <Link to="/" className="hover:text-forest">Home</Link> /
          <Link to="/shop" className="hover:text-forest">Shop</Link> /
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-forest">{product.category}</Link> /
          <span className="text-forest">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* gallery */}
          <div>
            <div className="relative overflow-hidden rounded-[2rem] bg-sand shadow-card ring-1 ring-forest/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <SmartImage src={product.images[activeImage]} alt={product.name} className="aspect-square w-full object-cover" />
                </motion.div>
              </AnimatePresence>
              {product.discount > 0 && (
                <span className="absolute left-4 top-4 chip bg-gold text-forest-deeper shadow-gold">{product.discount}% OFF</span>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              {product.images.map((im, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-20 w-20 overflow-hidden rounded-2xl ring-2 transition-all sm:h-24 sm:w-24 ${
                    activeImage === i ? 'ring-leaf' : 'ring-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <SmartImage src={im} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <span className="chip bg-forest-pale text-forest">{product.category}</span>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} size={16} />
              <span className="text-sm font-semibold text-ink/60">{product.rating.toFixed(1)}</span>
              <a href="#reviews" className="text-sm font-medium text-leaf underline-offset-4 hover:underline">
                {product.reviews} reviews
              </a>
              <span className={`chip ${outOfStock ? 'bg-red-50 text-red-600' : 'bg-leaf-pale text-leaf'}`}>
                {outOfStock ? 'Out of Stock' : `In Stock · ${product.stock} left`}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-4xl font-bold text-forest">{formatPrice(price)}</span>
              {(product.originalPrice > product.price) && (
                <>
                  <span className="pb-1 text-base text-ink/40 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="pb-1 text-sm font-bold text-clay">Save {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-ink/45">Inclusive of all taxes · Free delivery above ₹499</p>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/65">{product.shortDescription}</p>

            {/* weight selector */}
            <div className="mt-6">
              <p className="label">Choose Size</p>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setWeight(w.label)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                      weight === w.label
                        ? 'border-forest bg-forest text-cream-50 shadow-card'
                        : 'border-forest/15 bg-white text-ink/65 hover:border-forest/40'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* qty + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QuantitySelector value={qty} onChange={setQty} max={Math.max(product.stock, 1)} />
              <button onClick={add} disabled={outOfStock} className="btn-primary flex-1 !py-3 sm:flex-none">
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={buyNow} disabled={outOfStock} className="btn-gold flex-1 !py-3 sm:flex-none">
                <Zap size={15} /> Buy Now
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
                className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                  isInWishlist(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-forest/15 bg-white text-ink/50 hover:text-red-400'
                }`}
              >
                <Heart size={17} className={isInWishlist(product.id) ? 'fill-red-500' : ''} />
              </motion.button>
            </div>

            {/* trust row */}
            <div className="mt-7 grid grid-cols-3 gap-2">
              {[
                { icon: Truck, t: 'Free shipping ₹499+' },
                { icon: ThermometerSnowflake, t: 'Cold chain packed' },
                { icon: ShieldCheck, t: 'Quality guaranteed' },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center ring-1 ring-forest/8">
                  <Icon size={18} className="text-leaf" />
                  <span className="text-[11px] font-semibold text-ink/60">{t}</span>
                </div>
              ))}
            </div>

            {/* accordions */}
            <div className="mt-7 space-y-3">
              <Accordion title="Description" defaultOpen>{product.description}</Accordion>
              <Accordion title="Ingredients">
                <ul className="list-inside list-disc space-y-1">
                  {product.ingredients.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Nutritional Information (per serving)">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(product.nutrition).map(([k, v]) => (
                      <tr key={k} className="border-b border-forest/5 last:border-0">
                        <td className="py-1.5 pr-4 font-semibold capitalize text-ink/80">{k}</td>
                        <td className="py-1.5 text-ink/60">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion>
              <Accordion title="Storage Instructions">{product.storage}</Accordion>
              <Accordion title="Delivery Information">
                {product.deliveryInfo}
                <ul className="mt-2 space-y-1 text-xs text-ink/55">
                  <li>· Standard delivery: ₹40 (free above ₹499), arrives in 1–2 days.</li>
                  <li>· Express delivery: ₹99 flat, delivered same evening.</li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>

        {/* why you'll love it */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">Why You'll Love It</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {LOVE_POINTS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="card p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-pale text-forest">
                  <f.icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 text-sm font-bold text-forest">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* reviews */}
        <section id="reviews" className="mt-16 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">Customer Reviews</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="card self-start p-6 text-center">
              <p className="font-display text-5xl font-bold text-forest">{product.rating.toFixed(1)}</p>
              <RatingStars rating={product.rating} size={18} className="mt-2 justify-center" />
              <p className="mt-1 text-xs font-semibold text-ink/50">{product.reviews} verified reviews</p>
              <div className="mt-5 space-y-1.5">
                {ratingDist.map((pct, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-ink/55">
                    <span className="inline-flex w-10 items-center gap-0.5 font-semibold">
                      {5 - i}<Star size={10} className="fill-gold text-gold" />
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="block h-full rounded-full bg-gold"
                      />
                    </span>
                    <span className="w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <ul className="space-y-4">
              {MOCK_REVIEWS.map((r) => (
                <li key={r.name} className="card p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep font-display text-sm font-bold text-forest-deeper">
                        {initials(r.name)}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink">{r.name}</p>
                        <RatingStars rating={r.rating} size={12} />
                      </div>
                    </div>
                    <span className="chip bg-leaf-pale text-leaf"><BadgeCheck size={12} /> Verified</span>
                  </div>
                  {r.title && <p className="mt-3 text-sm font-bold text-forest">{r.title}</p>}
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{r.text}</p>
                  <p className="mt-2 text-[11px] font-medium text-ink/40">
                    Posted on {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">You May Also Like</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
