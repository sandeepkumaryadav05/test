import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { baseProducts, ALLOWED_CATEGORIES, DEFAULT_CATEGORIES, priceFor } from '../data/products'
import {
  baseTestimonials,
  DEFAULT_COUPONS,
  MOCK_USERS,
} from '../data/site'
import { KEYS, loadLS, saveLS } from '../utils/storage'
import { discountPercent, generateOrderId } from '../utils/format'

const AppContext = createContext(null)

let toastId = 0

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = loadLS(KEYS.PRODUCTS, null)
    const source = stored || baseProducts
    return source.filter((p) => ALLOWED_CATEGORIES.includes(p.category))
  })
  const [categories, setCategories] = useState(() => loadLS(KEYS.CATEGORIES, null) || DEFAULT_CATEGORIES)
  const [testimonials, setTestimonials] = useState(() => loadLS(KEYS.TESTIMONIALS, null) || baseTestimonials)
  const [coupons, setCoupons] = useState(() => loadLS(KEYS.COUPONS, null) || DEFAULT_COUPONS)
  const [orders, setOrders] = useState(() => loadLS(KEYS.ORDERS, []))
  const [user, setUser] = useState(
    () =>
      loadLS(KEYS.USER, null) || {
        name: 'Guest User',
        email: '',
        phone: '',
        loggedIn: false,
      }
  )
  const [addresses, setAddresses] = useState(() => loadLS(KEYS.ADDRESSES, []))
  const [subscriptions, setSubscriptions] = useState(() => loadLS(KEYS.SUBSCRIPTIONS, []))
  const [newsletter, setNewsletter] = useState(() => loadLS(KEYS.NEWSLETTER, []))
  const [toasts, setToasts] = useState([])

  /* ---------------- toasts ---------------- */
  const toast = useCallback((message, type = 'success') => {
    const id = ++toastId
    setToasts((t) => [...t.slice(-2), { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  /* ---------------- products (admin-managed) ---------------- */
  const persistProducts = useCallback((list) => {
    const filtered = list.filter((p) => ALLOWED_CATEGORIES.includes(p.category))
    setProducts(filtered)
    saveLS(KEYS.PRODUCTS, filtered)
  }, [])

  const upsertProduct = useCallback(
    (p) => {
      if (!ALLOWED_CATEGORIES.includes(p.category)) return
      setProducts((prev) => {
        const exists = prev.some((x) => x.id === p.id)
        const next = exists ? prev.map((x) => (x.id === p.id ? p : x)) : [{ ...p, id: Date.now() }, ...prev]
        saveLS(KEYS.PRODUCTS, next)
        return next
      })
    },
    []
  )

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.PRODUCTS, next)
      return next
    })
  }, [])

  const resetProducts = useCallback(() => {
    removeSafe(KEYS.PRODUCTS)
    setProducts(baseProducts)
  }, [])

  /* ---------------- categories ---------------- */
  const persistCategories = useCallback((list) => {
    setCategories(list)
    saveLS(KEYS.CATEGORIES, list)
  }, [])

  const upsertCategory = useCallback((c) => {
    setCategories((prev) => {
      const exists = prev.some((x) => x.id === c.id)
      const next = exists ? prev.map((x) => (x.id === c.id ? c : x)) : [...prev, { ...c, id: Date.now() }]
      saveLS(KEYS.CATEGORIES, next)
      return next
    })
  }, [])

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.CATEGORIES, next)
      return next
    })
  }, [])

  const resetCategories = useCallback(() => {
    removeSafe(KEYS.CATEGORIES)
    setCategories(DEFAULT_CATEGORIES)
  }, [])

  /* ---------------- testimonials ---------------- */
  const upsertTestimonial = useCallback((t) => {
    setTestimonials((prev) => {
      const exists = prev.some((x) => x.id === t.id)
      const next = exists ? prev.map((x) => (x.id === t.id ? t : x)) : [{ ...t, id: Date.now() }, ...prev]
      saveLS(KEYS.TESTIMONIALS, next)
      return next
    })
  }, [])

  const deleteTestimonial = useCallback((id) => {
    setTestimonials((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.TESTIMONIALS, next)
      return next
    })
  }, [])

  /* ---------------- coupons ---------------- */
  const upsertCoupon = useCallback((c) => {
    setCoupons((prev) => {
      const exists = prev.some((x) => x.id === c.id)
      const next = exists ? prev.map((x) => (x.id === c.id ? c : x)) : [...prev, { ...c, id: Date.now() }]
      saveLS(KEYS.COUPONS, next)
      return next
    })
  }, [])

  const deleteCoupon = useCallback((id) => {
    setCoupons((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.COUPONS, next)
      return next
    })
  }, [])

  /* ---------------- orders ---------------- */
  const addOrder = useCallback((order) => {
    setOrders((prev) => {
      const next = [order, ...prev]
      saveLS(KEYS.ORDERS, next)
      return next
    })
  }, [])

  const updateOrderStatus = useCallback((id, status) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o))
      saveLS(KEYS.ORDERS, next)
      return next
    })
  }, [])

  const clearOrders = useCallback(() => {
    removeSafe(KEYS.ORDERS)
    setOrders([])
  }, [])

  const createOrderObject = useCallback(
    ({ items, totals, address, payment, deliveryMethod, couponCode }) => {
      const order = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        customer: { name: address.fullName, phone: address.phone, email: address.email },
        address,
        deliveryMethod,
        payment,
        couponCode: couponCode || null,
        items: items.map(({ key, productId, slug, name, image, weight, price, qty }) => ({
          key,
          productId,
          slug,
          name,
          image,
          weight,
          price,
          qty,
        })),
        totals,
        status: 'Placed',
        estimatedDelivery: totals.estimatedDelivery,
      }
      saveLS(KEYS.LAST_ORDER, order)
      return order
    },
    []
  )

  /* ---------------- user & addresses ---------------- */
  const updateUser = useCallback((patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch }
      saveLS(KEYS.USER, next)
      return next
    })
  }, [])

  const loginDemo = useCallback(() => {
    const u = { name: 'Aarav Mehta', email: 'aarav@example.com', phone: '9876543210', loggedIn: true }
    setUser(u)
    saveLS(KEYS.USER, u)
  }, [])

  const logout = useCallback(() => {
    const guest = { name: 'Guest User', email: '', phone: '', loggedIn: false }
    setUser(guest)
    saveLS(KEYS.USER, guest)
  }, [])

  const addAddress = useCallback((a) => {
    setAddresses((prev) => {
      let next
      if (prev.length === 0) next = [{ ...a, id: Date.now(), isDefault: true }]
      else if (a.isDefault) next = [...prev.map((x) => ({ ...x, isDefault: false })), { ...a, id: Date.now() }]
      else next = [...prev, { ...a, id: Date.now() }]
      saveLS(KEYS.ADDRESSES, next)
      return next
    })
  }, [])

  const removeAddress = useCallback((id) => {
    setAddresses((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.ADDRESSES, next)
      return next
    })
  }, [])

  const setDefaultAddress = useCallback((id) => {
    setAddresses((prev) => {
      const next = prev.map((x) => ({ ...x, isDefault: x.id === id }))
      saveLS(KEYS.ADDRESSES, next)
      return next
    })
  }, [])

  /* ---------------- subscriptions & newsletter ---------------- */
  const addSubscription = useCallback((s) => {
    setSubscriptions((prev) => {
      const next = [{ ...s, id: `sub-${Date.now()}`, startedAt: new Date().toISOString() }, ...prev]
      saveLS(KEYS.SUBSCRIPTIONS, next)
      return next
    })
  }, [])

  const cancelSubscription = useCallback((id) => {
    setSubscriptions((prev) => {
      const next = prev.filter((x) => x.id !== id)
      saveLS(KEYS.SUBSCRIPTIONS, next)
      return next
    })
  }, [])

  const subscribeNewsletter = useCallback(
    (email) => {
      setNewsletter((prev) => {
        if (prev.includes(email)) return prev
        const next = [...prev, email]
        saveLS(KEYS.NEWSLETTER, next)
        return next
      })
    },
    []
  )

  /* ---------------- coupons apply ---------------- */
  const applyCoupon = useCallback(
    (code, subtotal) => {
      const found = coupons.find(
        (c) => c.code.toUpperCase() === String(code).toUpperCase().trim() && c.active
      )
      if (!found) return { ok: false, message: 'Invalid or expired coupon code.' }
      if (found.type === 'percent') {
        return { ok: true, coupon: found, discount: Math.round((subtotal * found.value) / 100) }
      }
      if (subtotal < 499) return { ok: false, message: 'This coupon needs a minimum order of ₹499.' }
      return { ok: true, coupon: found, discount: Math.min(found.value, subtotal) }
    },
    [coupons]
  )

  /* ---------------- derived helpers ---------------- */
  const getProduct = useCallback(
    (idOrSlug) => products.find((p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)),
    [products]
  )

  const customers = useMemo(() => {
    const fromOrders = orders.map((o) => ({
      name: o.customer?.name || 'Guest',
      phone: o.customer?.phone || '',
      email: o.customer?.email || '',
      city: o.address?.city || '',
      orders: 1,
      joined: o.createdAt,
    }))
    const map = new Map()
    for (const u of MOCK_USERS) map.set(u.phone, { ...u })
    for (const o of fromOrders) {
      const k = o.phone || o.email || o.name
      if (!k) continue
      if (map.has(k)) map.set(k, { ...map.get(k), orders: map.get(k).orders + 1 })
      else map.set(k, { ...o, id: k })
    }
    return Array.from(map.values())
  }, [orders])

  const value = useMemo(
    () => ({
      products,
      categories,
      testimonials,
      coupons,
      orders,
      user,
      addresses,
      subscriptions,
      customers,
      newsletter,
      toasts,
      toast,
      dismissToast,
      persistProducts,
      upsertProduct,
      deleteProduct,
      resetProducts,
      persistCategories,
      upsertCategory,
      deleteCategory,
      resetCategories,
      upsertTestimonial,
      deleteTestimonial,
      upsertCoupon,
      deleteCoupon,
      addOrder,
      updateOrderStatus,
      clearOrders,
      createOrderObject,
      updateUser,
      loginDemo,
      logout,
      addAddress,
      removeAddress,
      setDefaultAddress,
      addSubscription,
      cancelSubscription,
      subscribeNewsletter,
      applyCoupon,
      getProduct,
    }),
    [
      products, categories, testimonials, coupons, orders, user, addresses, subscriptions,
      customers, newsletter, toasts, toast, dismissToast, persistProducts, upsertProduct,
      deleteProduct, resetProducts, persistCategories, upsertCategory, deleteCategory,
      resetCategories, upsertTestimonial, deleteTestimonial, upsertCoupon, deleteCoupon,
      addOrder, updateOrderStatus, clearOrders, createOrderObject, updateUser, loginDemo,
      logout, addAddress, removeAddress, setDefaultAddress, addSubscription,
      cancelSubscription, subscribeNewsletter, applyCoupon, getProduct,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

function removeSafe(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* noop */
  }
}

export { priceFor, discountPercent }
