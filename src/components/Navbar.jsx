import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import SearchOverlay from './SearchOverlay'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  // { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About Farm' },
  { to: '/farm', label: 'Our Process' },
  { to: '/contact', label: 'Contact' },
]

function IconBadge({ to, label, icon: Icon, count }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full text-forest transition-all duration-200 hover:bg-forest-pale"
    >
      <Icon size={19} strokeWidth={1.9} />
      <AnimatePresence mode="popLayout">
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest-deeper ring-2 ring-cream-50"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const cart = useCart()
  const wishlist = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/90 shadow-soft backdrop-blur-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? 'py-2.5' : 'py-4 lg:py-5'
            }`}
          >
            <Link to="/" aria-label="Devansh home" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'bg-forest text-cream-50' : 'text-ink/70 hover:bg-forest-pale hover:text-forest'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="grid h-10 w-10 place-items-center rounded-full text-forest transition-colors hover:bg-forest-pale"
              >
                <Search size={19} strokeWidth={1.9} />
              </button> */}
              {/* <div className="hidden sm:block">
                <IconBadge to="/wishlist" label="Wishlist" icon={Heart} count={wishlist.count} />
              </div> */}
              {/* <IconBadge to="/cart" label="Cart" icon={ShoppingBag} count={cart.count} />
              <Link
                to="/account"
                aria-label="Account"
                className="hidden h-10 w-10 place-items-center rounded-full text-forest transition-colors hover:bg-forest-pale sm:grid"
              >
                <User size={19} strokeWidth={1.9} />
              </Link> */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="grid h-10 w-10 place-items-center rounded-full bg-forest text-cream-50 transition-transform active:scale-95 xl:hidden"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div> 
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-forest/10 bg-cream-50/95 backdrop-blur-lg xl:hidden"
              aria-label="Mobile"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                          isActive ? 'bg-forest text-cream-50' : 'text-ink/75 hover:bg-forest-pale'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
                {/* <div className="mt-2 grid grid-cols-3 gap-2">
                  <Link to="/wishlist" className="btn-outline !py-2.5 !text-xs">
                    <Heart size={14} /> Wishlist ({wishlist.count})
                  </Link>
                  <Link to="/cart" className="btn-outline !py-2.5 !text-xs">
                    <ShoppingBag size={14} /> Cart ({cart.count})
                  </Link>
                  <Link to="/account" className="btn-primary !py-2.5 !text-xs">
                    <User size={14} /> Account
                  </Link>
                </div> */}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} /> */}
    </>
  )
}
