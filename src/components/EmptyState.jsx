import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, subtitle, action, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-forest/20 bg-white/60 px-6 py-16 text-center ${className}`}
    >
      {Icon && (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="grid h-20 w-20 place-items-center rounded-full bg-forest-pale text-forest"
        >
          <Icon size={34} strokeWidth={1.6} />
        </motion.div>
      )}
      <h3 className="font-display text-2xl font-semibold text-forest">{title}</h3>
      {subtitle && <p className="max-w-sm text-sm leading-relaxed text-ink/55">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  )
}
