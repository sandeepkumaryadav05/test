import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { KEYS, loadLS, saveLS } from '../utils/storage'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadLS(KEYS.WISHLIST, []))

  useEffect(() => {
    saveLS(KEYS.WISHLIST, items)
  }, [items])

  const addToWishlist = useCallback((product) => {
    setItems((prev) =>
      prev.some((p) => String(p.id) === String(product.id))
        ? prev
        : [
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              image: product.image,
              category: product.category,
              price: product.price,
              originalPrice: product.originalPrice,
              rating: product.rating,
              stock: product.stock,
              weights: product.weights,
            },
            ...prev,
          ]
    )
  }, [])

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((p) => String(p.id) !== String(id)))
  }, [])

  const toggleWishlist = useCallback(
    (product) => {
      if (isInWishlist(product.id)) removeFromWishlist(product.id)
      else addToWishlist(product)
    },
    [addToWishlist, removeFromWishlist]
  )

  const isInWishlist = useCallback(
    (id) => items.some((p) => String(p.id) === String(id)),
    [items]
  )

  const count = items.length

  const value = useMemo(
    () => ({ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, count }),
    [items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, count]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
