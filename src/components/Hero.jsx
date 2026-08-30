import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImages from '../data/heroImages'
import useCountUp from '../hooks/useCountUp'
import { useShopModal } from '../context/ShopComingSoonModal'




const AUTOPLAY_INTERVAL = 5500
const TRANSITION_DURATION = 1000

function Stat({ target, suffix, label }) {
  const [ref, value] = useCountUp(target)
  return (
    <div ref={ref}>
      <p className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
        {value.toLocaleString('en-IN')}
        <span className="text-gold-light">{suffix}</span>
      </p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cream-50/65">{label}</p>
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [failedImages, setFailedImages] = useState(new Set())
  const timerRef = useRef(null)
  const sectionRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const [showShopModal, setShowShopModal] = useState(false)
  const { openShopComingSoon } = useShopModal()



  const validImages = heroImages.filter((img) => !failedImages.has(img.id))
  const total = validImages.length

  const goTo = useCallback(
    (idx) => {
      if (total === 0) return
      const next = ((idx % total) + total) % total
      setCurrent(next)
    },
    [total],
  )

  const advance = useCallback(() => goTo(current + 1), [current, goTo])
  const goBack = useCallback(() => goTo(current - 1), [current, goTo])

  // Preload images
  useEffect(() => {
    heroImages.forEach((img) => {
      const preload = new Image()
      preload.src = img.src
      preload.onerror = () => setFailedImages((prev) => new Set([...prev, img.id]))
    })
  }, [])

  // Polished All content of the page
  useEffect(() => {
    if (!showShopModal) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowShopModal(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [showShopModal])

  // Autoplay
  useEffect(() => {
    if (isPaused || total === 0) {
      clearInterval(timerRef.current)
      return undefined
    }
    timerRef.current = setInterval(advance, AUTOPLAY_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [isPaused, advance, total])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (!isPaused) {
      timerRef.current = setInterval(advance, AUTOPLAY_INTERVAL)
    }
  }, [isPaused, advance])

  const handleNext = useCallback(() => {
    advance()
    resetTimer()
  }, [advance, resetTimer])

  const handlePrev = useCallback(() => {
    goBack()
    resetTimer()
  }, [goBack, resetTimer])

  const goToSlide = useCallback(
    (idx) => {
      goTo(idx)
      resetTimer()
    },
    [goTo, resetTimer],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNext, handlePrev])

  // Touch/swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  const fallbackSrc =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23E4EEE4'/%3E%3Cstop offset='100%25' stop-color='%231E4633'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23g)'/%3E%3C/svg%3E"

  const slide = total > 0 ? validImages[current % total] : null

  return (
    <>
      <section
        ref={sectionRef}
        className="relative isolate flex min-h-[78vh] flex-col overflow-hidden sm:min-h-[82vh] lg:min-h-[86vh]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* ---- carousel background ---- */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          {validImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={false}
              animate={{
                opacity: idx === current ? 1 : 0,
                scale: idx === current ? 1 : 1.03,
              }}
              transition={{
                opacity: {
                  duration: 1.4,
                  ease: [0.4, 0, 0.2, 1],
                },
                scale: {
                  duration: 2,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              className="absolute inset-0"
              style={{
                zIndex: idx === current ? 2 : 1,
              }}
            >
              <img
                src={img.src}
                alt=""
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                onError={() =>
                  setFailedImages((prev) => new Set([...prev, img.id]))
                }
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition: img.objectPosition || 'center center',
                }}
              />
            </motion.div>
          ))}

          {/* readability overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

          {/* navbar readability */}
          <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-cream-50/60 via-cream-50/20 to-transparent sm:h-28" />

          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-cream-50/50 to-transparent sm:h-24" />
        </div>


        {/* ---- hero copy (fixed, does not change with carousel) ---- */}
        <div className="container-x relative flex flex-1 items-center pb-4 pt-32 sm:pt-36 lg:pt-40">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="chip border border-gold/45 bg-forest-deeper/50 font-semibold uppercase tracking-[0.22em] text-gold-light backdrop-blur-sm"
            >
              <Leaf size={13} /> Fresh From Devansh Dairy
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[42px] font-semibold leading-[1.05] text-cream-50 drop-shadow-md sm:text-6xl lg:text-[68px]"
            >
              Pure Dairy.
              <br />
              Naturally{' '}
              <span className="relative inline-block text-gold-light">
                Better.
                <svg viewBox="0 0 220 14" className="absolute -bottom-2 left-0 w-full text-gold" fill="none" aria-hidden="true">
                  <path d="M3 11C60 4 160 3 217 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-base leading-relaxed text-cream-50/85 sm:text-lg"
            >
              Fresh, wholesome dairy products delivered directly from our farm to your doorstep — milked at dawn,
              chilled in minutes, and on your table before sunrise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
            <button
              type="button"
              onClick={openShopComingSoon}
              className="btn-gold group"
            >
              Shop Fresh Dairy
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
            />
            </button>

              <Link
                to="/farm"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/50 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-cream-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cream-50 hover:bg-white/20 active:translate-y-0"
              >
                Explore Our Farm
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ---- navigation arrows ---- */}
        {total > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-cream-50/25 bg-forest-deeper/40 p-2.5 text-cream-50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-forest-deeper/65 hover:border-cream-50/40 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:left-5 sm:p-3"
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-cream-50/25 bg-forest-deeper/40 p-2.5 text-cream-50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-forest-deeper/65 hover:border-cream-50/40 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:right-5 sm:p-3"
            >
              <ChevronRight size={22} strokeWidth={2} />
            </button>
          </>
        )}

        {/* ---- image indicators ---- */}
        {total > 1 && (
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-10">
            {validImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                  idx === current
                    ? 'w-7 bg-gold shadow-gold'
                    : 'w-2.5 bg-cream-50/40 hover:bg-cream-50/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* ---- trust stats ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container-x relative pb-9 sm:pb-12"
        >
          <div className="grid max-w-xl grid-cols-3 divide-x divide-cream-50/25 rounded-2xl border-t border-cream-50/25 bg-forest-deeper/35 pt-5 backdrop-blur-sm">
            <div className="pl-1">
              <Stat target={25000} suffix="+" label="Happy Families" />
            </div>
            <div className="pl-5">
              <Stat target={26} suffix="" label="Quality Checks" />
            </div>
            <div className="pl-5">
              <Stat target={7} suffix=" AM" label="Daily Delivery" />
            </div>
          </div>
        </motion.div>
      </section>


    </>
  )
}
