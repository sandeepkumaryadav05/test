import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastViewport() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[95] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            onClick={() => dismissToast(t.id)}
            className={`pointer-events-auto flex w-full items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-sm font-medium shadow-lift ring-1 ${
              t.type === 'error'
                ? 'bg-red-50 text-red-700 ring-red-200'
                : 'bg-white text-forest ring-forest/10'
            }`}
          >
            {t.type === 'error' ? (
              <XCircle size={17} className="shrink-0 text-red-500" />
            ) : (
              <CheckCircle2 size={17} className="shrink-0 text-leaf" />
            )}
            {t.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
