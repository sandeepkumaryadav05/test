import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        // to={`/shop?category=${encodeURIComponent(category.name)}`}
        className="group block overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-forest/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deeper/60 via-transparent to-transparent opacity-70" />
          <span className="absolute bottom-3 left-4 font-display text-xl font-semibold text-cream-50 drop-shadow">
            {category.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
          <p className="text-xs leading-relaxed text-ink/55">{category.description}</p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-pale text-forest transition-all duration-300 group-hover:bg-gold group-hover:text-forest-deeper">
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

