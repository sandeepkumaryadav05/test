import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import SmartImage from './SmartImage'
import QuantitySelector from './QuantitySelector'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useApp } from '../context/AppContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { addToWishlist } = useWishlist()
  const { toast, getProduct } = useApp()

  const move = () => {
    const p = getProduct(item.productId)
    if (p) addToWishlist(p)
    removeFromCart(item.key)
    toast(`${item.name} moved to wishlist`)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-forest/5 sm:flex-nowrap"
    >
      <Link to={`/product/${item.slug}`} className="shrink-0">
        <SmartImage src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover sm:h-20 sm:w-20" />
      </Link>

      <div className="min-w-[130px] flex-1">
        <Link to={`/product/${item.slug}`} className="font-display text-base font-semibold text-forest hover:text-leaf">
          {item.name}
        </Link>
        <p className="mt-0.5 text-xs font-medium text-ink/50">{item.weight}</p>
        <p className="mt-1 text-xs text-ink/60">
          {formatPrice(item.unitPrice)} × {item.qty}
        </p>
      </div>

      <QuantitySelector small value={item.qty} onChange={(q) => updateQuantity(item.key, q)} max={Math.max(item.stock || 99, item.qty)} />

      <div className="flex min-w-[86px] items-center justify-between gap-3 sm:flex-col-reverse sm:items-end">
        <span className="font-display text-lg font-bold text-forest">{formatPrice(item.price)}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={move}
            aria-label="Move to wishlist"
            title="Move to wishlist"
            className="grid h-8 w-8 place-items-center rounded-full text-ink/40 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Heart size={15} />
          </button>
          <button
            onClick={() => {
              removeFromCart(item.key)
              toast(`${item.name} removed`, 'error')
            }}
            aria-label="Remove item"
            title="Remove"
            className="grid h-8 w-8 place-items-center rounded-full text-ink/40 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
