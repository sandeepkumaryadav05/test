import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/format'
import SmartImage from './SmartImage'
import RatingStars from './RatingStars'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { toast } = useApp()

  const inWishlist = isInWishlist(product.id)
  const outOfStock = product.stock <= 0

  const handleAdd = () => {
    if (outOfStock) return
    addToCart(product)
    toast(`${product.name} added to cart`)
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    if (!inWishlist) toast(`${product.name} saved to wishlist`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-forest/5 transition-shadow duration-300 hover:shadow-lift"
    >
      <Link 
        // to={`/product/${product.slug}`} 
        className="relative block aspect-square overflow-hidden bg-sand">
        <SmartImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 chip bg-gold text-forest-deeper shadow-gold">
            {product.discount}% OFF
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-[2px]">
            <span className="chip bg-forest text-cream-50">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* <motion.button
        type="button"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={handleWishlist}
        whileTap={{ scale: 0.8 }}
        animate={inWishlist ? { scale: [1, 1.35, 1] } : {}}
        transition={{ duration: 0.35 }}
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-soft backdrop-blur transition-colors ${
          inWishlist ? 'bg-red-50 text-red-500 ring-1 ring-red-200' : 'bg-white/90 text-ink/50 hover:text-red-400'
        }`}
      >
        <Heart size={16} className={inWishlist ? 'fill-red-500' : ''} />
      </motion.button> */}

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-leaf">{product.category}</span>
          {(product.bestseller || product.featured) && (
            <span className="chip bg-forest-pale text-forest">{product.bestseller ? 'Bestseller' : 'Featured'}</span>
          )}
        </div>

        <Link 
          // to={`/product/${product.slug}`} 
          className="font-display text-base font-semibold leading-snug text-forest transition-colors hover:text-leaf sm:text-lg">
          {product.name}
        </Link>

        <p className="line-clamp-2 text-xs leading-relaxed text-ink/55">{product.shortDescription}</p>

        <div className="flex items-center gap-1.5 pt-0.5">
          <RatingStars rating={product.rating} size={13} />
          <span className="text-xs font-medium text-ink/45">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-lg font-bold text-forest">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-ink/40 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <span className="text-[11px] font-medium text-ink/45">{(product.weights?.[0] || {}).label}</span>
          </div>

          {/* cart button */}
          {/* <motion.button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            whileTap={{ scale: 0.92 }}
            aria-label={`Add ${product.name} to cart`}
            className="grid h-10 w-10 place-items-center rounded-full bg-forest text-cream-50 shadow-card transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-forest-deeper disabled:pointer-events-none disabled:bg-ink/20"
          >
            <ShoppingBag size={17} />
          </motion.button> */}
        </div>
      </div>
    </motion.article>
  )
}
