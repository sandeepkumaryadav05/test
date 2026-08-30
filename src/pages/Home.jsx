import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, CalendarClock, CheckCircle2, Leaf, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import CategoryCard from '../components/CategoryCard'
import ProductGrid from '../components/ProductGrid'
import TestimonialCarousel from '../components/TestimonialCard'
import SmartImage from '../components/SmartImage'
import Modal from '../components/Modal'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'
import { WHY_CHOOSE_US, GALLERY } from '../data/site'
import { IMAGES } from '../utils/images'
import QuantitySelector from '../components/QuantitySelector'

const ICONS = {
  Leaf,
  Tractor: Truck,
  ShieldCheck,
  FlaskConical: BadgeCheck,
  ThermometerSnowflake: PackageCheck,
  HeartHandshake: CheckCircle2,
}

const FREQUENCIES = [
  { id: 'daily', label: 'Daily', perMonth: 30 },
  { id: 'alternate', label: 'Alternate Days', perMonth: 15 },
  { id: 'weekly', label: 'Weekly', perMonth: 4 },
  { id: 'monthly', label: 'Monthly', perMonth: 1 },
]

const SUB_PRODUCTS = [
  { name: 'Milk', price: 75 },
  { name: 'Curd', price: 70 },
  { name: 'Paneer', price: 120 },
  { name: 'Ghee', price: 650 },
]

export default function Home() {
  usePageMeta({
    rawTitle: 'Devansh Dairy | Fresh Dairy Products',
    description:
      'Order farm-fresh A2 milk, paneer, ghee, curd, butter and more online. Delivered before sunrise with an unbroken cold chain. Pure From Our Farm to Your Family.',
  })
  const { products, categories } = useApp()
  const featured = products.filter((p) => p.bestseller).slice(0, 8)

  return (
    <div className="animate-page-in">
      <Hero />
      <TrustStrip />  
      <Categories categories={categories} />
      <Featured products={featured} />
      <OfferBanner />
      <WhyChooseUs />
      <ProcessTeaser />
      {/* <SubscriptionSection /> */}
      <Testimonials />
      <GalleryPreview />
    </div>
  )
}

/* ---------------- trust marquee ---------------- */
function TrustStrip() {
  const items = ['100% Fresh Every Morning', 'Farm Direct — No Middlemen', '26 Quality Checks Per Batch', 'Cold Chain Below 4°C', 'Free Delivery Above ₹499']
  const row = [...items, ...items]
  return (
    <div className="border-y border-forest/10 bg-forest py-3.5 text-cream-50">
      <div className="flex overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10">
          {row.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-cream-50/90">
              <Sparkles size={13} className="text-gold-light" /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- categories ---------------- */
function Categories({ categories }) {
  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <SectionHeading
        eyebrow="Fresh From Our Farm"
        title="Shop by Category"
        description="Eight honest dairy staples, each made in small batches and delivered at peak freshness."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <CategoryCard key={c.id} category={c} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ---------------- featured ---------------- */
function Featured({ products }) {
  return (
    <section id="products" className="scroll-mt-28 bg-white/60 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Loved by Families"
            title="Our Best Sellers"
            description="The jars, bottles and blocks our customers reorder again and again."
          />
          <Link 
            // to="/shop" 
            className="btn-outline shrink-0 !px-5 !py-2.5 !text-xs">
              View All Products <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}

/* ---------------- offer ---------------- */
function OfferBanner() {
  return (
    <section className="container-x py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest via-forest-light to-forest-deeper px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16"
      >
        <div aria-hidden="true" className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
        <span className="relative inline-flex items-center gap-2 chip bg-gold text-forest-deeper">Farm Fresh Offers</span>
        <h3 className="relative mt-4 font-display text-sm font-bold uppercase tracking-[0.3em] text-gold-light">First Order</h3>
        <p className="relative mt-2 font-display text-5xl font-bold text-cream-50 sm:text-7xl">
          20% OFF
        </p>
        <p className="relative mx-auto mt-4 max-w-md text-sm text-cream-50/75">
          Use coupon <span className="rounded-md border border-dashed border-gold px-2 py-0.5 font-mono font-bold tracking-[0.25em] text-gold-light">FRESH20</span> on your first order above ₹299.
        </p>
        <button
          type="button"
          onClick={() =>
            document.getElementById('products')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
          className="btn-gold relative mt-7"
        >
          Shop Now <ArrowRight size={15} />
        </button>
      </motion.div>
    </section>
  )
}

/* ---------------- why choose us ---------------- */
function WhyChooseUs() {
  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <SectionHeading
        eyebrow="The Devansh Promise"
        title="Why Choose Us"
        description="Six reasons thousands of families trust us with their mornings."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE_US.map((f, i) => {
          const Icon = ICONS[f.icon] || Leaf
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-pale text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-gold-light">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.text}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------- process teaser ---------------- */
function ProcessTeaser() {
  return (
    <section className="bg-forest-deeper py-16 text-cream-50 sm:py-20">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="Farm to Table"
          title="Our Simple 5-Step Process"
          description="From a contented cow to your breakfast table — every step obsessively cared for."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { n: '01', t: 'Happy & Healthy Cows' },
            { n: '02', t: 'Fresh Milking' },
            { n: '03', t: 'Quality Testing' },
            { n: '04', t: 'Hygienic Packaging' },
            { n: '05', t: 'Doorstep Delivery' },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="group relative rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:bg-white/10"
            >
              <span className="font-display text-3xl font-bold text-gold">{s.n}</span>
              <p className="mt-3 text-sm font-semibold leading-snug text-cream-50/90">{s.t}</p>
              {i < 4 && (
                <ArrowRight size={18} className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold lg:block" />
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link to="/farm" className="btn-gold">
            See Our Full Story <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------- subscription ---------------- */
function SubscriptionSection() {
  const [freq, setFreq] = useState('daily')
  const [prodIdx, setProdIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { addSubscription, toast } = useApp()

  const product = SUB_PRODUCTS[prodIdx]
  const frequency = FREQUENCIES.find((f) => f.id === freq)
  const monthly = product.price * qty * frequency.perMonth

  const start = () => {
    addSubscription({ product: product.name, frequency: frequency.label, qty, monthlyEstimate: monthly })
    setConfirmOpen(false)
    toast(`Subscription started — ${product.name} ${frequency.label.toLowerCase()}!`)
  }

  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] shadow-lift">
          <SmartImage
            src={IMAGES.milkPour}
            alt="Fresh milk being poured"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deeper/80 via-forest-deeper/20 to-transparent" />
          <div className="absolute bottom-0 p-7 sm:p-9">
            <h3 className="font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-4xl">
              Fresh Dairy,<br />Delivered Every Morning.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-50/80">
              Never run out of the essentials again. Pause, resume or change your plan anytime — no questions asked.
            </p>
          </div>
        </div>

            <div className="card flex flex-col p-6 sm:p-8">
              <span className="eyebrow"><CalendarClock size={13} /> Morning Subscription</span>
              <h4 className="mt-2 font-display text-xl font-semibold text-forest">Build Your Plan</h4>

              <p className="label mt-5">Choose Product</p>
              <div className="flex flex-wrap gap-2">
                {SUB_PRODUCTS.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setProdIdx(i)}
                    className={`chip border transition-all ${
                      prodIdx === i ? 'border-forest bg-forest text-cream-50' : 'border-forest/15 bg-white text-ink/70 hover:border-forest/40'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <p className="label mt-5">Frequency</p>
              <div className="flex flex-wrap gap-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFreq(f.id)}
                    className={`chip border transition-all ${
                      freq === f.id ? 'border-leaf bg-leaf-pale text-forest ring-1 ring-leaf' : 'border-forest/15 bg-white text-ink/70 hover:border-leaf'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="label !mb-0">Quantity</span>
                <QuantitySelector small value={qty} onChange={(v) => setQty(Math.min(5, Math.max(1, v)))} max={5} />
              </div>

              <div className="mt-6 flex items-end justify-between rounded-2xl bg-forest-pale px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Estimated / month</p>
                  <p className="font-display text-2xl font-bold text-forest">₹{monthly.toLocaleString('en-IN')}</p>
                </div>
                <button onClick={() => setConfirmOpen(true)} className="btn-primary !px-5 !py-2.5 !text-xs">
                  Start Subscription
                </button>
              </div>
            </div>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm Your Subscription">
        <ul className="space-y-2 rounded-2xl bg-white p-5 text-sm text-ink/75 ring-1 ring-forest/8">
          <li><strong>Product:</strong> {product.name}</li>
          <li><strong>Frequency:</strong> {frequency.label} delivery</li>
          <li><strong>Quantity:</strong> {qty} per delivery</li>
          <li><strong>Estimated monthly:</strong> ₹{monthly.toLocaleString('en-IN')}</li>
          <li><strong>Delivery slot:</strong> Before 7 AM, doorstep</li>
        </ul>
        <p className="mt-3 text-xs text-ink/50">
          This is a demo store — subscriptions are saved locally in your browser only.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setConfirmOpen(false)} className="btn-outline !px-5 !py-2.5 !text-xs">Cancel</button>
          <button onClick={start} className="btn-primary !px-5 !py-2.5 !text-xs">
            <CheckCircle2 size={14} /> Confirm & Start
          </button>
        </div>
      </Modal>
    </section>
  )
}

/* ---------------- testimonials ---------------- */
function Testimonials() {
  const { testimonials } = useApp()
  return (
    <section className="bg-white/60 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Families Say About Us"
          description="Unfiltered words from kitchens across the city."
        />
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}

/* ---------------- gallery preview ---------------- */
function GalleryPreview() {
  const imgs = GALLERY.slice(0, 6)
  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <SectionHeading
        eyebrow="Life on the Farm"
        title="Moments From Devansh Farm"
        description="A peek into the pastures, people and processes behind every bottle."
      />
      <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {imgs.map((g, i) => (
          <motion.figure
            key={g.id + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`group relative break-inside-avoid overflow-hidden rounded-3xl shadow-card ${g.tall ? 'aspect-[3/4]' : 'aspect-square'}`}
          >
            <img src={g.id} alt={g.caption} loading="eager" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest-deeper/85 to-transparent p-4 pt-10 text-xs font-semibold text-cream-50 transition-transform duration-300 group-hover:translate-y-0">
              {g.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/farm" className="btn-outline">Visit the Full Gallery <ArrowRight size={14} /></Link>
      </div>
    </section>
  )
}
