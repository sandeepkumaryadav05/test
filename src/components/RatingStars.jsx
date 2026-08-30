import { Star, StarHalf } from 'lucide-react'

export default function RatingStars({ rating = 0, size = 14, className = '' }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.4
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} size={size} className="fill-gold text-gold" strokeWidth={1} />
        if (i === full && half)
          return (
            <span key={i} className="relative inline-flex">
              <Star size={size} className="text-gold/30 fill-gold/20" strokeWidth={1} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: '55%' }}>
                <Star size={size} className="fill-gold text-gold" strokeWidth={1} />
              </span>
            </span>
          )
        return <Star key={i} size={size} className="text-ink/20 fill-ink/5" strokeWidth={1} />
      })}
    </span>
  )
}

export function StarRow({ value, onChange, size = 22 }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= Math.round(value) ? (
          <Star key={n} size={size} className="cursor-pointer fill-gold text-gold transition-transform hover:scale-110" onClick={() => onChange && onChange(n)} />
        ) : (
          <Star key={n} size={size} className="cursor-pointer text-ink/25 hover:scale-110" onClick={() => onChange && onChange(n)} />
        )
      )}
    </span>
  )
}

export { StarHalf }
