import { motion } from 'framer-motion'
import { Droplets, FlaskConical, Heart, PackageCheck, Truck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import usePageMeta from '../hooks/usePageMeta'
import { PROCESS_STEPS, GALLERY } from '../data/site'

const ICONS = {
  Heart,
  Droplets,
  FlaskConical,
  PackageCheck,
  Truck,
}

export default function Farm() {
  usePageMeta({
    title: 'Our Process & Gallery',
    description: 'Five obsessive steps from happy cows to your doorstep — plus a gallery of life at Devansh farm.',
  })

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      {/* process */}
      <section className="container-x">
        <SectionHeading
          eyebrow="Farm to Table in 5 Steps"
          title="How Devansh Reaches You"
          description="Every single day, the same uncompromising journey from pasture to porch."
        />

        <ol className="relative mx-auto mt-16 max-w-3xl">
          {/* animated connecting line */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            className="absolute left-6 top-4 h-[calc(100%-3rem)] w-0.5 origin-top bg-gradient-to-b from-leaf via-gold to-leaf sm:left-1/2 sm:-translate-x-1/2"
          />
          {PROCESS_STEPS.map((s, i) => {
            const Icon = ICONS[s.icon] || Heart
            const leftSide = i % 2 === 0
            return (
              <motion.li
                key={s.num}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
                className={`relative mb-10 flex gap-5 pl-14 sm:w-1/2 sm:pl-0 ${
                  leftSide ? 'sm:pr-12' : 'sm:ml-auto sm:pl-12'
                }`}
              >
                <span
                  className={`absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-forest font-display text-sm font-bold text-gold-light shadow-lift ring-4 ring-cream-50 sm:left-auto ${
                    leftSide ? 'sm:-right-6' : 'sm:-left-6'
                  }`}
                >
                  <Icon size={19} className="text-cream-50" />
                </span>
                <div className="card w-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <p className="font-display text-3xl font-bold text-gold">{s.num}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-forest">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </section>

      {/* commitment band */}
      <section className="bg-forest py-14 text-center text-cream-50">
        <div className="container-x">
          <p className="font-display text-2xl font-semibold sm:text-3xl">
            “We don't sell milk. We deliver trust — one bottle at a time.”
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-gold-light">— The Devansh Family</p>
        </div>
      </section>

      {/* full gallery */}
      <section id="gallery" className="container-x mt-20 scroll-mt-28">
        <SectionHeading
          eyebrow="Farm Gallery"
          title="Life at Devansh Farm"
          description="Pastures, parlours and the people who make it all happen."
        />
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.id + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`group relative break-inside-avoid overflow-hidden rounded-3xl shadow-card ${g.tall ? 'aspect-[3/4]' : 'aspect-square'}`}
            >
              <img
                src={g.id}
                alt={g.caption}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest-deeper/90 to-transparent p-4 pt-12 text-xs font-semibold text-cream-50 transition-transform duration-300 group-hover:translate-y-0">
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  )
}
