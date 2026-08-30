const KEYS = {
  CART: 'devansh_cart',
  WISHLIST: 'devansh_wishlist',
  ORDERS: 'devansh_orders',
  USER: 'devansh_user',
  ADDRESSES: 'devansh_addresses',
  SUBSCRIPTIONS: 'devansh_subscriptions',
  NEWSLETTER: 'devansh_newsletter',
  PRODUCTS: 'devansh_products',
  CATEGORIES: 'devansh_categories',
  TESTIMONIALS: 'devansh_testimonials',
  COUPONS: 'devansh_coupons',
  LAST_ORDER: 'devansh_last_order',
}

export function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

export function removeLS(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* storage unavailable */
  }
}

export { KEYS }
