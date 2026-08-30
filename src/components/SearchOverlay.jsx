import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import useDebounce from '../hooks/useDebounce'
import { formatPrice } from '../utils/format'
import SmartImage from './SmartImage'

export default function SearchOverlay({ open, onClose }) {
  const [term, setTerm] = useState('')
  const debounced = useDebounce(term, 220)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const { products, categories } = useApp()

  useEffect(() => {
    if (open) {
      setTerm('')
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 120)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (!q) return []
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription || '').toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [debounced, products])

  const goShopSearch = (q) => {
    onClose()
    navigate(`/shop?search=${encodeURIComponent(q)}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-forest-deeper/55 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -32, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-20 w-[92%] max-w-2xl overflow-hidden rounded-3xl bg-cream-50 shadow-lift sm:mt-24"
            role="dialog"
            aria-label="Product search"
          >
            <div className="flex items-center gap-3 border-b border-forest/10 px-5 py-4">
              <Search size={19} className="shrink-0 text-leaf" />
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (debounced.trim()) goShopSearch(debounced.trim())
                    else if (results.length === 1) {
                      onClose()
                      navigate(`/product/${results[0].slug}`)
                    }
                  }
                }}
                placeholder="Search milk, paneer, ghee..."
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/35"
              />
              <button onClick={onClose} aria-label="Close search" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/40 hover:bg-forest/5 hover:text-forest">
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3">
              {!term.trim() && (
                <div className="p-3">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/45">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 8).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => goShopSearch(c.name)}
                        className="chip border border-forest/12 bg-white text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream-50"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {term.trim() && results.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="font-display text-lg font-semibold text-forest">No products found for “{term}”</p>
                  <p className="mt-1 text-sm text-ink/50">Try “milk”, “paneer”, “ghee” or browse the shop.</p>
                </div>
              )}

              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onClose()
                    navigate(`/product/${p.slug}`)
                  }}
                  className="group flex w-full items-center gap-4 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-forest-pale"
                >
                  <SmartImage src={p.image} alt={p.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-forest">{p.name}</span>
                    <span className="block truncate text-xs text-ink/50">{p.category} · {formatPrice(p.price)}</span>
                  </span>
                  <ArrowRight size={15} className="shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-forest" />
                </button>
              ))}

              {results.length > 0 && (
                <button
                  onClick={() => goShopSearch(term.trim())}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-t border-forest/8 px-4 py-3 text-sm font-semibold text-leaf hover:bg-forest-pale"
                >
                  View all results in Shop <ArrowRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
