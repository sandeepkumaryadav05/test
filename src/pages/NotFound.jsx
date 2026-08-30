import { motion } from 'framer-motion'
import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({ title: 'Page Not Found', description: 'The page you are looking for has wandered off the pasture.' })
  return (
    <div className="grid animate-page-in min-h-[70vh] place-items-center px-4 pt-24">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
        >
          <svg width="150" height="110" viewBox="0 0 150 110" fill="none" aria-hidden="true" className="mx-auto">
            <ellipse cx="75" cy="96" rx="52" ry="8" fill="#1E4633" opacity="0.08" />
            <rect x="38" y="34" width="74" height="58" rx="18" fill="#1E4633" />
            <circle cx="60" cy="56" r="5" fill="#FDFAF3" />
            <circle cx="90" cy="56" r="5" fill="#FDFAF3" />
            <path d="M66 72c3 3 15 3 18 0" stroke="#FDFAF3" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 40c-10-6-22-2-26 6-3 7 1 16 10 18M108 40c10-6 22-2 26 6 3 7-1 16-10 18" stroke="#D9A441" strokeWidth="7" strokeLinecap="round" />
            <path d="M62 30l-6-12M88 30l6-12" stroke="#1E4633" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </motion.div>
        <p className="mt-6 font-display text-6xl font-bold text-forest sm:text-7xl">404</p>
        <h1 className="mt-2 font-display text-xl font-semibold text-ink/80">This page wandered off to graze.</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/55">
          The link may be broken or the page may have moved. Let's get you back to fresh pastures.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary"><ArrowLeft size={15} /> Back Home</Link>
          <Link to="/shop" className="btn-outline"><Compass size={15} /> Browse Shop</Link>
        </div>
      </div>
    </div>
  )
}
