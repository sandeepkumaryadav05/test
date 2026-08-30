import { PackageSearch, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import EmptyState from '../components/EmptyState'
import SkeletonCard from '../components/SkeletonCard'
import Modal from '../components/Modal'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'popular', label: 'Popular' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest' },
]

export default function Shop() {
  usePageMeta({
    title: 'Shop Fresh Dairy',
    description: 'Browse farm-fresh milk, paneer, ghee, curd, butter, cheese, lassi and flavored milk. Filter by category, price and rating.',
  })
  const [params, setParams] = useSearchParams()
  const { products, categories } = useApp()

  const [search, setSearch] = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState('featured')
  const [priceMax, setPriceMax] = useState(() => Math.max(...products.map((p) => p.price), 100))
  const [minRating, setMinRating] = useState(0)
  const [availability, setAvailability] = useState(['In Stock', 'Out of Stock'])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const maxPossible = useMemo(
    () => Math.max(...products.map((p) => p.price), 100),
    [products]
  )

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  /* two-way URL sync (shareable /shop?search=milk&category=Ghee) */
  const urlKey = `${params.get('search') || ''}|${params.get('category') || ''}`
  const [lastUrlKey, setLastUrlKey] = useState(urlKey)

  useEffect(() => {
    if (urlKey === lastUrlKey) return
    setLastUrlKey(urlKey)
    setSearch(params.get('search') || '')
    setCategory(params.get('category') || 'All')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlKey])

  useEffect(() => {
    const nextParams = {}
    if (search.trim()) nextParams.search = search.trim()
    if (category !== 'All') nextParams.category = category
    const nextKey = `${nextParams.search || ''}|${nextParams.category || ''}`
    if (nextKey !== lastUrlKey) {
      setLastUrlKey(nextKey)
      setParams(nextParams, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category])

  const counts = useMemo(() => {
    const map = {}
    for (const p of products) map[p.category] = (map[p.category] || 0) + 1
    return map
  }, [products])

  const filtered = useMemo(() => {
    let list = [...products]
    const q = search.trim().toLowerCase()
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription || '').toLowerCase().includes(q)
      )
    if (category !== 'All') list = list.filter((p) => p.category === category)
    list = list.filter((p) => p.price <= priceMax)
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating)
    list = list.filter((p) =>
      availability.includes(p.stock > 0 ? 'In Stock' : 'Out of Stock')
    )
    switch (sort) {
      case 'popular':
        list.sort((a, b) => b.reviews - a.reviews)
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    }
    return list
  }, [products, search, category, priceMax, minRating, availability, sort])

  const clearAll = () => {
    setCategory('All')
    setPriceMax(maxPossible)
    setMinRating(0)
    setAvailability(['In Stock', 'Out of Stock'])
    setSort('featured')
    setSearch('')
  }

  const filterProps = {
    categories: { list: categories, counts, total: products.length },
    activeCategory: category,
    onCategory: setCategory,
    priceMax,
    maxPossible,
    onPriceMax: setPriceMax,
    minRating,
    onMinRating: setMinRating,
    availability,
    onAvailability: setAvailability,
    onClear: clearAll,
  }

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">The Dairy Aisle</span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">
              {category === 'All' ? 'All Products' : category}
            </h1>
            <p className="mt-1 text-sm text-ink/55" aria-live="polite">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <label className="relative block sm:hidden">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
               
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                aria-label="Search products"
                className="input !w-44 !py-2 !pl-9 !text-xs"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="cursor-pointer rounded-full border border-forest/15 bg-white px-4 py-2.5 text-xs font-semibold text-forest outline-none transition-colors hover:border-leaf focus:ring-4 focus:ring-leaf/15"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <button onClick={() => setFiltersOpen(true)} className="btn-primary !px-4 !py-2.5 !text-xs xl:hidden">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        {/* desktop search bar */}
        <label className="relative mt-6 hidden max-w-md sm:block">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
           
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fresh dairy products"
            aria-label="Search products"
            className="input !rounded-full !py-3 !pl-11"
          />
        </label>

        <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[270px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-forest/5">
              <ProductFilter {...filterProps} />
            </div>
          </aside>

          {/* grid */}
          <div>
            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={PackageSearch}
                title="No products found."
                subtitle="We couldn't match your filters. Try widening the price range or clearing filters."
                action={
                  <button onClick={clearAll} className="btn-primary !px-5 !py-2.5 !text-xs">
                    Clear All Filters
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter sheet */}
      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" maxWidth="max-w-md">
        <ProductFilter {...filterProps} />
        <button onClick={() => setFiltersOpen(false)} className="btn-primary mt-7 w-full !py-2.5 !text-xs">
          Show {filtered.length} Products
        </button>
      </Modal>
    </div>
  )
}
