import { Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuantitySelector({ value, onChange, min = 1, max = 99, small = false }) {
  const btn = `grid place-items-center rounded-full transition-colors ${
    small ? 'h-7 w-7' : 'h-9 w-9'
  } text-forest hover:bg-forest hover:text-cream-50 disabled:pointer-events-none disabled:opacity-30`
  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-forest/15 bg-white p-1 ${small ? '' : 'shadow-soft'}`}>
      <button type="button" aria-label="Decrease quantity" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <Minus size={small ? 13 : 15} />
      </button>
      <motion.span
        key={value}
        initial={{ scale: 0.75 }}
        animate={{ scale: 1 }}
        className={`select-none text-center font-bold text-forest ${small ? 'w-6 text-xs' : 'w-8 text-sm'}`}
      >
        {value}
      </motion.span>
      <button type="button" aria-label="Increase quantity" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <Plus size={small ? 13 : 15} />
      </button>
    </div>
  )
}
