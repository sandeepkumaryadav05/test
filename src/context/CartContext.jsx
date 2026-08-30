import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { KEYS, loadLS, saveLS } from '../utils/storage'
import { priceFor } from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadLS(KEYS.CART, []))
  const [couponCode, setCouponCode] = useState(null)
  const [couponDiscount, setCouponDiscount] = useState(0)

  useEffect(() => {
    saveLS(KEYS.CART, items)
  }, [items])

  const addToCart = useCallback((product, { qty = 1, weight } = {}) => {
    const w = weight || (product.weights && product.weights[0]?.label) || ''
    const key = `${product.id}|${w}`
    const unitPrice = priceFor(product, w)
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, qty: Math.min(i.qty + qty, Math.max(product.stock, i.qty)) }
            : i
        )
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          category: product.category,
          weight: w,
          unitPrice,
          originalUnitPrice: product.originalPrice,
          price: unitPrice * qty,
          qty,
          stock: product.stock,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((key, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty), price: i.unitPrice * Math.max(1, qty) } : i))
    )
  }, [])

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setCouponCode(null)
    setCouponDiscount(0)
  }, [])

  const isInCart = useCallback(
    (productId) => items.some((i) => String(i.productId) === String(productId)),
    [items]
  )

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items])
  const savings = useMemo(
    () => items.reduce((s, i) => s + ((i.originalUnitPrice || i.unitPrice) - i.unitPrice) * i.qty, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      count,
      subtotal,
      savings,
      couponCode,
      couponDiscount,
      applyCouponCode: (code, discount) => {
        setCouponCode(code)
        setCouponDiscount(discount)
      },
      removeCoupon: () => {
        setCouponCode(null)
        setCouponDiscount(0)
      },
    }),
    [items, addToCart, updateQuantity, removeFromCart, clearCart, isInCart, count, subtotal, savings, couponCode, couponDiscount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
