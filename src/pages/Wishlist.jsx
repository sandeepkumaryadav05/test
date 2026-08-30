import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/format'
import RatingStars from '../components/RatingStars'
import SmartImage from '../components/SmartImage'

export default function Wishlist() {
  usePageMeta({ title: 'Your Wishlist', description: 'Save your favourite Devansh dairy products here.' })
  const { items, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast, getProduct } = useApp()

  const moveToCart = (item) => {
    const p = getProduct(item.id)
    if (p) {
      addToCart(p)
      toast(`${item.name} moved to cart`)
      removeFromWishlist(item.id)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-x animate-page-in pb-20 pt-36 sm:pt-40">
        <EmptyState
          icon={Heart}
          title="Save your favorite dairy products here."
          subtitle="Tap the heart on any product and it will wait for you right here."
          action={<Link to="/shop" className="btn-primary">Explore Dairy Products</Link>}
          className="mx-auto max-w-xl"
        />
      </div>
    )
  }

  return (
    <div className="container-x animate-page-in pb-20 pt-28 sm:pt-32">
      <span className="eyebrow">Saved With Love</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">My Wishlist</h1>
      <p className="mt-1 text-sm text-ink/55">{items.length} saved item{items.length > 1 ? 's' : ''}</p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="card flex gap-4 p-4 sm:flex-col sm:p-5">
            <Link to={`/product/${item.slug}`} className="shrink-0 sm:shrink">
              <SmartImage src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover sm:h-44 sm:w-full" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col sm:min-h-[150px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-leaf">{item.category}</span>
              <Link to={`/product/${item.slug}`} className="font-display text-base font-semibold text-forest hover:text-leaf">
                {item.name}
              </Link>
              <RatingStars rating={item.rating || 4.5} size={12} className="mt-1" />
              <p className="mt-1 font-display text-lg font-bold text-forest">{formatPrice(item.price)}</p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="btn-primary !px-4 !py-2 !text-xs"
                >
                  <ShoppingBag size={13} /> Move to Cart
                </button>
                <button
                  onClick={() => {
                    removeFromWishlist(item.id)
                    toast(`${item.name} removed from wishlist`, 'error')
                  }}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-forest/10 text-ink/45 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  <Heart size={15} className="fill-red-500/0" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
