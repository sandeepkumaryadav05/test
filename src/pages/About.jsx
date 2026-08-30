import { motion } from 'framer-motion'
import { ArrowRight, Award, HeartHandshake, Leaf, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import usePageMeta from '../hooks/usePageMeta'
import useCountUp from '../hooks/useCountUp'
import { IMAGES } from '../utils/images'

function StatBlock({ target, suffix, label }) {
  const [ref, value] = useCountUp(target)
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold text-forest sm:text-4xl">
        {value.toLocaleString('en-IN')}<span className="text-gold-deep">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</p>
    </div>
  )
}

const VALUES = [
  { icon: Sprout, title: 'Natural Feeding', text: 'Our cows eat organic fodder grown on the farm — never hormone-laced commercial feed.' },
  { icon: HeartHandshake, title: 'Cow Care First', text: 'Daily vet visits, massage sessions and open grazing. Healthy cows simply give better milk.' },
  { icon: Award, title: 'Honest Labels', text: 'What the front says is exactly what is inside. No fine print, no hidden additives.' },
]

export default function About() {
  usePageMeta({
    title: 'About Our Farm',
    description: 'From Our Farm to Your Table — discover the story, values and people behind Devansh Dairy.',
  })

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      {/* hero */}
      <section className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow"><Leaf size={13} /> Our Story</span>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
            From Our Farm<br />to Your Table
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/65">
            Devansh began in 2018 with twelve Gir cows, one chilling vat and a simple frustration: city milk just wasn't fresh.
            Today our herd of 300+ happy cows supplies over 25,000 families — yet every litre still follows the same rule it did on day one:
            <strong className="text-forest"> milked at dawn, delivered before sunrise.</strong>
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-forest/10 pt-7">
            <StatBlock target={8} suffix="+" label="Years of Trust" />
            <StatBlock target={25} suffix="k+" label="Happy Families" />
            <StatBlock target={300} suffix="+" label="Loved Cows" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute inset-3 -rotate-3 rounded-[2rem] bg-sand" />
          <SmartImage
            src={IMAGES.cowsPasture}
            alt="Devansh herd grazing at sunrise"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
          />
        </motion.div>
      </section>

      {/* story sections */}
      <section className="container-x mt-24 space-y-16 sm:mt-28 lg:space-y-20">
        <StoryRow
          image={IMAGES.greenField}
          title="Our Dairy"
          text="Spread across 120 acres of organic pasture in the hills outside Pune, our farm is designed around the cow, not the conveyor. Open barns, soft bedding and shaded grazing lanes mean our animals live like family — because they are."
        />
        <StoryRow
          reverse
          image={IMAGES.farmerHands}
          title="Natural Feeding & Cow Care"
          text="Fodder is grown on-site without pesticides; water is filtered; every cow wears a health tracker. Pregnant and new mothers get special diets and rest pens. A stress-free cow gives sweeter, richer milk — you can taste the kindness."
        />
        <StoryRow
          image={IMAGES.labScience}
          title="Quality Testing & Hygienic Packaging"
          text="Every batch passes 26 automated lab checks for purity, fat, SNF and adulterants. Packaging happens in a positive-pressure clean room where the air itself is filtered. If a batch doesn't pass, it never leaves."
        />
      </section>

      {/* values */}
      <section className="container-x mt-24 sm:mt-28">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Values That Guide Every Litre"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card p-7 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest-pale text-forest">
                <v.icon size={24} strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-leaf to-forest px-8 py-12 text-center shadow-lift sm:py-16">
          <h2 className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl">Taste the Difference Tonight</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream-50/80">
            Order before 9 PM and wake up to farm-fresh dairy at your door tomorrow morning.
          </p>
          <Link 
            // to="/shop" 
            className="btn-gold relative mt-6 group">
            Shop Fresh Dairy <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function StoryRow({ image, title, text, reverse }) {
  return (
    <div className={`grid items-center gap-8 lg:grid-cols-2 ${reverse ? '' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className={reverse ? 'lg:order-2' : ''}
      >
        <SmartImage
          src={image}
          alt={title}
          className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-card"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.12 }}
      >
        <span className="text-[11px] h-px w-10 inline-block bg-gold align-middle mr-2" aria-hidden="true" />
        <h2 className="inline font-display text-2xl font-semibold text-forest sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">{text}</p>
      </motion.div>
    </div>
  )
}
