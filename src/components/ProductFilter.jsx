import { RotateCcw } from 'lucide-react'

const RATINGS = [
  { value: 4.5, label: '4.5 & above' },
  { value: 4.0, label: '4.0 & above' },
  { value: 3.5, label: '3.5 & above' },
]

export default function ProductFilter({
  categories,
  activeCategory,
  onCategory,
  priceMax,
  maxPossible,
  onPriceMax,
  minRating,
  onMinRating,
  availability,
  onAvailability,
  onClear,
}) {
  return (
    <div className="space-y-7">
      <FilterSection title="Category">
        <ul className="space-y-1">
          <li>
            <Radio label={`All (${categories.total})`} checked={activeCategory === 'All'} onChange={() => onCategory('All')} />
          </li>
          {categories.list.map((c) => {
            const count = categories.counts[c.name] || 0
            if (count === 0) return null
            return (
              <li key={c.id || c.name}>
                <Radio
                  label={`${c.name} (${count})`}
                  checked={activeCategory === c.name}
                  onChange={() => onCategory(c.name)}
                />
              </li>
            )
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Price Range">
        <input
          type="range"
          min={40}
          max={maxPossible}
          step={10}
          value={priceMax}
          onChange={(e) => onPriceMax(Number(e.target.value))}
          style={{ ['--fill']: `${((priceMax - 40) / (maxPossible - 40)) * 100}%` }}
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between text-xs font-semibold text-ink/55">
          <span>₹40</span>
          <span className="rounded-full bg-forest-pale px-2 py-0.5 text-forest">Up to ₹{priceMax}</span>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <ul className="space-y-1">
          {RATINGS.map((r) => (
            <li key={r.value}>
              <Radio
                label={<span className="inline-flex items-center gap-1">★ {r.label}</span>}
                checked={minRating === r.value}
                onChange={() => onMinRating(minRating === r.value ? 0 : r.value)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-2.5">
          {['In Stock', 'Out of Stock'].map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/75">
              <input
                type="checkbox"
                checked={availability.includes(a)}
                onChange={() =>
                  onAvailability(
                    availability.includes(a) ? availability.filter((x) => x !== a) : [...availability, a]
                  )
                }
                className="h-4 w-4 rounded border-forest/25 accent-[#1E4633]"
              />
              {a}
            </label>
          ))}
        </div>
      </FilterSection>

      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 text-sm font-semibold text-clay transition-colors hover:text-cocoa"
      >
        <RotateCcw size={14} /> Clear all filters
      </button>
    </div>
  )
}

function FilterSection({ title, children }) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-forest">{title}</h3>
      {children}
    </section>
  )
}

function Radio({ label, checked, onChange }) {
  return (
    <button type="button" onClick={onChange} className="flex w-full items-center gap-2.5 rounded-lg py-1 text-left text-sm text-ink/75 transition-colors hover:text-forest">
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
          checked ? 'border-leaf bg-leaf' : 'border-forest/30'
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  )
}
