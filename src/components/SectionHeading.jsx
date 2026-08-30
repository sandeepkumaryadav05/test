import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 ${alignCls}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? 'text-gold-light' : ''}`}>
          <span className={`h-px w-8 ${light ? 'bg-gold-light/60' : 'bg-leaf/50'}`} />
          {eyebrow}
          {align !== 'left' && <span className={`h-px w-8 ${light ? 'bg-gold-light/60' : 'bg-leaf/50'}`} />}
        </span>
      )}
      <h2
        className={`max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[42px] ${
          light ? 'text-cream-50' : 'text-forest'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${light ? 'text-cream-50/70' : 'text-ink/60'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
