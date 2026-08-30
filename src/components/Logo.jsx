import logo from '../assets/products/logo.jpeg'

export default function Logo({ light = false, compact = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={logo}
        alt="Devansh Dairy logo"
        className={`shrink-0 rounded-full object-contain p-1 ${compact ? 'h-9 w-9' : 'h-11 w-11'} ${light ? 'bg-white/15 ring-1 ring-white/20' : 'bg-cream-50'}`}
      />
      {!compact && (
        <span className="leading-none">
          <span
            className={`font-display text-[22px] font-semibold tracking-tight ${
              light ? 'text-cream-50' : 'text-forest'
            }`}
          >
            Devansh<span className={light ? 'text-gold-light' : 'text-gold-deep'}> Dairy</span>
          </span>
          <span
            className={`mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] ${
              light ? 'text-cream-50/60' : 'text-ink/45'
            }`}
          >
            Dairy
          </span>
        </span>
      )}
    </span>
  )
}
