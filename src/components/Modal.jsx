import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg', sheet = false }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[90] grid place-items-center bg-forest-deeper/50 backdrop-blur-sm ${
            sheet ? 'items-end sm:items-center' : ''
          }`}
          onClick={onClose}
        >
          <motion.div
            initial={sheet ? { y: 80, opacity: 0 } : { scale: 0.94, y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${maxWidth} max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream-50 p-6 shadow-lift sm:p-8`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-forest sm:text-2xl">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/50 transition-colors hover:bg-forest/5 hover:text-forest"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
