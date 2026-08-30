import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { initials } from '../utils/format'
import RatingStars from './RatingStars'

export default function TestimonialCarousel({ testimonials = [] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  useEffect(() => {
    if (paused || count <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5200)
    return () => clearInterval(t)
  }, [paused, count])

  if (count === 0) return null
  const current = testimonials[index % count]

  return (
    <div
      className="relative mx-auto mt-10 max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-forest/5 sm:p-12">
        <Quote size={64} className="absolute -top-1 right-6 rotate-12 text-forest-pale" fill="currentColor" strokeWidth={0} />
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id || index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <RatingStars rating={current.rating} size={16} />
            <blockquote className="mt-4 font-display text-lg font-medium leading-relaxed text-forest sm:text-2xl sm:leading-snug">
              “{current.text}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-leaf to-forest font-display text-sm font-bold text-cream-50">
                {initials(current.name)}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{current.name}</span>
                <span className="block text-xs text-ink/50">{current.location} · Verified Buyer</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* arrows */}
      <button
        aria-label="Previous testimonial"
        onClick={() => setIndex((i) => (i - 1 + count) % count)}
        className="absolute -left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-lift ring-1 ring-black/5 transition-transform hover:scale-105 sm:-left-5"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next testimonial"
        onClick={() => setIndex((i) => (i + 1) % count)}
        className="absolute -right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-lift ring-1 ring-black/5 transition-transform hover:scale-105 sm:-right-5"
      >
        <ChevronRight size={18} />
      </button>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.id ?? i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index % count ? 'w-7 bg-gold' : 'w-2 bg-forest/20 hover:bg-forest/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
